import { Classroom } from "../types";
import { v4 as uuidv4 } from 'uuid';

// tests/factories.ts
export const createSampleClassroom = (
  overrides: Partial<Classroom> = {}
): Classroom => ({
  id: uuid(),
  code: 'A-101',
  type: 'CLASSROOM',
  capacity: 30,
  features: ['WHITEBOARD', 'PROJECTOR'],
  building: 'Building A',
  floor: 1,
  ...overrides
});