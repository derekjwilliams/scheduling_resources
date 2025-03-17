// types/recurrenceTypes.ts

import { SessionType } from "./sessionTypes";
import { DayOfWeek, TimeString } from "./timeTypes";

export interface RecurrencePattern {
  timeSlots: RecurrenceTimeSlot[];  // Multiple slots per day
  startDate: string;
  endDate: string;
  frequency: RecurrenceFrequency;
  sessionType: SessionType;
  instructorId: string;
  courseId: string;
}

export interface RecurrenceTimeSlot {
  dayOfWeek: DayOfWeek;
  startTime: TimeString;
  endTime: TimeString;
}


export type RecurrenceDay = {
  day: DayOfWeek;
  selected: boolean;
};

export type RecurrenceFrequency = 'WEEKLY' | 'BIWEEKLY';

// Helper constants
export const RECURRENCE_FREQUENCIES = {
  WEEKLY: 'WEEKLY',
  BIWEEKLY: 'BIWEEKLY'
} as const;

// Validation array
export const VALID_FREQUENCIES = Object.values(RECURRENCE_FREQUENCIES);

export type { SessionType };
