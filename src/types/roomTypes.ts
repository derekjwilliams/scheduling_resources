import { SessionType } from './sessionTypes';
import type { Coordinate } from './utilityTypes';

export type RoomType = 
  | 'CLASSROOM'
  | 'LABORATORY'
  | 'AUDITORIUM'
  | 'CONFERENCE_ROOM'
  | 'STUDIO';

export const ROOM_TYPES = {
  CLASSROOM: 'CLASSROOM',
  LABORATORY: 'LABORATORY',
  AUDITORIUM: 'AUDITORIUM',
  CONFERENCE_ROOM: 'CONFERENCE_ROOM',
  STUDIO: 'STUDIO'
} as const satisfies Record<string, RoomType>;

export type RoomFeature = 
  | 'WHITEBOARD'
  | 'PROJECTOR'
  | 'SOUND_SYSTEM'
  | 'LAB_BENCHES'
  | 'CHEMICAL_HOODS'
  | 'WHEELCHAIR_ACCESSIBLE';

export interface Classroom {
  id: string;
  roomNumber: string;
  availableSessionTypes?: SessionType[]; 
  code: string;
  type: RoomType;
  capacity: number;
  features: RoomFeature[];
  building: string;
  floor: number;
  coordinates?: Coordinate;
}

export const isRoomType = (value: string): value is RoomType =>
  Object.values(ROOM_TYPES).includes(value as RoomType);