// src/data/sampleClassrooms.ts
import type { Classroom, RoomType, RoomFeature } from '../types/roomTypes';
// import { Coordinate } from '../types/utilityTypes';

export const sampleClassrooms: Classroom[] = [
  {
    id: 'room-101',
    code: 'SCI-101',
    type: 'CLASSROOM',
    capacity: 40,
    features: ['WHITEBOARD', 'PROJECTOR', 'WHEELCHAIR_ACCESSIBLE'],
    building: 'Science Building',
    floor: 1,
    coordinates: {
      building: 'Science Building',
      floor: 1,
      x: 120.5,
      y: 45.3
    }
  },
  {
    id: 'room-204',
    code: 'GEO-LAB-1',
    type: 'LABORATORY',
    capacity: 25,
    features: ['LAB_BENCHES', 'CHEMICAL_HOODS', 'MICROSCOPES', 'PROJECTOR'],
    building: 'Geology Annex',
    floor: 2,
    coordinates: {
      building: 'Geology Annex',
      floor: 2,
      x: 85.0,
      y: 32.1
    }
  },
  {
    id: 'room-300',
    code: 'AUD-3',
    type: 'AUDITORIUM',
    capacity: 150,
    features: ['SOUND_SYSTEM', 'PROJECTOR', 'WHEELCHAIR_ACCESSIBLE'],
    building: 'Main Campus Building',
    floor: 3
  },
  {
    id: 'room-105',
    code: 'FIELD-PREP',
    type: 'STUDIO',
    capacity: 30,
    features: ['SAMPLE_PREP_AREA', 'GIS_STATIONS', 'SPECIMEN_DISPLAY'],
    building: 'Earth Sciences Complex',
    floor: 1
  }
];

// Optional: Add more classrooms using a generator
export function generateSampleClassrooms(count: number): Classroom[] {
  const classrooms: Classroom[] = [];
  const buildings = ['Science Building', 'Geology Annex', 'Main Campus Building'];
  const types: RoomType[] = ['CLASSROOM', 'LABORATORY', 'AUDITORIUM', 'STUDIO'];

  for (let i = 0; i < count; i++) {
    classrooms.push({
      id: `room-${100 + i}`,
      code: `ROOM-${100 + i}`,
      type: types[i % types.length],
      capacity: [30, 40, 25, 150][i % 4],
      features: getRandomFeatures(),
      building: buildings[i % buildings.length],
      floor: (i % 3) + 1
    });
  }

  return classrooms;
}

function getRandomFeatures(): RoomFeature[] {
  const allFeatures: RoomFeature[] = [
    'WHITEBOARD',
    'PROJECTOR',
    'LAB_BENCHES',
    'CHEMICAL_HOODS',
    'MICROSCOPES',
    'GIS_STATIONS',
    'SPECIMEN_DISPLAY',
    'SAMPLE_PREP_AREA',
    'WHEELCHAIR_ACCESSIBLE'
  ];
  
  return allFeatures
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 4) + 1);
}