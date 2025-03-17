// types/schedulingTypes.ts
import type { TimeString } from './timeTypes';
import type { RoomFeature } from './roomTypes'; // Classroom not needed here
import { SESSION_TYPES, SessionType } from './sessionTypes';
import { RecurrenceFrequency, VALID_FREQUENCIES } from './recurrenceTypes';
import { set, parseISO } from 'date-fns';
import { CourseSchedule } from './courseScheduleTypes';

export interface Course {
  id: string;
  code: string;
  title: string;
  requiredFeatures: RoomFeature[];
  minimumCapacity: number;
  preferredInstructors: string[];
  schedules: CourseSchedule[]; // Multiple schedule patterns
}

export type SessionStatus = 
  | 'SCHEDULED'
  | 'CANCELLED'
  | 'RESCHEDULED'
  | 'COMPLETED';

// Core session interface
export interface CourseSessionData {
  id: string;
  date: string;
  frequency: RecurrenceFrequency;
  startTime: TimeString;
  endTime: TimeString;
  classroomId?: string;
  instructorId: string;
  courseId: string;
  scheduleId: string;
  sessionType: SessionType;
  status: SessionStatus;
}

export type CourseSession = CourseSessionData & {
  readonly startsAt: Date;
  readonly endsAt: Date;
};

// Validation helpers
const isValidISODate = (date: string): boolean => 
  /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(Date.parse(date));

const isValidTimeString = (time: string): time is TimeString =>
  /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(time);

const roundTo5Minutes = (time: string): TimeString => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const rounded = Math.round(totalMinutes / 5) * 5;
  
  const roundedHours = Math.floor(rounded / 60)
    .toString()
    .padStart(2, '0');
  const roundedMinutes = (rounded % 60).toString().padStart(2, '0');
  
  return `${roundedHours}:${roundedMinutes}` as TimeString;
};

// Session factory function
export function createCourseSession(data: CourseSessionData): CourseSession {
  // Validate date
  if (!isValidISODate(data.date)) {
    throw new Error(`Invalid ISO date format: ${data.date}`);
  }

  if (!VALID_FREQUENCIES.includes(data.frequency)) {
  throw new Error(`Invalid frequency: ${data.frequency}`);
}

  // Validate and round times
  if (!isValidTimeString(data.startTime) || !isValidTimeString(data.endTime)) {
    throw new Error('Invalid time format (HH:mm required)');
  }

  const roundedStart = roundTo5Minutes(data.startTime);
  const roundedEnd = roundTo5Minutes(data.endTime);

  // Validate time order
  const startMinutes = parseInt(roundedStart.replace(':', ''));
  const endMinutes = parseInt(roundedEnd.replace(':', ''));
  if (startMinutes >= endMinutes) {
    throw new Error('Start time must be before end time');
  }

  // Validate session type
  const validSessionTypes: SessionType[] = [
  SESSION_TYPES.LECTURE,
  SESSION_TYPES.LAB,
  SESSION_TYPES.SEMINAR,
  SESSION_TYPES.EXAM,
  SESSION_TYPES.DISCUSSION,
  SESSION_TYPES.FIELD_TRIP // Now valid
];if (!validSessionTypes.includes(data.sessionType)) {
    throw new Error(`Invalid session type: ${data.sessionType}`);
  }

  // Validate status
  const validStatuses: SessionStatus[] = [
    'SCHEDULED', 'CANCELLED', 'RESCHEDULED', 'COMPLETED'
  ];
  if (!validStatuses.includes(data.status)) {
    throw new Error(`Invalid status: ${data.status}`);
  }

  // Create validated data object
  const validatedData: CourseSessionData = {
    ...data,
    startTime: roundedStart,
    endTime: roundedEnd
  };

  // Date cache for memoization
  let startsAt: Date;
  let endsAt: Date;

  return Object.defineProperties(validatedData, {
    startsAt: {
      get() {
        if (!startsAt) {
          const [hours, minutes] = this.startTime.split(':').map(Number);
          startsAt = set(parseISO(this.date), { hours, minutes });
        }
        return startsAt;
      },
      enumerable: false
    },
    endsAt: {
      get() {
        if (!endsAt) {
          const [hours, minutes] = this.endTime.split(':').map(Number);
          endsAt = set(parseISO(this.date), { hours, minutes });
          
          // Handle midnight crossover
          if (endsAt <= startsAt!) {
            endsAt = set(endsAt, { date: endsAt.getDate() + 1 });
          }
        }
        return endsAt;
      },
      enumerable: false
    }
  }) as CourseSession;
}

// Helper functions for data transfer
export function toSessionDTO(session: CourseSession): CourseSessionData {
  return {
    id: session.id,
    date: session.date,
    frequency: session.frequency,
    startTime: session.startTime,
    endTime: session.endTime,
    classroomId: session.classroomId,
    instructorId: session.instructorId,
    courseId: session.courseId,
    scheduleId: session.scheduleId,
    sessionType: session.sessionType,
    status: session.status
  };
}

export function fromSessionDTO(dto: CourseSessionData): CourseSession {
  return createCourseSession(dto);
}
