export interface UploadResult {
  url: string | null;
  error: Error | null;
}

export interface StorageObject {
  id: string;
  name: string;
  size?: number;
  mime_type?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}