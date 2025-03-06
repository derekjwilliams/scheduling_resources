// src/components/ClassroomStatus.tsx
import type { Classroom, CourseSession } from '../types';

interface Props {
  classroom: Classroom;
  currentSession: CourseSession | null;
}

export default function ClassroomStatus({ classroom, currentSession }: Props) {
  return (
    <div className="classroom-status">
      <h2>{classroom.code} - {classroom.building} Floor {classroom.floor}</h2>
      <div className="status-indicator">
        <span className={`status-dot ${currentSession ? 'occupied' : 'available'}`} />
        <span>{currentSession ? 'In Use' : 'Available'}</span>
      </div>
      {currentSession && (
        <div className="current-session">
          <h3>Current Session</h3>
          <p>{currentSession.sessionType} until {currentSession.endTime}</p>
        </div>
      )}
    </div>
  );
}