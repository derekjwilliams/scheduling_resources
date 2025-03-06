import { 
  addWeeks, 
  eachDayOfInterval, 
  parseISO, 
  formatISO, 
  isBefore,
  isSameDay
} from 'date-fns';
import type { CourseSchedule, DayOfWeek, CourseSession } from '../types';

export function generateSessionsFromSchedule(
  schedule: CourseSchedule,
  courseId: string
): CourseSession[] {
  const { pattern, excludedDates, instructorId } = schedule;
  const sessions: CourseSession[] = [];
  
  const startDate = parseISO(pattern.startDate);
  const endDate = parseISO(pattern.endDate);
  const exclusionDates = excludedDates.map(d => parseISO(d));

  const dayMap = pattern.daysOfWeek.reduce((acc, day) => {
    acc[day] = true;
    return acc;
  }, {} as Record<DayOfWeek, boolean>);

  let currentDate = startDate;

  while (isBefore(currentDate, endDate) {
    const weekDates = eachDayOfInterval({
      start: currentDate,
      end: addWeeks(currentDate, 1)
    });

    weekDates.forEach(date => {
      const isoDate = formatISO(date, { representation: 'date' });
      const dayOfWeek = formatISO(date, { weekday: 'long' }).toUpperCase() as DayOfWeek;

      if (
        dayMap[dayOfWeek] &&
        !exclusionDates.some(exclDate => isSameDay(exclDate, date)) &&
        (isBefore(date, endDate) || isSameDay(date, endDate))
      ) {
        sessions.push({
          id: `${schedule.id}-${isoDate}`,
          courseId,
          scheduleId: schedule.id,
          instructorId,
          date: isoDate,
          startTime: pattern.startTime,
          endTime: pattern.endTime,
          sessionType: pattern.sessionType,
          status: 'SCHEDULED'
        });
      }
    });

    currentDate = addWeeks(currentDate, 1);
  }

  return sessions;
}