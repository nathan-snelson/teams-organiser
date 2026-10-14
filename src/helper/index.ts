import { Disposition } from "@/types";

export const generateTileId = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
}

export const dispositions: Disposition[] = [
  { name: 'Select Disposition', className: '', exclude: true, count: 0 },
  { name: 'Priority Assets', className: 'priority', count: 0 },
  { name: 'Reconnaissance', className: 'recon', count: 0 },
  { name: 'Take and Hold', className: 'take-and-hold', count: 0 },
  { name: 'Purge the Foe', className: 'purge', count: 0 },
  { name: 'Disruption', className: 'disruption', count: 0 }
];
