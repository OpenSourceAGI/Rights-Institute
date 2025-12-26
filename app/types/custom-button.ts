export interface CustomButton {
  id: string;
  userId: string;
  label: string;
  url: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  category?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCustomButtonData {
  label: string;
  url: string;
  description?: string;
  icon?: string;
  color?: string;
  category?: string;
  isActive?: boolean;
}

export interface UpdateCustomButtonData {
  label?: string;
  url?: string;
  description?: string;
  icon?: string;
  color?: string;
  category?: string;
  isActive?: boolean;
}

export const BUTTON_CATEGORIES = [
  'Navigation',
  'Action',
  'Social',
  'External',
  'Tool',
  'Resource',
  'Other',
] as const;

export type ButtonCategory = (typeof BUTTON_CATEGORIES)[number];

export const BUTTON_COLORS = [
  'blue',
  'green',
  'red',
  'purple',
  'orange',
  'pink',
  'gray',
] as const;

export type ButtonColor = (typeof BUTTON_COLORS)[number];
