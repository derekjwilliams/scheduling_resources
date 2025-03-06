import { SessionType, RecurrencePattern } from ".";

export interface CourseSchedule {
  id: string;
  courseId: string;
  pattern: RecurrencePattern;
  // timeSlots: RecurringTimeSlot[];
  excludedDates: string[]; // ISO dates
  validFrom: string; // ISO date
  validUntil: string; // ISO date
  sessionType?: SessionType; // If schedule is type-specific
}