import type { BackupConfiguration } from './types';
import { defaultBackupConfig } from './config';
import { wtDr2025V1 } from './backups/wt-dr-2025-v1';

class BackupManager {
  private static instance: BackupManager;
  private currentConfig: BackupConfiguration;
  private backupHistory: BackupConfiguration[] = [];
  private readonly maxBackups: number = 100;
  private compressionEnabled: boolean = false;
  private encryptionEnabled: boolean = true;
  private readonly encryptionKey: string = 'your-secure-key';
  private readonly backupSchedule: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {
    this.currentConfig = { ...wtDr2232025 };
    this.loadFromLocalStorage();
    this.initializeScheduledBackups();
  }

  static getInstance(): BackupManager {
    if (!BackupManager.instance) {
      BackupManager.instance = new BackupManager();
    }
    return BackupManager.instance;
  }

  setCompressionEnabled(enabled: boolean): void {
    this.compressionEnabled = enabled;
  }

  setMaxBackups(max: number): void {
    this.maxBackups = max;
  }

  private initializeScheduledBackups() {
    // Daily backup at midnight
    const dailyBackup = setInterval(() => {
      this.createBackup('Scheduled daily backup');
    }, 24 * 60 * 60 * 1000);

    // Weekly backup on Sunday at midnight
    const weeklyBackup = setInterval(() => {
      if (new Date().getDay() === 0) {
        this.createBackup('Scheduled weekly backup');
      }
    }, 24 * 60 * 60 * 1000);

    this.backupSchedule.set('daily', dailyBackup);
    this.backupSchedule.set('weekly', weeklyBackup);
  }

  setEncryptionEnabled(enabled: boolean): void {
    this.encryptionEnabled = enabled;
  }

  setEncryptionKey(key: string): void {
    // In production, use a secure key management system
    this.encryptionKey = key;
  }

  createBackup(description: string = ''): BackupConfiguration {
    const backup: BackupConfiguration = {
      ...this.currentConfig,
      metadata: {
        ...this.currentConfig.metadata,
        timestamp: new Date().toISOString(),
        description: description || this.currentConfig.metadata.description
      }
    };

    // Trim history if exceeding max backups
    if (this.backupHistory.length >= this.maxBackups) {
      this.backupHistory = this.backupHistory.slice(-this.maxBackups + 1);
    }

    this.backupHistory.push(backup);
    this.saveToLocalStorage();

    return backup;
  }

  private encryptData(data: string): string {
    if (!this.encryptionEnabled) return data;
    
    // Simple XOR encryption for demo
    // In production, use a proper encryption library
    return data
      .split('')
      .map(char => 
        String.fromCharCode(char.charCodeAt(0) ^ this.encryptionKey.charCodeAt(0))
      )
      .join('');
  }

  private decryptData(data: string): string {
    if (!this.encryptionEnabled) return data;
    
    // Simple XOR decryption for demo
    return this.encryptData(data); // XOR is its own inverse
  }

  compareBackups(timestamp1: string, timestamp2: string): Record<string, any> {
    const backup1 = this.backupHistory.find(b => b.metadata.timestamp === timestamp1);
    const backup2 = this.backupHistory.find(b => b.metadata.timestamp === timestamp2);
    
    if (!backup1 || !backup2) {
      throw new Error('Backup not found');
    }

    return this.deepCompare(backup1, backup2);
  }

  private deepCompare(obj1: any, obj2: any, path: string = ''): Record<string, any> {
    const differences: Record<string, any> = {};

    for (const key in obj1) {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof obj1[key] === 'object' && obj1[key] !== null) {
        const nestedDiff = this.deepCompare(obj1[key], obj2[key], currentPath);
        if (Object.keys(nestedDiff).length > 0) {
          differences[key] = nestedDiff;
        }
      } else if (obj1[key] !== obj2[key]) {
        differences[key] = {
          previous: obj1[key],
          current: obj2[key]
        };
      }
    }

    return differences;
  }

  exportBackup(timestamp: string): string {
    const backup = this.backupHistory.find(b => b.metadata.timestamp === timestamp);
    if (!backup) {
      throw new Error('Backup not found');
    }

    const data = this.compressionEnabled 
      ? this.compressData(JSON.stringify(backup))
      : JSON.stringify(backup, null, 2);

    return data;
  }

  importBackup(data: string): boolean {
    try {
      const backup = JSON.parse(
        this.compressionEnabled ? this.decompressData(data) : data
      );

      if (!this.validateBackup(backup)) {
        throw new Error('Invalid backup format');
      }

      this.backupHistory.push(backup);
      this.saveToLocalStorage();
      return true;
    } catch (error) {
      console.error('Failed to import backup:', error);
      return false;
    }
  }

  private validateBackup(backup: any): boolean {
    const requiredKeys = [
      'metadata',
      'ui',
      'performance',
      'accessibility',
      'seo',
      'security',
      'analytics',
      'internationalization',
      'testing',
      'deployment'
    ];

    return requiredKeys.every(key => key in backup);
  }

  private compressData(data: string): string {
    // Simple RLE compression for demo
    let compressed = '';
    let count = 1;
    let current = data[0];

    for (let i = 1; i < data.length; i++) {
      if (data[i] === current) {
        count++;
      } else {
        compressed += count + current;
        current = data[i];
        count = 1;
      }
    }
    compressed += count + current;

    return compressed;
  }

  private decompressData(data: string): string {
    // Simple RLE decompression for demo
    let decompressed = '';
    let count = '';

    for (let i = 0; i < data.length; i++) {
      if (!isNaN(Number(data[i]))) {
        count += data[i];
      } else {
        decompressed += data[i].repeat(Number(count));
        count = '';
      }
    }

    return decompressed;
  }

  getLatestBackup(): BackupConfiguration {
    return this.backupHistory[this.backupHistory.length - 1] || this.currentConfig;
  }

  getAllBackups(): BackupConfiguration[] {
    return [...this.backupHistory];
  }

  restoreBackup(timestamp: string): boolean {
    const backup = this.backupHistory.find(b => b.metadata.timestamp === timestamp);
    if (backup) {
      this.currentConfig = { ...backup };
      return true;
    }
    return false;
  }

  private saveToLocalStorage() {
    try {
      let data = this.compressionEnabled
        ? this.compressData(JSON.stringify(this.backupHistory))
        : JSON.stringify(this.backupHistory);

      if (this.encryptionEnabled) {
        data = this.encryptData(data);
      }

      localStorage.setItem('wiztech_backups', data);
    } catch (error) {
      console.error('Failed to save backups to localStorage:', error);
    }
  }

  private loadFromLocalStorage() {
    try {
      let stored = localStorage.getItem('wiztech_backups');
      if (stored) {
        if (this.encryptionEnabled) {
          stored = this.decryptData(stored);
        }

        let data = this.compressionEnabled
          ? JSON.parse(this.decompressData(stored))
          : JSON.parse(stored);

        if (Array.isArray(data) && data.every(this.validateBackup)) {
          this.backupHistory = data;
        }
      }
    } catch (error) {
      console.error('Failed to load backups from localStorage:', error);
    }
  }

  dispose() {
    // Clean up scheduled backups
    for (const interval of this.backupSchedule.values()) {
      clearInterval(interval);
    }
    this.backupSchedule.clear();
  }
}

export const backupManager = BackupManager.getInstance();