// src/components/ScheduleSessionForm.tsx
import { useState } from 'react';
import type { 
  RecurrencePattern, 
  RecurrenceTimeSlot, 
  RecurrenceFrequency,
  SessionType
} from '../types/recurrenceTypes';
import type { Instructor } from '../types/userTypes';
import { Course } from '../types';

interface Props {
  onSubmit: (pattern: Omit<RecurrencePattern, 'timeSlots'> & { timeSlots: RecurrenceTimeSlot[] }) => void;
  instructors: Instructor[];
  courses: Course[];
}

export default function ScheduleSessionForm({ onSubmit, instructors }: Props) {
  const [timeSlots, setTimeSlots] = useState<RecurrenceTimeSlot[]>([
    { dayOfWeek: 'MONDAY', startTime: '09:00', endTime: '10:00' }
  ]);
  const [pattern, setPattern] = useState<Omit<RecurrencePattern, 'timeSlots'>>({
    startDate: '',
    endDate: '',
    frequency: 'WEEKLY',
    sessionType: 'LECTURE',
    instructorId: '',
    courseId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all time slots
    const isValid = timeSlots.every(slot => {
      const start = parseInt(slot.startTime.replace(':', ''));
      const end = parseInt(slot.endTime.replace(':', ''));
      return start < end;
    });

    if (!isValid) {
      alert('End time must be after start time in all slots');
      return;
    }

    onSubmit({
      ...pattern,
      timeSlots
    });
  };

  const addTimeSlot = () => {
    setTimeSlots(prev => [
      ...prev,
      { dayOfWeek: 'MONDAY', startTime: '09:00', endTime: '10:00' }
    ]);
  };

  const updateTimeSlot = (index: number, field: keyof RecurrenceTimeSlot, value: string) => {
    setTimeSlots(prev => prev.map((slot, i) => 
      i === index ? { ...slot, [field]: value } : slot
    ));
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h3>Schedule Recurring Sessions</h3>

      {/* Time Slots */}
      <div className="time-slots">
        {timeSlots.map((slot, index) => (
          <div key={index} className="time-slot-group">
            <div className="form-group">
              <label>Day</label>
              <select
                value={slot.dayOfWeek}
                onChange={e => updateTimeSlot(index, 'dayOfWeek', e.target.value)}
              >
                {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].map(day => (
                  <option key={day} value={day}>{day.slice(0, 3)}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Start</label>
              <input
                type="time"
                value={slot.startTime}
                onChange={e => updateTimeSlot(index, 'startTime', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End</label>
              <input
                type="time"
                value={slot.endTime}
                onChange={e => updateTimeSlot(index, 'endTime', e.target.value)}
              />
            </div>

            {timeSlots.length > 1 && (
              <button
                type="button"
                className="remove-slot"
                onClick={() => removeTimeSlot(index)}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <button type="button" className="add-slot" onClick={addTimeSlot}>
        + Add Time Slot
      </button>

      {/* Date Range */}
      <div className="form-row">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            required
            value={pattern.startDate}
            onChange={e => setPattern(p => ({ ...p, startDate: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            required
            value={pattern.endDate}
            onChange={e => setPattern(p => ({ ...p, endDate: e.target.value }))}
          />
        </div>
      </div>

      {/* Frequency */}
      <div className="form-group">
        <label>Frequency</label>
        <select
          value={pattern.frequency}
          onChange={e => setPattern(p => ({ ...p, frequency: e.target.value as RecurrenceFrequency }))}
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
          onChange={e => setPattern(p => ({ ...p, sessionType: e.target.value as SessionType }))}
        >
          <option value="LECTURE">Lecture</option>
          <option value="LAB">Lab</option>
          <option value="SEMINAR">Seminar</option>
          <option value="FIELD_TRIP">Field Trip</option>
        </select>
      </div>

      {/* Instructor */}
      <div className="form-group">
        <label>Instructor</label>
        <select
          required
          value={pattern.instructorId}
          onChange={e => setPattern(p => ({ ...p, instructorId: e.target.value }))}
        >
          <option value="">Select Instructor</option>
          {instructors.map(instructor => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-button">
        Create Schedule
      </button>
    </form>
  );
}