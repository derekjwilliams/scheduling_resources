import { createMachine, assign } from 'xstate';
import type { CourseSession, Classroom } from '../types';

const context = {
  selectedSession: undefined as CourseSession | undefined,
  selectedRoom: undefined as Classroom | undefined,
  errors: [] as string[],
};

export const schedulingMachine = createMachine(
  {
    id: 'scheduling',
    initial: 'idle',
    types: {} as {
      context: typeof context;
      events:
        | { type: 'SELECT_SESSION'; session: CourseSession }
        | { type: 'SELECT_ROOM'; room: Classroom }
        | { type: 'VALIDATE' }
        | { type: 'CONFIRM' }
        | { type: 'CANCEL' };
    },
    context,
    states: {
      idle: {
        on: {
          SELECT_SESSION: {
            target: 'selectingRoom',
            actions: assign({
              selectedSession: ({ event }) => event.session,
            }),
          },
        },
      },
      selectingRoom: {
        on: {
          SELECT_ROOM: {
            actions: assign({
              selectedRoom: ({ event }) => event.room,
            }),
          },
          VALIDATE: {
            target: 'validating',
          },
        },
      },
      validating: {
        entry: 'validateSelection',
        always: [
          { target: 'confirmed', guard: 'isValid' },
          { target: 'selectingRoom' },
        ],
      },
      confirmed: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      validateSelection: assign(({ context }) => {
        const errors: string[] = [];
        if (!context.selectedSession) errors.push('No session selected');
        if (!context.selectedRoom) errors.push('No room selected');
        return { errors };
      }),
    },
    guards: {
      isValid: ({ context }) => context.errors.length === 0,
    },
  }
);
