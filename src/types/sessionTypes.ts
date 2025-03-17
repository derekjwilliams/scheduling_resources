// types/sessionTypes.ts
export type SessionType = 
  | 'LECTURE'
  | 'LAB'
  | 'SEMINAR'
  | 'EXAM'
  | 'DISCUSSION'
  | 'FIELD_TRIP'

export const SESSION_TYPES = {
  LECTURE: 'LECTURE',
  LAB: 'LAB',
  SEMINAR: 'SEMINAR',
  EXAM: 'EXAM',
  DISCUSSION: 'DISCUSSION',
  FIELD_TRIP: 'FIELD_TRIP',
} as const;

export const isSessionType = (value: string): value is SessionType =>
  Object.values(SESSION_TYPES).includes(value as SessionType);

