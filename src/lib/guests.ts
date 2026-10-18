export const GUEST_OPTIONS = [
  { value: '1', label: '1 kishi' },
  { value: '2', label: '2 kishi' },
  { value: '4', label: '3–4 kishi' },
  { value: '6', label: '5–6 kishi' },
] as const;

export type GuestValue = (typeof GUEST_OPTIONS)[number]['value'];

export const DEFAULT_GUESTS: GuestValue = '2';

export const guestLabel = (value: string): string =>
  GUEST_OPTIONS.find((g) => g.value === value)?.label ?? GUEST_OPTIONS[1].label;
