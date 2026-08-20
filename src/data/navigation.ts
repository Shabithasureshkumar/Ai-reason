import { NavEntry } from '../types/navigation';

/** Shared by both header variants so the two navigations cannot drift apart. */
export const navItems: readonly NavEntry[] = [
  { id: 'Dashboard', label: 'Dashboard' },
  { id: 'Appointment', label: 'Appointment' },
  { id: 'Patient', label: 'Patient' },
  { id: 'Reports', label: 'Reports' },
  { id: 'Chats', label: 'Chats' },
  { id: 'Billing', label: 'Billing' },
];
