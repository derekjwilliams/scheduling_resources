// src/data/sampleCourses.ts
import type { Course,  } from '../types';

export const sampleCourses: Course[] = [
  {
    id: 'geol-120',
    code: 'GEOL 120',
    title: 'Geology and Society',
    requiredFeatures: ['PROJECTOR', 'WHITEBOARD'],
    minimumCapacity: 50,
    preferredInstructors: ['instr-1', 'instr-2'],
    schedules: [
      {
        id: 'geol-120-lecture',
        timeSlots: [
          {
            dayOfWeek: 'MONDAY',
            startTime: '10:00',
            endTime: '11:15',
            frequency: 'WEEKLY',
            effectiveFrom: '2024-09-01',
            effectiveUntil: '2024-12-15'
          },
          {
            dayOfWeek: 'WEDNESDAY',
            startTime: '10:00',
            endTime: '11:15',
            frequency: 'WEEKLY',
            effectiveFrom: '2024-09-01',
            effectiveUntil: '2024-12-15'
          }
        ],
        excludedDates: ['2024-11-27']
      }
    ]
  },
  {
    id: 'geol-232',
    code: 'GEOL 232',
    title: 'Mineralogy',
    requiredFeatures: ['LAB_BENCHES', 'MICROSCOPES', 'WHITEBOARD'],
    minimumCapacity: 25,
    preferredInstructors: ['instr-3'],
    schedules: [
      {
        id: 'geol-232-lecture',
        timeSlots: [
          {
            dayOfWeek: 'TUESDAY',
            startTime: '13:00',
            endTime: '14:30',
            frequency: 'WEEKLY',
            effectiveFrom: '2024-09-01',
            effectiveUntil: '2024-12-15'
          }
        ],
        excludedDates: []
      },
      {
        id: 'geol-232-lab',
        timeSlots: [
          {
            dayOfWeek: 'FRIDAY',
            startTime: '14:00',
            endTime: '17:00',
            frequency: 'BIWEEKLY',
            effectiveFrom: '2024-09-06',
            effectiveUntil: '2024-12-13'
          }
        ],
        excludedDates: ['2024-11-29']
      }
    ]
  },
  {
    id: 'geol-340',
    code: 'GEOL 340',
    title: 'Glacial Geology',
    requiredFeatures: ['PROJECTOR', 'GIS_STATIONS'],
    minimumCapacity: 30,
    preferredInstructors: ['instr-4'],
    schedules: [
      {
        id: 'geol-340-field',
        timeSlots: [
          {
            dayOfWeek: 'THURSDAY',
            startTime: '08:00',
            endTime: '16:00',
            frequency: 'WEEKLY',
            effectiveFrom: '2024-09-05',
            effectiveUntil: '2024-12-12'
          }
        ],
        excludedDates: ['2024-10-10']
      }
    ]
  },
  {
    id: 'geol-342',
    code: 'GEOL 342',
    title: 'Paleontology',
    requiredFeatures: ['SPECIMEN_DISPLAY', 'PROJECTOR'],
    minimumCapacity: 35,
    preferredInstructors: ['instr-5'],
    schedules: [
      {
        id: 'geol-342-lecture',
        timeSlots: [
          {
            dayOfWeek: 'MONDAY',
            startTime: '09:00',
            endTime: '10:30',
            frequency: 'WEEKLY',
            effectiveFrom: '2024-09-01',
            effectiveUntil: '2024-12-15'
          },
          {
            dayOfWeek: 'WEDNESDAY',
            startTime: '09:00',
            endTime: '10:30',
            frequency: 'WEEKLY',
            effectiveFrom: '2024-09-01',
            effectiveUntil: '2024-12-15'
          }
        ],
        excludedDates: []
      }
    ]
  },
  {
    id: 'geol-344',
    code: 'GEOL 344',
    title: 'Stratigraphy and Sedimentation',
    requiredFeatures: ['SAMPLE_PREP_AREA', 'MICROSCOPES'],
    minimumCapacity: 25,
    preferredInstructors: ['instr-6'],
    schedules: [
      {
        id: 'geol-344-lab',
        timeSlots: [
          {
            dayOfWeek: 'TUESDAY',
            startTime: '14:00',
            endTime: '17:00',
            frequency: 'WEEKLY',
            effectiveFrom: '2024-09-03',
            effectiveUntil: '2024-12-10'
          }
        ],
        excludedDates: ['2024-11-26']
      }
    ]
  }
  // Add remaining courses following similar patterns
];
