// src/components/ClassroomScheduler.tsx
import { useMachine } from '@xstate/react';
import { createBrowserInspector } from '@statelyai/inspect';
import { classroomMachine } from '../machines/classroomMachine';
import { generateSessionsFromSchedule } from '../utils/scheduleUtils';
import ClassroomStatus from './ClassroomStatus';
import SessionList from './SessionList';
import ScheduleSessionForm from './ScheduleSessionForm';
import type { Classroom, Course, Instructor, CourseSchedule } from '../types';

const { inspect } = createBrowserInspector();

interface Props {
  classroom: Classroom;
  courses: Course[];
  instructors: Instructor[];
}

export default function ClassroomScheduler({ classroom, courses, instructors }: Props) {
  const [state, send] = useMachine(classroomMachine, {
    inspect,
    input: {
      classroom,
      courses,
      currentSession: null,
      upcomingSessions: []
    }
  });

  const handleRecurringSchedule = (pattern: CourseSchedule['pattern']) => {
    // Create temporary schedule object
    const newSchedule: CourseSchedule = {
      id: `schedule-${Date.now()}`,
      pattern,
      excludedDates: [],
      courseId: pattern.courseId
    };

    // Generate sessions
    const newSessions = generateSessionsFromSchedule(newSchedule, newSchedule.courseId);

    // Validate sessions
    const conflicts = newSessions.filter(newSession =>
      state.context.upcomingSessions.some(existingSession =>
        existingSession.date === newSession.date &&
        existingSession.startTime === newSession.startTime &&
        existingSession.classroomId === classroom.id
      )
    );

    if (conflicts.length > 0) {
      alert(`Found ${conflicts.length} conflicting sessions in ${classroom.code}`);
      return;
    }

    // Update state machine
    send({
      type: 'schedule.recurring',
      schedule: newSchedule,
      sessions: newSessions.map(session => ({
        ...session,
        classroomId: classroom.id
      }))
    });
  };

  return (
    <div className="classroom-scheduler">
      <ClassroomStatus 
        classroom={state.context.classroom} 
        currentSession={state.context.currentSession} 
      />
      
      <div className="scheduler-content">
        <ScheduleSessionForm 
          onSubmit={handleRecurringSchedule}
          instructors={instructors}
          courses={courses}
        />
        
        <SessionList 
          sessions={state.context.upcomingSessions.filter(
            s => s.classroomId === classroom.id
          )}
          onCancel={sessionId => send({ type: 'cancel.session', sessionId })}
        />
      </div>
    </div>
  );
}