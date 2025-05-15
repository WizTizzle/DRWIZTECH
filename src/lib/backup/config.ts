import type { BackupConfiguration } from './types';

export const defaultBackupConfig: BackupConfiguration = {
  metadata: {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    type: 'full',
    description: 'WizTech Data Recovery site configuration'
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
    },
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
      },
      canonicalization: {
        enabled: true,
        strategy: 'path-based'
      }
    },
    performance: {
      mobileFirst: true,
      loadTime: '< 3s',
      coreWebVitals: {
      coreWebVitals: {
        LCP: '< 2.5s',
        FID: '< 100ms',
        CLS: '< 0.1'
      },
      optimization: {
        images: true,
        minification: true,
        preloading: true,
        lazyLoading: true
      },
      monitoring: {
        realUserMetrics: true,
        syntheticMonitoring: true,
        alerting: true
      }
    },
    social: {
      platforms: ['facebook', 'twitter', 'linkedin'],
      cardTypes: ['summary', 'summary_large_image'],
      defaultImages: {
        'og:image': '/images/social/facebook.jpg',
        'twitter:image': '/images/social/twitter.jpg'
      }
    },
    local: {
      enabled: true,
      businessInfo: true,
      locations: true,
      reviews: true
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
    },
    accessibility: {
      wcag: {
        level: 'AA',
        automated: true,
        manual: true
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
    },
    backup: {
      frequency: 'daily',
      retention: '30d',
      type: ['database', 'files', 'configuration'],
      encryption: {
        enabled: true,
        algorithm: 'AES-256-GCM',
        keyRotation: true
      },
      verification: {
        checksums: true,
        integrityChecks: true,
        automaticRepair: true
      },
      replication: {
        enabled: true,
        locations: 3,
        syncStrategy: 'async'
      }
    },
    disaster: {
      recoveryTime: '4h',
      pointObjective: '15m',
      failover: {
        automatic: true,
        regions: ['us-east-1', 'eu-west-1', 'ap-southeast-1']
      }
    },
    compliance: {
      standards: ['GDPR', 'CCPA', 'HIPAA'],
      auditing: {
        enabled: true,
        retention: '7y',
        encryption: true
      },
      dataResidency: ['US', 'EU', 'UK']
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
    },
    visualization: {
      dashboards: ['overview', 'performance', 'errors', 'business'],
      widgets: ['graphs', 'tables', 'alerts', 'heatmaps'],
      exports: {
        formats: ['pdf', 'csv', 'json'],
        scheduling: true
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
      },
      support: {
        faq: true,
        chatbot: true,
        ticketing: true
      }
    },
    maintenance: {
      schedule: 'weekly',
      procedures: ['backup', 'update', 'cleanup'],
      contacts: ['dev-team', 'ops-team']
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
      },
      caching: {
        enabled: true,
        strategy: 'persistent',
        ttl: 604800
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
    },
    optimization: {
      treeshaking: true,
      bundling: {
        splitting: true,
        compression: true
      },
      deduplication: true
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
      },
      automation: {
        linting: true,
        formatting: true,
        analysis: true
      }
    },
    process: {
      methodology: 'agile',
      workflows: {
        branches: ['main', 'develop', 'feature/*'],
        releases: 'semantic',
        hotfixes: 'cherry-pick'
      },
      gates: {
        testing: true,
        security: true,
        performance: true
      }
    },
    metrics: {
      velocity: true,
      quality: true,
      satisfaction: true,
      tracking: {
        method: 'automated',
        frequency: 'daily',
        reporting: true
      }
    }
  }
};