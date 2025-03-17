// types/courseScheduleTypes.ts

import { SessionType, RecurrencePattern } from ".";

export interface CourseSchedule {
  id: string;
  courseId: string;
  pattern: RecurrencePattern;
  excludedDates: string[]; // ISO dates
  sessionType?: SessionType; // If schedule is type-specific
}