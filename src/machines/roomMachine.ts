import { 
  createMachine, 
  assign,
  type AnyActorRef
} from 'xstate';
import { sendTo } from 'xstate/actions';
import { sessionMachine } from './sessionMachine';

export const roomMachine = createMachine({
  id: 'room',
  types: {} as {
    context: {
      currentSession: AnyActorRef | null;
      currentStudents: number;
      maxCapacity: number;
      minPreferred: number;
    };
    events:
      | { type: 'SESSION.START'; initialStudents: number }
      | { 
          type: 'SESSION.UPDATE_STUDENTS'; 
          count: number;
          from: AnyActorRef;
        }
      | { type: 'SESSION.END' };
  },
  context: {
    currentSession: null,
    currentStudents: 0,
    maxCapacity: 30,
    minPreferred: 10
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        'SESSION.START': {
          guard: ({ context, event }) => event.initialStudents <= context.maxCapacity,
          actions: [
            assign({
              currentSession: ({ spawn, self, event }) => 
                spawn(sessionMachine, {
                  input: {
                    roomActor: self,
                    initialStudents: event.initialStudents
                  }
                }),
              currentStudents: ({ event }) => event.initialStudents
            }),
            ({ context, event }) => {
              if (event.initialStudents < context.minPreferred) {
                console.warn('Warning: Initial students below preferred minimum');
              }
            }
          ],
          target: 'occupied'
        }
      }
    },
    occupied: {
      on: {
        'SESSION.UPDATE_STUDENTS': {
          actions: [
            ({ context, event }) => {
              if (event.count > context.maxCapacity) {
                sendTo(
                  event.from, 
                  () => ({
                    type: 'UPDATE_DENIED',
                    message: 'Exceeds max capacity'
                  })
                );
              } else if (event.count < context.minPreferred) {
                sendTo(
                  event.from,
                  () => ({
                    type: 'UPDATE_WARNING',
                    message: 'Below preferred minimum',
                    count: event.count
                  })
                );
              } else {
                sendTo(
                  event.from,
                  () => ({
                    type: 'UPDATE_APPROVED',
                    count: event.count
                  })
                );
              }
            },
            assign({
              currentStudents: ({ context, event }) => 
                event.count <= context.maxCapacity ? event.count : context.currentStudents
            })
          ]
        },
        'SESSION.END': {
          actions: assign({
            currentSession: null,
            currentStudents: 0
          }),
          target: 'idle'
        }
      }
    }
  }
});