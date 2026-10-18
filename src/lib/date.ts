/** Uzbek month names, and the calendar maths behind the date picker. */

export const MONTHS = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'Iyun',
  'Iyul',
  'Avgust',
  'Sentabr',
  'Oktabr',
  'Noyabr',
  'Dekabr',
];

/** Monday first, as in the design. */
export const WEEKDAYS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

/** How many months ahead of the current one the picker can reach. */
export const MONTH_RANGE = 12;

export type PickedDate = { year: number; month: number; day: number };

export const startOfToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

/** The date offered before the visitor picks one: the 14th of next month. */
export const defaultDate = (): PickedDate => {
  const today = startOfToday();
  const d = new Date(today.getFullYear(), today.getMonth() + 1, 14);
  return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
};

export const formatDate = ({ year, month, day }: PickedDate): string =>
  `${day} ${MONTHS[month]} ${year}`;

/** Months counted from the current one, so index 0 is always "this month". */
export const monthOffset = (year: number, month: number): number => {
  const today = startOfToday();
  return (year - today.getFullYear()) * 12 + (month - today.getMonth());
};

export const monthFromOffset = (offset: number): { year: number; month: number } => {
  const today = startOfToday();
  const d = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
};

export type CalendarCell = { day: number | null; past: boolean };

/** One month as calendar cells, padded with blanks so the 1st lands on its weekday. */
export const monthCells = (year: number, month: number): CalendarCell[] => {
  const today = startOfToday();
  const lead = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();

  const cells: CalendarCell[] = Array.from({ length: lead }, () => ({ day: null, past: true }));
  for (let day = 1; day <= count; day++) {
    cells.push({ day, past: new Date(year, month, day) < today });
  }
  return cells;
};
