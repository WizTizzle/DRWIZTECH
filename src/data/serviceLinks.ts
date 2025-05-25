// Centralized service links to ensure consistency across the application
export const SERVICE_PATHS = {
  hardDrive: '/services/hard-drive',
  ssd: '/services/ssd',
  raid: '/services/raid',
  flash: '/services/flash',
  server: '/services/server'
};

export const getServicePath = (serviceId: string): string => {
  switch (serviceId) {
    case 'hard-drive':
    case 'hard_drive':
      return SERVICE_PATHS.hardDrive;
    case 'ssd':
      return SERVICE_PATHS.ssd;
    case 'raid':
      return SERVICE_PATHS.raid;
    case 'flash':
    case 'flash_drive':
      return SERVICE_PATHS.flash;
    case 'server':
      return SERVICE_PATHS.server;
    default:
      console.error(`Unknown service ID: ${serviceId}`);
      return '/services';
  }
};