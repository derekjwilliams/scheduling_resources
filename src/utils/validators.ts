import { Classroom, CourseSession, isTimeString, ValidationResult } from "../types";

export const validateTimeSlot = (
  start: string, 
  end: string
): ValidationResult => {
  if (!isTimeString(start) || !isTimeString(end)) {
    return { isValid: false, message: 'Invalid time format' };
  }
  
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);
  
  if (endHours < startHours || (endHours === startHours && endMinutes <= startMinutes)) {
    return { isValid: false, message: 'End time must be after start time' };
  }
  
  return { isValid: true, message: "valid" };
};
export interface ValidationError {
  code: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export const validateSessionRoom = (
  session: CourseSession,
  classroom: Classroom
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  if (session.sessionType === 'LAB' && !classroom.features.includes('LAB_BENCHES')) {
    errors.push({
      code: 'INVALID_LAB_SPACE',
      message: 'Lab sessions require lab benches',
      metadata: {
        requiredFeature: 'LAB_BENCHES',
        actualFeatures: classroom.features
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    message: 'valid'
  };
};