// src/machines/sessionMachine.ts
import { 
  createMachine, 
  assign,
  type AnyActorRef
} from 'xstate';
import { sendTo } from 'xstate/actions';

export const sessionMachine = createMachine({
  id: 'session',
  types: {} as {
    context: {
      roomActor: AnyActorRef;
      requestedStudents: number;
    };
    events:
      | { type: 'SET_STUDENTS'; count: number }
      | { type: 'UPDATE_APPROVED'; count: number }
      | { type: 'UPDATE_WARNING'; count: number; message: string }
      | { type: 'UPDATE_DENIED'; message: string }
      | { type: 'END' };
    input: {
      roomActor: AnyActorRef;
      initialStudents: number;
    };
  },
  context: ({ input }) => ({
    roomActor: input.roomActor,
    requestedStudents: input.initialStudents
  }),
  initial: 'active',
  states: {
    active: {
      on: {
        SET_STUDENTS: {
          actions: sendTo(
            ({ context }) => context.roomActor,
            ({ event, self }) => ({
              type: 'SESSION.UPDATE_STUDENTS',
              count: event.count,
              from: self
            })
          )
        },
        UPDATE_APPROVED: {
          actions: assign({
            requestedStudents: ({ event }) => event.count
          })
        },
        UPDATE_WARNING: {
          actions: [
            assign({
              requestedStudents: ({ event }) => event.count
            }),
            ({ event }) => console.warn(event.message)
          ]
        },
        UPDATE_DENIED: {
          actions: ({ event }) => console.error(event.message)
        },
        END: {
          actions: [
            sendTo(
              ({ context }) => context.roomActor, 
              () => ({ type: 'SESSION.END' })
            ),
            () => console.log('Session ended')
          ],
          target: 'ended'
        }
      }
    },
    ended: { type: 'final' }
  }
});