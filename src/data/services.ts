import { HardDrive, Database, Server, Usb } from 'lucide-react';
import { SERVICE_PATHS } from './serviceLinks';

export const services = [
  {
    title: "Hard Drive Recovery",
    description: "Expert recovery for all types of hard drives, including mechanical failures, clicking sounds, and logical errors.",
    Icon: HardDrive,
    link: SERVICE_PATHS.hardDrive
  },
  {
    title: "SSD & NVMe Recovery",
    description: "Advanced recovery techniques for solid-state drives with specialized tools for NAND flash memory and controller issues.",
    Icon: Database,
    link: SERVICE_PATHS.ssd
  },
  {
    title: "RAID Recovery",
    description: "Enterprise-level recovery services for all RAID configurations, NAS devices, and multi-disk storage systems.",
    Icon: Server,
    link: SERVICE_PATHS.raid
  },
  {
    title: "Flash & Memory Card Recovery",
    description: "Recovery solutions for USB drives, SD cards, and other flash media with both logical and physical damage.",
    Icon: Usb,
    link: SERVICE_PATHS.flash
  },
  {
    title: "Server Recovery",
    description: "Specialized recovery for enterprise servers, including database recovery and virtual machine restoration with 24/7 emergency service.",
    Icon: Server,
    link: SERVICE_PATHS.server
  }
];