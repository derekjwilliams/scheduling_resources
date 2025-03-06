// src/components/ClassroomScheduler.tsx
import { useMachine } from '@xstate/react';
import { createBrowserInspector } from '@statelyai/inspect';
import { classroomMachine } from '../machines/classroomMachine';
import ClassroomStatus from './ClassroomStatus';
import SessionList from './SessionList';
import ScheduleSessionForm from './ScheduleSessionForm';
import type { Classroom, Course, CourseSession } from '../types';
import type { SessionType } from '../types/sessionTypes';

const { inspect } = createBrowserInspector();

interface Props {
  classroom: Classroom;
  courses: Course[];
  instructors: Array<{ id: string; name: string }>;
}

export default function ClassroomScheduler({ classroom, courses, instructors }: Props) {
  const [state, send] = useMachine(classroomMachine, {
    input: {
      classroom,
      courses,
      currentSession: null,
      upcomingSessions: []
    },
    inspect
  });

  const handleSchedule = (formData: {
    date: string;
    startTime: string;
    endTime: string;
    sessionType: SessionType;
    instructorId: string;
  }) => {
    const newSession: CourseSession = {
      id: Date.now().toString(),
      scheduleId: '', // Generate or select appropriate schedule ID
      instructorId: formData.instructorId,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      sessionType: formData.sessionType,
      status: 'SCHEDULED'
    };
    
    send({ type: 'schedule.session', session: newSession });
  };

  const handleCancel = (sessionId: string) => {
    send({ type: 'cancel.session', sessionId });
  };

  return (
    <div className="classroom-scheduler">
      <ClassroomStatus 
        classroom={state.context.classroom} 
        currentSession={state.context.currentSession} 
      />
      
      <div className="scheduler-content">
        <ScheduleSessionForm 
          onSubmit={handleSchedule}
          instructors={instructors}
        />
        
        <SessionList 
          sessions={state.context.upcomingSessions}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}