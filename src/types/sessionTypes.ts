export type SessionType = 
  | 'LECTURE'
  | 'LAB'
  | 'SEMINAR'
  | 'EXAM'
  | 'DISCUSSION';

export const SESSION_TYPES = {
  LECTURE: 'LECTURE',
  LAB: 'LAB',
  SEMINAR: 'SEMINAR',
  EXAM: 'EXAM',
  DISCUSSION: 'DISCUSSION'
} as const;

