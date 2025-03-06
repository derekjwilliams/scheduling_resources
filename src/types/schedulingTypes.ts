// schedulingTypes.ts
import type { TimeString, RecurringTimeSlot } from './timeTypes';
import type { RoomFeature } from './roomTypes'; // Classroom not needed here
import { SessionType } from './sessionTypes';

export interface Course {
  id: string;
  code: string;
  title: string;
  requiredFeatures: RoomFeature[];
  minimumCapacity: number;
  preferredInstructors: string[];
  schedules: CourseSchedule[]; // Multiple schedule patterns
}

export interface CourseSchedule {
  id: string;
  courseId: string;
  timeSlots: RecurringTimeSlot[];
  excludedDates: string[]; // ISO dates
  validFrom: string; // ISO date
  validUntil: string; // ISO date
  sessionType?: SessionType; // If schedule is type-specific
}

export interface CourseSession {
  id: string;
  scheduleId: string; // Links to CourseSchedule
  instructorId: string;
  classroomId?: string;
  date: string; // ISO date
  startTime: TimeString;
  sessionType: SessionType;
  endTime: TimeString;
  status: 'SCHEDULED' | 'CANCELLED' | 'RESCHEDULED';
}