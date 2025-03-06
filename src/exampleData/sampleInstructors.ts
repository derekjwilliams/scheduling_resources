// src/data/sampleInstructors.ts
import type { Instructor } from '../types';

export const sampleInstructors: Instructor[] = [
  {
    id: 'instr-1',
    name: 'Dr. Rocky Stonebreaker',
    unavailableTimes: [
      { day: 'MONDAY', startTime: '13:00', endTime: '15:00' } // Department meetings
    ],
    maxWeeklyHours: 18,
    preferredRoomTypes: ['AUDITORIUM', 'CLASSROOM'],
    specialties: ['Geology and Society', 'Earth Resources']
  },
  {
    id: 'instr-2',
    name: 'Prof. Crystal Formation',
    unavailableTimes: [
      { day: 'FRIDAY', startTime: '08:00', endTime: '12:00' } // Field work days
    ],
    maxWeeklyHours: 20,
    preferredRoomTypes: ['LABORATORY'],
    specialties: ['Mineralogy', 'Optical Mineralogy']
  },
  {
    id: 'instr-3',
    name: 'Dr. Tectonic Plate',
    unavailableTimes: [
      { day: 'WEDNESDAY', startTime: '09:00', endTime: '11:00' } // Graduate seminars
    ],
    maxWeeklyHours: 15,
    preferredRoomTypes: ['CLASSROOM'],
    specialties: ['Dynamic Earth', 'Plate Tectonics']
  },
  {
    id: 'instr-4',
    name: 'Prof. Igneous Rockwell',
    unavailableTimes: [
      { day: 'THURSDAY', startTime: '14:00', endTime: '17:00' } // Volcanic monitoring
    ],
    maxWeeklyHours: 25,
    preferredRoomTypes: ['LABORATORY', 'STUDIO'],
    specialties: ['Petrology', 'Magmatic Systems']
  },
  {
    id: 'instr-5',
    name: 'Dr. Sedimentary Strata',
    unavailableTimes: [
      { day: 'TUESDAY', startTime: '10:00', endTime: '12:00' } // Core sample analysis
    ],
    maxWeeklyHours: 20,
    preferredRoomTypes: ['CLASSROOM'],
    specialties: ['Stratigraphy', 'Sedimentation']
  },
  {
    id: 'instr-6',
    name: 'Prof. Glacier Boulder',
    unavailableTimes: [
      { day: 'MONDAY', startTime: '08:00', endTime: '10:00' }, // Ice core lab
      { day: 'FRIDAY', startTime: '12:00', endTime: '14:00' }   // Polar research
    ],
    maxWeeklyHours: 18,
    preferredRoomTypes: ['LABORATORY'],
    specialties: ['Glacial Geology', 'Paleoclimatology']
  },
  {
    id: 'instr-7',
    name: 'Dr. Fossil Finder',
    unavailableTimes: [
      { day: 'WEDNESDAY', startTime: '13:00', endTime: '17:00' } // Dig site visits
    ],
    maxWeeklyHours: 22,
    preferredRoomTypes: ['CLASSROOM', 'LABORATORY'],
    specialties: ['Paleontology', 'Biostratigraphy']
  },
  {
    id: 'instr-8',
    name: 'Prof. Aquifer Wells',
    unavailableTimes: [
      { day: 'THURSDAY', startTime: '09:00', endTime: '11:00' } // Hydrology fieldwork
    ],
    maxWeeklyHours: 16,
    preferredRoomTypes: ['CLASSROOM'],
    specialties: ['Hydrogeology', 'Environmental Change']
  }
];
