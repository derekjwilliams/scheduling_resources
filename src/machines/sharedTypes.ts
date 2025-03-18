// src/machines/sharedTypes.ts
import { AnyActorRef, type ActorRefFrom } from 'xstate';

// Forward declarations for the machines
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SessionMachineRef = ActorRefFrom<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RoomMachineRef = ActorRefFrom<any>;

// Event types for roomMachine
export type RoomEvents = 
  | { type: 'SESSION.START'; initialStudents: number }
  | { 
      type: 'SESSION.UPDATE_STUDENTS'; 
      count: number;
      from: SessionMachineRef;
    }
  | { type: 'SESSION.END' };

// Event types for sessionMachine
export type SessionEvents = 
  | { type: 'SET_STUDENTS'; count: number }
  | { type: 'UPDATE_APPROVED'; count: number }
  | { type: 'UPDATE_WARNING'; count: number; message: string }
  | { type: 'UPDATE_DENIED'; message: string }
  | { type: 'END' };

  export interface SessionToRoomEvents {
  'SESSION.UPDATE_STUDENTS': { type: 'SESSION.UPDATE_STUDENTS'; count: number; from: AnyActorRef };
  'SESSION.END': { type: 'SESSION.END' };
}

// Define the interface for room events that session machine will handle
export interface RoomToSessionEvents {
  'UPDATE_APPROVED': { type: 'UPDATE_APPROVED'; count: number };
  'UPDATE_WARNING': { type: 'UPDATE_WARNING'; count: number; message: string };
  'UPDATE_DENIED': { type: 'UPDATE_DENIED'; message: string };
}