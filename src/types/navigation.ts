/**
 * The primary navigation tabs that already exist in the app.
 * Typing every navigation surface against this union removes the
 * `setActiveTab(tab as any)` cast and makes an unknown tab id impossible.
 */
export type NavItem =
  | 'Dashboard'
  | 'Appointment'
  | 'Patient'
  | 'Reports'
  | 'Chats'
  | 'Billing';

export interface NavEntry {
  id: NavItem;
  label: string;
}
