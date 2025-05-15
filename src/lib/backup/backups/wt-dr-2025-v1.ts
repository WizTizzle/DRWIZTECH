import type { BackupConfiguration } from '../types';

export const wtDr2025V1: BackupConfiguration = {
  metadata: {
    version: '2025.1.0',
    timestamp: new Date().toISOString(),
    type: 'full',
    description: 'WizTech Data Recovery 2025 V1.0 Configuration'
  },
  ui: {
    components: {
      serviceCards: {
        accessibility: {
          ariaRoles: ['button', 'link', 'region'],
          focusManagement: ['trapFocus', 'restoreFocus'],
          keyboardNav: ['arrows', 'enter', 'escape'],
          screenReader: ['descriptions', 'announcements']
        },
        performance: {
          lazyLoading: true,
          imageOptimization: true,
          animationThrottling: true,
          domRecycling: true
        },
        structure: {
          header: {
            iconContainer: true,
            title: true,
            subtitle: true
          },
          body: {
            description: true,
            featureList: true,
            priceRange: true
          },
          footer: {
            ctaButton: true,
            additionalInfo: true
          }
        },
        styling: {
          layout: {
            mobileColumns: 1,
            desktopColumns: 2,
            aspectRatio: '3:4',
            padding: '1.5rem',
            borderRadius: '0.5rem'
          },
          animation: {
            hoverScale: 1.02,
            transitionDuration: '200ms',
            transitionTiming: 'ease-out'
          }
        }
      },
      assessmentForm: {
        errorRecovery: {
          autoSaveInterval: 30000,
          useLocalStorage: true,
          useSessionRecovery: true,
          conflictResolution: true
        },
        performance: {
          debouncedValidation: true,
          memoizedCalculations: true,
          lazyFormSections: true,
          virtualScrolling: true
        },
        sections: [
          'InitialAssessment',
          'DeviceDetails',
          'ProblemDescription',
          'PreviousAttempts',
          'ContactInformation'
        ],
        validation: {
          rules: ['required', 'email', 'phone', 'fileTypes'],
          errorHandling: ['inline', 'summary', 'toast']
        },
        progress: {
          tracking: true,
          indicators: true,
          savePoints: true
        }
      }
    },
    branding: {
      colors: {
        primary: {
          light: '#8ED8F8',
          dark: '#4B9CD3',
          palette: [
            '#f0f7ff',
            '#e0effe',
            '#b9dffd',
            '#8ED8F8',
            '#36a1f8',
            '#0c84eb',
            '#4B9CD3',
            '#0050a2',
            '#004385',
            '#003870'
          ]
        },
        usage: {
          primary: ['buttons', 'headers', 'icons'],
          secondary: ['backgrounds', 'borders', 'text'],
          gradients: ['hero', 'cards', 'cta']
        }
      },
      logo: {
        primary: {
          path: '/images/Final logo WIZTECH.png',
          type: 'image'
        },
        fallback: {
          type: 'text',
          styling: {
            fontWeights: {
              wiz: 'bold',
              tech: 'medium'
            },
            colors: {
              wiz: 'gray-800',
              tech: 'primary-500',
              exclamation: 'primary-300'
            },
            spacing: {
              letterSpacing: 'tracking-tight',
              subtextSpacing: 'tracking-widest'
            }
          }
        }
      },
      typography: {
        headings: {
          fontStack: 'system-ui, sans-serif',
          weights: ['600', '700']
        },
        body: {
          fontStack: 'system-ui, sans-serif',
          weights: ['400', '500']
        },
        sizes: {
          hero: 'text-5xl',
          section: 'text-3xl',
          subsection: 'text-2xl',
          card: 'text-xl',
          body: 'text-base',
          small: 'text-sm',
          micro: 'text-xs'
        },
        lineHeights: {
          headings: 'leading-tight',
          body: 'leading-relaxed',
          lists: 'leading-normal'
        }
      }
    }
  },
  performance: {
    metrics: {
      fcp: '< 1.8s',
      lcp: '< 2.5s',
      tti: '< 3.9s',
      tbt: '< 200ms'
    },
    optimization: {
      images: {
        lazyLoading: true,
        responsiveSizes: true,
        formats: ['webp', 'avif', 'jpg'],
        compression: true
      },
      code: {
        splitting: true,
        treeshaking: true,
        minification: true
      },
      caching: {
        strategy: 'stale-while-revalidate',
        duration: 86400
      }
    }
  },
  accessibility: {
    aria: {
      roles: ['navigation', 'main', 'complementary', 'banner'],
      labels: ['buttons', 'inputs', 'images', 'links'],
      landmarks: ['header', 'main', 'footer', 'nav']
    },
    keyboard: {
      navigation: true,
      shortcuts: true,
      focusManagement: true
    },
    contrast: {
      minimumRatio: 4.5,
      enhancedRatio: 7
    },
    media: {
      captions: true,
      transcripts: true,
      descriptions: true
    }
  },
  seo: {
    metadata: {
      title: 'WizTech Data Recovery - Professional Data Recovery Services',
      description: 'Expert data recovery solutions for all storage devices. International service available with industry-leading success rates.',
      keywords: ['data recovery', 'hard drive recovery', 'SSD recovery', 'RAID recovery'],
      ogTags: {
        'og:type': 'website',
        'og:site_name': 'WizTech Data Recovery',
        'og:image': '/images/Final logo WIZTECH.png'
      },
      twitterTags: {
        'twitter:card': 'summary_large_image',
        'twitter:site': '@wiztechrecovery'
      }
    },
    structure: {
      headings: true,
      semanticHtml: true,
      breadcrumbs: true,
      siteMap: true,
      schema: {
        enabled: true,
        types: ['Organization', 'Service', 'LocalBusiness'],
        customSchemas: true
      }
    }
  },
  security: {
    authentication: {
      method: 'supabase',
      providers: ['email'],
      mfa: false,
      sessionManagement: {
        duration: 86400,
        renewal: true,
        inactivityTimeout: 3600
      }
    },
    authorization: {
      rbac: true,
      policies: ['storage', 'assessment', 'customer'],
      permissions: ['read', 'write', 'upload']
    },
    dataProtection: {
      encryption: {
        atRest: true,
        inTransit: true,
        algorithm: 'AES-256-GCM'
      },
      sanitization: {
        input: true,
        output: true,
        sqlInjection: true,
        xss: true
      }
    }
  },
  analytics: {
    tracking: {
      pageViews: true,
      events: true,
      conversions: true,
      userJourney: true
    },
    metrics: {
      engagement: ['timeOnPage', 'bounceRate', 'returnRate'],
      performance: ['loadTime', 'ttfb', 'fcp'],
      business: ['conversionRate', 'leadQuality', 'costPerLead']
    },
    reporting: {
      automated: true,
      realTime: true,
      customDashboards: true
    }
  },
  internationalization: {
    localization: {
      defaultLocale: 'en-US',
      supportedLocales: ['en-US', 'es-ES', 'fr-FR', 'de-DE'],
      fallbackChain: ['en-US']
    },
    formatting: {
      dates: true,
      numbers: true,
      currencies: true
    },
    content: {
      translations: true,
      rtlSupport: true,
      pluralization: true
    }
  },
  testing: {
    unit: {
      framework: 'vitest',
      coverage: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80
      }
    },
    integration: {
      framework: 'playwright',
      e2e: true,
      visualRegression: true
    },
    performance: {
      loadTesting: true,
      stressTesting: true,
      benchmarks: {
        'First Paint': '< 1s',
        'Time to Interactive': '< 3s',
        'Max Server Response': '< 200ms'
      }
    }
  },
  deployment: {
    infrastructure: {
      provider: 'netlify',
      region: 'auto',
      scaling: {
        auto: true,
        min: 1,
        max: 10
      }
    },
    ci: {
      provider: 'github-actions',
      stages: ['lint', 'test', 'build', 'deploy'],
      triggers: ['push', 'pull_request', 'release']
    },
    monitoring: {
      uptime: true,
      alerts: true,
      logging: true,
      metrics: ['availability', 'latency', 'errors', 'traffic']
    }
  },
  monitoring: {
    realtime: {
      enabled: true,
      metrics: ['cpu', 'memory', 'latency', 'errors'],
      alerts: {
        channels: ['email', 'slack', 'pagerduty'],
        thresholds: {
          'error-rate': 0.01,
          'latency-p95': 1000,
          'cpu-usage': 80
        },
        escalation: {
          levels: 3,
          contacts: ['ops-team', 'dev-team', 'management']
        }
      }
    },
    historical: {
      retention: '90d',
      aggregation: {
        intervals: ['1m', '5m', '1h', '1d'],
        functions: ['avg', 'max', 'min', 'p95', 'p99']
      },
      storage: {
        type: 'timeseries',
        compression: true,
        partitioning: 'daily'
      }
    }
  },
  documentation: {
    technical: {
      architecture: {
        diagrams: true,
        descriptions: true,
        patterns: ['mvc', 'repository', 'service']
      },
      api: {
        specification: 'OpenAPI 3.0',
        versioning: true,
        examples: true
      },
      deployment: {
        procedures: true,
        rollback: true,
        troubleshooting: true
      }
    },
    user: {
      guides: {
        sections: ['getting-started', 'features', 'troubleshooting'],
        formats: ['web', 'pdf', 'video'],
        languages: ['en', 'es', 'fr']
      },
      tutorials: {
        interactive: true,
        video: true,
        text: true
      }
    }
  },
  dependencies: {
    management: {
      versioning: {
        strategy: 'semantic',
        updates: {
          automatic: true,
          schedule: 'weekly'
        }
      },
      audit: {
        security: true,
        license: true,
        compatibility: true
      }
    },
    monitoring: {
      outdated: true,
      vulnerabilities: true,
      size: true,
      alerts: {
        channels: ['email', 'slack'],
        severity: ['critical', 'high', 'medium']
      }
    }
  },
  quality: {
    code: {
      standards: {
        style: 'prettier',
        complexity: {
          threshold: 15,
          metrics: ['cyclomatic', 'cognitive', 'halstead']
        },
        coverage: {
          minimum: 80,
          excludes: ['tests', 'mocks']
        }
      },
      review: {
        required: true,
        approvers: 2,
        checklist: [
          'functionality',
          'security',
          'performance',
          'accessibility'
        ]
      }
    }
  },
  infrastructure: {
    compute: {
      type: 'serverless',
      scaling: {
        auto: true,
        min: 1,
        max: 10,
        metrics: ['requests', 'latency', 'errors'],
        cooldown: 300
      },
      regions: ['us-east-1', 'eu-west-1', 'ap-southeast-1'],
      resources: {
        cpu: {
          min: 0.5,
          max: 2,
          reserved: 1
        },
        memory: {
          min: 512,
          max: 2048,
          reserved: 1024
        },
        storage: {
          type: 'ssd',
          size: 20,
          iops: 3000
        }
      }
    },
    networking: {
      cdn: {
        enabled: true,
        provider: 'cloudflare',
        caching: {
          rules: {
            'static/*': '1y',
            'images/*': '1y',
            'api/*': '0s'
          },
          ttl: 86400
        }
      },
      dns: {
        provider: 'cloudflare',
        records: [
          {
            type: 'A',
            ttl: 300
          },
          {
            type: 'CNAME',
            ttl: 300
          }
        ]
      },
      security: {
        waf: true,
        ddos: true,
        ssl: {
          type: 'managed',
          provider: 'lets-encrypt'
        }
      }
    }
  },
  resilience: {
    faultTolerance: {
      strategies: {
        circuitBreaker: {
          enabled: true,
          threshold: 50,
          timeout: 30000
        },
        retry: {
          enabled: true,
          maxAttempts: 3,
          backoff: {
            initial: 1000,
            max: 10000,
            multiplier: 2
          }
        },
        bulkhead: {
          enabled: true,
          maxConcurrent: 100,
          queueSize: 50
        }
      },
      fallback: {
        static: true,
        cache: true,
        degraded: true
      }
    },
    recovery: {
      automated: {
        enabled: true,
        triggers: ['health-check-failure', 'error-rate-threshold', 'latency-threshold'],
        actions: ['restart', 'scale-up', 'failover']
      },
      manual: {
        procedures: ['backup-restore', 'data-recovery', 'system-recovery'],
        contacts: ['ops-team', 'dev-team', 'management'],
        escalation: ['l1-support', 'l2-support', 'incident-manager']
      }
    }
  },
  compliance: {
    standards: {
      required: ['GDPR', 'CCPA', 'HIPAA'],
      optional: ['ISO27001', 'SOC2'],
      internal: ['security-policy', 'privacy-policy']
    },
    auditing: {
      schedule: 'quarterly',
      scope: ['data-handling', 'access-control', 'encryption'],
      evidence: {
        collection: ['logs', 'configurations', 'reports'],
        retention: '7y',
        storage: 'encrypted-s3'
      }
    },
    privacy: {
      dataHandling: {
        classification: ['public', 'internal', 'confidential', 'restricted'],
        retention: {
          'public': '1y',
          'internal': '3y',
          'confidential': '5y',
          'restricted': '7y'
        },
        disposal: ['secure-delete', 'encryption', 'anonymization']
      },
      consent: {
        types: ['marketing', 'analytics', 'essential'],
        storage: 'encrypted-db',
        expiry: '1y'
      }
    }
  },
  observability: {
    tracing: {
      enabled: true,
      provider: 'opentelemetry',
      sampling: {
        rate: 0.1,
        rules: {
          'error': 1.0,
          'slow': 0.5
        }
      },
      propagation: {
        formats: ['w3c', 'b3'],
        headers: ['traceparent', 'tracestate']
      },
      context: {
        baggage: true,
        correlation: true
      }
    },
    logging: {
      levels: ['error', 'warn', 'info', 'debug'],
      format: {
        type: 'json',
        fields: ['timestamp', 'level', 'message', 'context']
      },
      storage: {
        retention: '90d',
        rotation: 'daily',
        compression: true
      },
      analysis: {
        enabled: true,
        tools: ['elasticsearch', 'kibana'],
        alerts: true
      }
    },
    metrics: {
      collection: {
        interval: 60,
        aggregation: ['sum', 'avg', 'p95', 'p99'],
        dimensions: ['service', 'endpoint', 'status']
      },
      storage: {
        type: 'timeseries',
        retention: '1y',
        resolution: '1m'
      },
      analysis: {
        forecasting: true,
        anomaly: true,
        correlation: true
      }
    }
  }
};