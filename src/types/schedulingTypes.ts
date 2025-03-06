// schedulingTypes.ts
import type { TimeString, RecurringTimeSlot } from './timeTypes';
import type { RoomFeature } from './roomTypes'; // Classroom not needed here
import { SessionType } from './sessionTypes';
import { RecurrencePattern } from './recurrenceTypes';

export interface Course {
  id: string;
  code: string;
  title: string;
  requiredFeatures: RoomFeature[];
  minimumCapacity: number;
  preferredInstructors: string[];
  schedules: CourseSchedule[]; // Multiple schedule patterns
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