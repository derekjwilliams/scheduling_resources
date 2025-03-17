// types/timeTypes.ts

export type DayOfWeek = 
  | 'MONDAY' 
  | 'TUESDAY' 
  | 'WEDNESDAY' 
  | 'THURSDAY' 
  | 'FRIDAY' 
  | 'SATURDAY' 
  | 'SUNDAY';

export const DAYS_OF_WEEK = [
  'MONDAY', 'TUESDAY', 'WEDNESDAY',
  'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
] as const satisfies readonly DayOfWeek[];

export type TimeString = `${number}:${number}`; // HH:mm format

export interface AcademicTerm {
  id: string;
  name: string;
  startDate: string; // ISO date
  endDate: string;
}

export interface RecurringTimeSlot {
  days: DayOfWeek[];       // Instead of single dayOfWeek
  startTime: TimeString;
  endTime: TimeString;
  frequency: 'WEEKLY' | 'BIWEEKLY';
  effectivePeriod: {
    start: string;         // ISO date
    end: string;           // ISO date
  };
  excludedDates?: string[]; // ISO dates
}

// Helper type guard
export const isDayOfWeek = (s: string): s is DayOfWeek =>
  (DAYS_OF_WEEK as readonly string[]).includes(s);

