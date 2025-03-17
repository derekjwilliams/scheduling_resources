// types/userTypes.ts
import { RoomType } from './roomTypes';
import type { DayOfWeek, TimeString } from './timeTypes';

export interface Instructor {
  id: string;
  name: string;
  unavailableTimes: UnavailableSlot[];
  maxWeeklyHours: number;
  preferredRoomTypes?: RoomType[];
  maxDailySessions?: number;
  minBreakBetweenSessions?: number; // In minutes
  specialties?: string[];
}

export interface UnavailableSlot {
  day: DayOfWeek;
  startTime: TimeString;
  endTime: TimeString;
}