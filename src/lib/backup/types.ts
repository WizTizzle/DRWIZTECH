export interface BackupConfiguration {
  metadata: BackupMetadata;
  ui: UISpecification;
  performance: PerformanceSpecs;
  accessibility: AccessibilitySpecs;
  seo: SEOSpecs;
  security: SecuritySpecs;
  analytics: AnalyticsSpecs;
  internationalization: I18nSpecs;
  testing: TestingSpecs;
  deployment: DeploymentSpecs;
  monitoring: MonitoringSpecs;
  documentation: DocumentationSpecs;
  dependencies: DependencySpecs;
  quality: QualitySpecs;
  infrastructure: InfrastructureSpecs;
  resilience: ResilienceSpecs;
  compliance: ComplianceSpecs;
  observability: ObservabilitySpecs;
}

export interface MonitoringSpecs {
  realtime: {
    enabled: boolean;
    metrics: string[];
    alerts: {
      channels: string[];
      thresholds: Record<string, number>;
      escalation: {
        levels: number;
        contacts: string[];
      };
    };
  };
  historical: {
    retention: string;
    aggregation: {
      intervals: string[];
      functions: string[];
    };
    storage: {
      type: string;
      compression: boolean;
      partitioning: string;
    };
  };
  visualization: {
    dashboards: string[];
    widgets: string[];
    exports: {
      formats: string[];
      scheduling: boolean;
    };
  };
}

export interface DocumentationSpecs {
  technical: {
    architecture: {
      diagrams: boolean;
      descriptions: boolean;
      patterns: string[];
    };
    api: {
      specification: string;
      versioning: boolean;
      examples: boolean;
    };
    deployment: {
      procedures: boolean;
      rollback: boolean;
      troubleshooting: boolean;
    };
  };
  user: {
    guides: {
      sections: string[];
      formats: string[];
      languages: string[];
    };
    tutorials: {
      interactive: boolean;
      video: boolean;
      text: boolean;
    };
    support: {
      faq: boolean;
      chatbot: boolean;
      ticketing: boolean;
    };
  };
  maintenance: {
    schedule: string;
    procedures: string[];
    contacts: string[];
  };
}

export interface DependencySpecs {
  management: {
    versioning: {
      strategy: string;
      updates: {
        automatic: boolean;
        schedule: string;
      };
    };
    audit: {
      security: boolean;
      license: boolean;
      compatibility: boolean;
    };
    caching: {
      enabled: boolean;
      strategy: string;
      ttl: number;
    };
  };
  monitoring: {
    outdated: boolean;
    vulnerabilities: boolean;
    size: boolean;
    alerts: {
      channels: string[];
      severity: string[];
    };
  };
  optimization: {
    treeshaking: boolean;
    bundling: {
      splitting: boolean;
      compression: boolean;
    };
    deduplication: boolean;
  };
}

export interface QualitySpecs {
  code: {
    standards: {
      style: string;
      complexity: {
        threshold: number;
        metrics: string[];
      };
      coverage: {
        minimum: number;
        excludes: string[];
      };
    };
    review: {
      required: boolean;
      approvers: number;
      checklist: string[];
    };
    automation: {
      linting: boolean;
      formatting: boolean;
      analysis: boolean;
    };
  };
  process: {
    methodology: string;
    workflows: {
      branches: string[];
      releases: string;
      hotfixes: string;
    };
    gates: {
      testing: boolean;
      security: boolean;
      performance: boolean;
    };
  };
  metrics: {
    velocity: boolean;
    quality: boolean;
    satisfaction: boolean;
    tracking: {
      method: string;
      frequency: string;
      reporting: boolean;
    };
  };
}

export interface InfrastructureSpecs {
  compute: {
    type: string;
    scaling: {
      auto: boolean;
      min: number;
      max: number;
      metrics: string[];
      cooldown: number;
    };
    regions: string[];
    resources: {
      cpu: {
        min: number;
        max: number;
        reserved: number;
      };
      memory: {
        min: number;
        max: number;
        reserved: number;
      };
      storage: {
        type: string;
        size: number;
        iops: number;
      };
    };
  };
  networking: {
    cdn: {
      enabled: boolean;
      provider: string;
      caching: {
        rules: Record<string, string>;
        ttl: number;
      };
    };
    dns: {
      provider: string;
      records: {
        type: string;
        ttl: number;
      }[];
    };
    security: {
      waf: boolean;
      ddos: boolean;
      ssl: {
        type: string;
        provider: string;
      };
    };
  };
  containers: {
    orchestration: string;
    registry: {
      provider: string;
      replication: boolean;
    };
    policies: {
      restart: string;
      update: string;
      logging: string;
    };
  };
}

export interface ResilienceSpecs {
  faultTolerance: {
    strategies: {
      circuitBreaker: {
        enabled: boolean;
        threshold: number;
        timeout: number;
      };
      retry: {
        enabled: boolean;
        maxAttempts: number;
        backoff: {
          initial: number;
          max: number;
          multiplier: number;
        };
      };
      bulkhead: {
        enabled: boolean;
        maxConcurrent: number;
        queueSize: number;
      };
    };
    fallback: {
      static: boolean;
      cache: boolean;
      degraded: boolean;
    };
  };
  recovery: {
    automated: {
      enabled: boolean;
      triggers: string[];
      actions: string[];
    };
    manual: {
      procedures: string[];
      contacts: string[];
      escalation: string[];
    };
    testing: {
      chaos: boolean;
      failover: boolean;
      backup: boolean;
    };
  };
  monitoring: {
    health: {
      endpoints: string[];
      interval: number;
      timeout: number;
    };
    metrics: {
      collection: string[];
      thresholds: Record<string, number>;
      alerts: string[];
    };
  };
}

export interface ComplianceSpecs {
  standards: {
    required: string[];
    optional: string[];
    internal: string[];
  };
  auditing: {
    schedule: string;
    scope: string[];
    evidence: {
      collection: string[];
      retention: string;
      storage: string;
    };
  };
  privacy: {
    dataHandling: {
      classification: string[];
      retention: Record<string, string>;
      disposal: string[];
    };
    consent: {
      types: string[];
      storage: string;
      expiry: string;
    };
    access: {
      controls: string[];
      logging: boolean;
      review: string;
    };
  };
  reporting: {
    frequency: string;
    recipients: string[];
    format: string[];
    automation: boolean;
  };
}

export interface ObservabilitySpecs {
  tracing: {
    enabled: boolean;
    provider: string;
    sampling: {
      rate: number;
      rules: Record<string, number>;
    };
    propagation: {
      formats: string[];
      headers: string[];
    };
    context: {
      baggage: boolean;
      correlation: boolean;
    };
  };
  logging: {
    levels: string[];
    format: {
      type: string;
      fields: string[];
    };
    storage: {
      retention: string;
      rotation: string;
      compression: boolean;
    };
    analysis: {
      enabled: boolean;
      tools: string[];
      alerts: boolean;
    };
  };
  metrics: {
    collection: {
      interval: number;
      aggregation: string[];
      dimensions: string[];
    };
    storage: {
      type: string;
      retention: string;
      resolution: string;
    };
    analysis: {
      forecasting: boolean;
      anomaly: boolean;
      correlation: boolean;
    };
  };
  dashboards: {
    templates: string[];
    refresh: number;
    sharing: {
      enabled: boolean;
      permissions: string[];
    };
    export: {
      formats: string[];
      scheduling: boolean;
    };
  };
}