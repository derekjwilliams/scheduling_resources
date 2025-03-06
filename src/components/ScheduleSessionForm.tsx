// src/components/ScheduleSessionForm.tsx
import { useState } from 'react';
import type { DayOfWeek, SessionType, TimeString } from '../types';
import type { RecurrencePattern } from '../types/recurrenceTypes';


interface Props {
  onSubmit: (pattern: RecurrencePattern) => void;
  instructors: Array<{ id: string; name: string }>;
}

export default function ScheduleSessionForm({ onSubmit, instructors }: Props) {
  const [pattern, setPattern] = useState<RecurrencePattern>({
    daysOfWeek: [],
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '10:00',
    sessionType: 'LECTURE'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pattern);
  };

  const toggleDay = (day: DayOfWeek) => {
    setPattern(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day]
    }));
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h3>Schedule Recurring Sessions</h3>

      {/* Day Selection */}
      <div className="form-group">
        <label>Days of Week</label>
        <div className="day-selector">
          {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].map(day => (
            <button
              type="button"
              key={day}
              className={`day-button ${pattern.daysOfWeek.includes(day as DayOfWeek) ? 'selected' : ''}`}
              onClick={() => toggleDay(day as DayOfWeek)}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          required
          value={pattern.startDate}
          onChange={e => setPattern({ ...pattern, startDate: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          required
          value={pattern.endDate}
          onChange={e => setPattern({ ...pattern, endDate: e.target.value })}
        />
      </div>

      {/* Time Inputs */}
      <div className="form-group">
        <label>Start Time</label>
        <input
          type="time"
          required
          value={pattern.startTime}
          onChange={e => setPattern({ ...pattern, startTime: e.target.value as TimeString })}
        />
      </div>

      <div className="form-group">
        <label>End Time</label>
        <input
          type="time"
          required
          value={pattern.endTime}
          onChange={e => setPattern({ ...pattern, endTime: e.target.value as TimeString })}
        />
      </div>

      {/* Frequency Selection */}
      <div className="form-group">
        <label>Frequency</label>
        <select
          value={pattern.frequency}
          onChange={e => setPattern({ ...pattern, frequency: e.target.value as 'WEEKLY' | 'BIWEEKLY' })}
        >
          <option value="WEEKLY">Weekly</option>
          <option value="BIWEEKLY">Every Other Week</option>
        </select>
      </div>

      {/* Session Type */}
      <div className="form-group">
        <label>Session Type</label>
        <select
          value={pattern.sessionType}
          onChange={e => setPattern({ ...pattern, sessionType: e.target.value as SessionType })}
        >
          <option value="LECTURE">Lecture</option>
          <option value="LAB">Lab</option>
          <option value="SEMINAR">Seminar</option>
        </select>
      </div>

      <button type="submit" className="submit-button">
        Create Recurring Sessions
      </button>
    </form>
  );
}