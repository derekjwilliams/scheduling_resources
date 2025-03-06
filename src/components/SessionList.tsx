// src/components/SessionList.tsx
import type { CourseSession } from '../types';

interface Props {
  sessions: CourseSession[];
  onCancel: (sessionId: string) => void;
}

export default function SessionList({ sessions, onCancel }: Props) {
  return (
    <div className="session-list">
      <h3>Upcoming Sessions</h3>
      {sessions.length === 0 ? (
        <p>No upcoming sessions</p>
      ) : (
        <ul>
          {sessions.map(session => (
            <li key={session.id}>
              <div className="session-info">
                <span>{session.date} {session.startTime}-{session.endTime}</span>
                <span>{session.sessionType}</span>
              </div>
              <button 
                className="cancel-button"
                onClick={() => onCancel(session.id)}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}