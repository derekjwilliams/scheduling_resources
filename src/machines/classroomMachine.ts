// src/machines/classroomMachine.ts
import { assign, setup } from 'xstate';
import type { Classroom, Course, CourseSession } from '../types';
import { validateTimeSlot } from '../utils/validators';

// Add Input type for initialization
interface MachineInput {
  classroom: Classroom;
  courses: Course[];
}

interface ClassroomContext extends MachineInput {
  currentSession: CourseSession | null;
  upcomingSessions: CourseSession[];
}

type ClassroomEvent =
  | { type: 'schedule.session'; session: CourseSession }
  | { type: 'cancel.session'; sessionId: string }
  | { type: 'session.start' }
  | { type: 'session.end' };

export const classroomMachine = setup({
  types: {
    context: {} as ClassroomContext,
    events: {} as ClassroomEvent,
    input: {} as MachineInput
  },
  actions: {
    addUpcomingSession: assign({
      upcomingSessions: ({ context, event }) => {
        if (event.type !== 'schedule.session') return context.upcomingSessions;
        return [...context.upcomingSessions, event.session];
      }
    }),
    startSession: assign({
      currentSession: ({ context }) => context.upcomingSessions[0] || null,
      upcomingSessions: ({ context }) => context.upcomingSessions.slice(1)
    }),
    completeSession: assign({
      currentSession: () => null
    })
  },
  guards: {
    isValidSession: ({ context, event }) => {
      if (event.type !== 'schedule.session') return false;

      // Find the associated course through schedule
      const course = context.courses.find(c =>
        c.schedules.some(s => s.id === event.session.scheduleId)
      );

      if (!course) return false;

      // 1. Check course requirements against classroom features
      const hasFeatures = course.requiredFeatures.every(f => 
        context.classroom.features.includes(f)
      );

      // 2. Check classroom capacity meets course minimum
      const hasCapacity = context.classroom.capacity >= course.minimumCapacity;

      // 3. Validate time slot format
      const timeValid = validateTimeSlot(
        event.session.startTime,
        event.session.endTime
      );

      // 4. Check for scheduling conflicts
      const hasConflict = context.upcomingSessions.some(s => 
        s.date === event.session.date &&
        s.startTime === event.session.startTime
      );

      return hasFeatures && hasCapacity && timeValid.isValid && !hasConflict;
    }
  },
  delays: {
    calculateSessionDelay: ({ context }) => {
      if (!context.currentSession) return 0;
      const [startH, startM] = context.currentSession.startTime.split(':').map(Number);
      const [endH, endM] = context.currentSession.endTime.split(':').map(Number);
      return ((endH - startH) * 60 + (endM - startM)) * 60 * 1000;
    }
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMA2BDWsBOB7XAtgHToBu6AlhgEapgDEsyAFpAK51GxywW4B2AbQAMAXUSgADrl4AXPvwkgAHogAsAdg1EAHAEY9ANgDMAJj3G9O0wFY9NgDQgAnon1ErVm8eE-TGwxsATgBfEKc0TBx8YlxkZDZJCkh6ZVhZdFkwEgAzLOwACmR0VASMLIBlHgUAETAMZwBKekisPEIiOISkyBFxJBBpOQUlVQRbIKJhHSCDU1mNYxsNII0nVwQ9AI9jY0M9INNDUx1hQ9Mw8JB+XAg4JVbowiUhinkBUcQAWkN178MpsIgWc7KcdIZfHowhEMG0YiRyFR0LQwC8ZG8RgMxjZDJNlsF5kFLDY1Ho-pt3EccUYIQEzEEdNCQI92rF4olkhA0cMPlj1KZyRZtIYZgTwbNhBodIzLkA */
  id: 'classroom',
  context: ({ input }) => ({
    classroom: input.classroom,
    courses: input.courses,
    currentSession: null,
    upcomingSessions: []
  }),
  initial: 'available',
  states: {
    available: {
      on: {
        'schedule.session': {
          guard: 'isValidSession',
          actions: 'addUpcomingSession'
        }
      }
    },
    occupied: {
      entry: 'startSession',
      exit: 'completeSession',
      after: {
        calculateSessionDelay: {
          target: 'available'
        }
      }
    }
  }
});