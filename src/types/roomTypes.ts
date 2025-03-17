// types/roomTypes.ts
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
  | 'LAB_BENCHES'
  | 'CHEMICAL_HOODS'
  | 'MICROSCOPES'
  | 'GIS_STATIONS'
  | 'SPECIMEN_DISPLAY'
  | 'SAMPLE_PREP_AREA' 
  | 'WHEELCHAIR_ACCESSIBLE' 
  | 'SOUND_SYSTEM'

export const ROOM_FEATURES = {
  WHITEBOARD: 'WHITEBOARD',
  PROJECTOR: 'PROJECTOR',
  LAB_BENCHES: 'LAB_BENCHES',
  CHEMICAL_HOODS: 'CHEMICAL_HOODS',
  MICROSCOPES: 'MICROSCOPES',
  GIS_STATIONS: 'GIS_STATIONS',
  SPECIMEN_DISPLAY: 'SPECIMEN_DISPLAY',
  SAMPLE_PREP_AREA: 'SAMPLE_PREP_AREA',
  WHEELCHAIR_ACCESSIBLE: 'WHEELCHAIR_ACCESSIBLE',
  SOUND_SYSTEM: 'SOUND_SYSTEM'
} as const satisfies Record<string, RoomFeature>;  

export interface Classroom {
  id: string;
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

export const isRoomFeature = (value: string): value is RoomFeature =>
  Object.values(ROOM_FEATURES).includes(value as RoomFeature);