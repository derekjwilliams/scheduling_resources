import React, { useState } from 'react';
import { useRoom, useRoomSelector } from '../contexts/RoomContext';
import { inspect } from '../inspector';

export const RoomScheduler: React.FC = () => {
  const [studentCount, setStudentCount] = useState<number>(15);
  const { roomSend } = useRoom();
  
  // Select data from the machine state
  const isOccupied = useRoomSelector(state => state.matches('occupied'));
  const currentStudents = useRoomSelector(state => state.context.currentStudents);
  const maxCapacity = useRoomSelector(state => state.context.maxCapacity);
  const minPreferred = useRoomSelector(state => state.context.minPreferred);
  const currentSession = useRoomSelector(state => state.context.currentSession);

  // Handle starting a session
  const handleStartSession = () => {
    roomSend({ type: 'SESSION.START', initialStudents: studentCount });
  };

  // Handle ending a session
  const handleEndSession = () => {
    if (currentSession) {
      currentSession.send({ type: 'END' });
    }
  };

  return (
    <div className="room-scheduler">
      <h2>Room Scheduler</h2>
      
      <div className="room-status">
        <p>Status: {isOccupied ? 'Occupied' : 'Available'}</p>
        {isOccupied && <p>Current Students: {currentStudents}</p>}
        <p>Max Capacity: {maxCapacity}</p>
        <p>Min Preferred: {minPreferred}</p>
      </div>
      
      {!isOccupied ? (
        <div className="session-starter">
          <h3>Start New Session</h3>
          <div className="form-group">
            <label>
              Number of Students:
              <input
                type="number"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                min="1"
                max={maxCapacity}
              />
            </label>
          </div>
          <button onClick={handleStartSession}>Start Session</button>
        </div>
      ) : (
        <div className="session-manager">
          <h3>Manage Current Session</h3>
          <div className="form-group">
            <label>
              Update Student Count:
              <input
                type="number"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                min="1"
                max={maxCapacity}
              />
            </label>
          </div>
          <button 
            onClick={() => {
              if (currentSession) {
                currentSession.send({ type: 'SET_STUDENTS', count: studentCount });
              }
            }}
          >
            Update Count
          </button>
          <button onClick={handleEndSession}>End Session</button>
        </div>
      )}
    </div>
  );
};