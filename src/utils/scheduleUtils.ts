import { addWeeks, eachDayOfInterval, formatISO, isBefore, isSameDay, parseISO } from "date-fns";
import { CourseSchedule, CourseSession } from "../types";

// src/utils/scheduleUtils.ts
export function generateSessionsFromSchedule(
  schedule: CourseSchedule,
  courseId: string
): CourseSession[] {
  const sessions: CourseSession[] = [];
  const { pattern, excludedDates, instructorId } = schedule;
  
  const startDate = parseISO(pattern.startDate);
  const endDate = parseISO(pattern.endDate);
  const exclusionDates = excludedDates.map(d => parseISO(d));

  let currentDate = startDate;
  let weekOffset = 0;

  while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
    if (pattern.frequency === 'BIWEEKLY' && weekOffset % 2 !== 0) {
      weekOffset++;
      currentDate = addWeeks(currentDate, 1);
      continue;
    }

    const weekDates = eachDayOfInterval({
      start: currentDate,
      end: addWeeks(currentDate, 1)
    });

    weekDates.forEach(date => {
      const dayOfWeek = formatISO(date, { weekday: 'long' }).toUpperCase() as DayOfWeek;
      const matchingSlots = pattern.timeSlots.filter(slot => slot.dayOfWeek === dayOfWeek);

      matchingSlots.forEach(slot => {
        const isoDate = formatISO(date, { representation: 'date' });
        
        if (!exclusionDates.some(exclDate => isSameDay(exclDate, date))) {
          sessions.push({
            id: `${schedule.id}-${isoDate}-${slot.startTime}`,
            courseId,
            scheduleId: schedule.id,
            instructorId,
            date: isoDate,
            startTime: slot.startTime,
            endTime: slot.endTime,
            sessionType: pattern.sessionType,
            status: 'SCHEDULED'
          });
        }
      });
    });

    weekOffset++;
    currentDate = addWeeks(currentDate, 1);
  }

  return sessions;
}