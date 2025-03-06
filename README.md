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
    
    class Classroom {
        +string id
        +string code
        +RoomType type
        +number capacity
        +RoomFeature[] features
        +string building
        +number floor
        +Coordinate? coordinates
    }

    class Course {
        +string id
        +string code
        +string title
        +RoomFeature[] requiredFeatures
        +number minimumCapacity
        +string[] preferredInstructors
        +CourseSchedule[] schedules
    }

    class CourseSchedule {
        +string id
        +RecurrencePattern pattern
        +string[] excludedDates
        +string instructorId
    }

    class RecurrencePattern {
        +DayOfWeek[] daysOfWeek
        +string startDate
        +string endDate
        +TimeString startTime
        +TimeString endTime
        +SessionType sessionType
    }

    class CourseSession {
        +string id
        +string courseId
        +string scheduleId
        +string instructorId
        +string date
        +TimeString startTime
        +TimeString endTime
        +SessionType sessionType
        +SessionStatus status
    }

    class Instructor {
        +string id
        +string name
        +UnavailableSlot[] unavailableTimes
        +number maxWeeklyHours
        +RoomType[] preferredRoomTypes
        +string[] specialties
    }

    class UnavailableSlot {
        +DayOfWeek day
        +TimeString startTime
        +TimeString endTime
    }

    Classroom "1" --> "0..*" CourseSession : hosts
    Course "1" --> "0..*" CourseSchedule : has
    CourseSchedule "1" --> "1" RecurrencePattern : defines
    CourseSchedule "1" --> "0..*" CourseSession : generates
    Instructor "1" --> "0..*" CourseSession : teaches
    CourseSession "1" --> "1" SessionType : uses
    RecurrencePattern "1" --> "1..*" DayOfWeek : specifies

    %% Enums
    class DayOfWeek {
        <<enumeration>>
        MONDAY
        TUESDAY
        WEDNESDAY
        THURSDAY
        FRIDAY
        SATURDAY
        SUNDAY
    }

    class SessionType {
        <<enumeration>>
        LECTURE
        LAB
        SEMINAR
        EXAM
    }

    class RoomType {
        <<enumeration>>
        CLASSROOM
        LABORATORY
        AUDITORIUM
        CONFERENCE_ROOM
        STUDIO
    }

    class RoomFeature {
        <<enumeration>>
        WHITEBOARD
        PROJECTOR
        LAB_BENCHES
        CHEMICAL_HOODS
        MICROSCOPES
        GIS_STATIONS
        SPECIMEN_DISPLAY
        SAMPLE_PREP_AREA
        WHEELCHAIR_ACCESSIBLE
    }
```
----

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# scheduling_resources
