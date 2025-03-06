import { SessionType } from "./sessionTypes";
import { DayOfWeek, TimeString } from "./timeTypes";

export interface RecurrencePattern {
  daysOfWeek: DayOfWeek[];
  startDate: string;
  endDate: string;
  startTime: TimeString;
  endTime: TimeString;
  sessionType: SessionType;
}