// src/hooks/useClassroomMachine.ts
import { useMachine } from '@xstate/react';
import { classroomMachine } from '../machines/classroomMachine';
import type { Classroom, Course, CourseSession } from '../types';

export const useClassroom = (
  classroom: Classroom,
  courses: Course[]
) => {
  const [state, send] = useMachine(classroomMachine, {
    input: {
      classroom,
      courses
    }
  });

  return {
    state: state.value,
    currentSession: state.context.currentSession,
    upcomingSessions: state.context.upcomingSessions,
    scheduleSession: (session: CourseSession) =>
      send({ type: 'schedule.session', session }),
    cancelSession: (sessionId: string) =>
      send({ type: 'cancel.session', sessionId })
  };
};