// src/machines/classroomMachine.ts
import { setup, assign } from 'xstate';
import type { Classroom, Course, CourseSession } from '../types';
import { validateTimeSlot } from '../utils/validators';

interface MachineInput {
  classroom: Classroom;
  courses: Course[];
  currentSession: CourseSession | null;
  upcomingSessions: CourseSession[];
}

interface ClassroomContext extends MachineInput {
  // Explicitly include all context properties
  classroom: Classroom;
  courses: Course[];
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
      
      const course = context.courses.find(c =>
        c.schedules.some(s => s.id === event.session.scheduleId)
      );

      if (!course) return false;

      const hasFeatures = course.requiredFeatures.every(f => 
        context.classroom.features.includes(f)
      );
      const hasCapacity = context.classroom.capacity >= course.minimumCapacity;
      const timeValid = validateTimeSlot(
        event.session.startTime,
        event.session.endTime
      );
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
  id: 'classroom',
  context: ({ input }) => ({
    classroom: input.classroom,
    courses: input.courses,
    currentSession: input.currentSession,
    upcomingSessions: input.upcomingSessions
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