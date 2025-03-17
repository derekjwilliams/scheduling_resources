# Scheduling of Resources: Rooms and Instructors

## Terms Used in the Code

| Term | Description | Example |
|---|---|---|
| **Course** | Academic offering with fixed requirements | GEOL 232 - Mineralogy |
| **Schedule** | Recurring time pattern for course meetings | Every Tue/Thu 9:00-10:15 |
| **Session** | Single instance of a scheduled meeting | Tue Sep 5, 2023 9:00-10:15 |

## Type Definitions

### Diagram

Course
└─ schedules: CourseSchedule[]
   └─ timeSlots: RecurringTimeSlot[] (Tue/Thu patterns)
      └─ generates → CourseSession[] (individual dates)

Located in src/types.  There is a barrel used to combine these types, e.g. `import type { Classroom } from './types'`

### SessionTypes

Current kinds of Sessions are

  LECTURE, LAB, SEMINAR, EXAM, DISCUSSION

### CourseSchedule

###
```mermaid
classDiagram
    direction LR
    
    %% Enumerations
    class RoomType {
        <<enum>>
        CLASSROOM
        LABORATORY
        AUDITORIUM
        CONFERENCE_ROOM
        STUDIO
    }
    
    class SessionType {
        <<enum>>
        LECTURE
        LAB
        SEMINAR
        EXAM
        DISCUSSION
        FIELD_TRIP
    }
    
    class DayOfWeek {
        <<enum>>
        MONDAY
        TUESDAY
        WEDNESDAY
        THURSDAY
        FRIDAY
        SATURDAY
        SUNDAY
    }

    %% Core Entities
    class Classroom {
        +id: string
        +code: string
        +type: RoomType
        +capacity: number
        +features: RoomFeature[]
        +building: string
        +floor: number
        +coordinates?: Coordinate
    }

    class Course {
        +id: string
        +code: string
        +title: string
        +requiredFeatures: RoomFeature[]
        +minimumCapacity: number
        +preferredInstructors: string[]
        +schedules: CourseSchedule[]
    }

    class Instructor {
        +id: string
        +name: string
        +unavailableTimes: UnavailableSlot[]
        +maxWeeklyHours: number
        +preferredRoomTypes?: RoomType[]
        +maxDailySessions?: number
        +minBreakBetweenSessions?: number
        +specialties?: string[]
    }

    %% Scheduling Components
    class CourseSession {
        +startsAt: Date
        +endsAt: Date
    }

    class CourseSchedule {
        +id: string
        +courseId: string
        +pattern: RecurrencePattern
        +excludedDates: string[]
        +sessionType?: SessionType
    }

    class RecurrencePattern {
        +timeSlots: RecurrenceTimeSlot[]
        +startDate: string
        +endDate: string
        +frequency: RecurrenceFrequency
        +sessionType: SessionType
        +instructorId: string
        +courseId: string
    }

    %% Supporting Types
    class Coordinate {
        +building: string
        +floor: number
        +x: number
        +y: number
    }

    class UnavailableSlot {
        +day: DayOfWeek
        +startTime: TimeString
        +endTime: TimeString
    }

    class RecurrenceTimeSlot {
        +dayOfWeek: DayOfWeek
        +startTime: TimeString
        +endTime: TimeString
    }

    class AcademicTerm {
        +id: string
        +name: string
        +startDate: string
        +endDate: string
    }
    class RoomFeature {
        <<enum>>
        WHITEBOARD
        PROJECTOR
        LAB_BENCHES
        CHEMICAL_HOODS
        MICROSCOPES
        GIS_STATIONS
        SPECIMEN_DISPLAY
        SAMPLE_PREP_AREA
        WHEELCHAIR_ACCESSIBLE
        SOUND_SYSTEM
    }


    %% Relationships
    Classroom --> RoomType: «enum» type
    Classroom --> RoomFeature: «enum» features *
    Classroom --> Coordinate: coordinates?

    Course --> RoomFeature: «enum» requiredFeatures *
    Course --> CourseSchedule: schedules *
    Course --> Instructor: preferredInstructors ~

    CourseSession --|> CourseSessionData
    CourseSession --> Classroom: assigned via classroomId
    CourseSession --> SessionType: «enum» sessionType

    CourseSchedule --> RecurrencePattern: pattern
    CourseSchedule --> AcademicTerm: term dates

    RecurrencePattern --> RecurrenceTimeSlot: timeSlots *
    RecurrencePattern --> SessionType: «enum» sessionType

    Instructor --> UnavailableSlot: unavailableTimes *
    Instructor --> RoomType: «enum» preferredRoomTypes ~

    AcademicTerm --> CourseSchedule: defines scheduling boundaries
```
# scheduling_resources
