import { HardDrive, Laptop, Usb, Database, Server } from 'lucide-react';

export const services = [
  {
    title: "Hard Drive Recovery",
    description: "Expert recovery for all types of hard drives, including mechanical failures and logical errors.",
    Icon: HardDrive,
    link: "/services/hard-drive"
  },
  {
    title: "SSD & NVMe Recovery",
    description: "Advanced recovery techniques for solid-state drives and NVMe storage.",
    Icon: Database,
    link: "/services/ssd"
  },
  {
    title: "RAID & Server Recovery",
    description: "Enterprise-level recovery services for RAID arrays, NAS systems, and servers.",
    Icon: Server,
    link: "/services/raid"
  },
  {
    title: "Flash & Memory Cards",
    description: "Recovery of lost or corrupted data from USB drives, SD cards, and other flash storage.",
    Icon: Usb,
    link: "/services/flash"
  }
];