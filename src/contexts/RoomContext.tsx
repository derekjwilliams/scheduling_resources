import React, { createContext, useContext } from 'react';
// import { createActor, type AnyActorRef } from 'xstate';
import { useMachine } from '@xstate/react'; // Import useMachine instead
import { roomMachine } from '../machines/roomMachine';
// import type { BrowserInspector } from '@xstate/inspect';
// Create the context
type RoomContextType = {
  roomService: ReturnType<typeof useMachine<typeof roomMachine>>[0];
  roomSend: ReturnType<typeof useMachine<typeof roomMachine>>[1];
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

// Create the provider
export const RoomProvider: React.FC<{ 
  children: React.ReactNode;
 }> = ({ children }) => {
  // Use useMachine hook instead of manually creating an actor
  const [state, send] = useMachine(roomMachine, {
  });

  return (
    <RoomContext.Provider value={{ roomService: state, roomSend: send }}>
      {children}
    </RoomContext.Provider>
  );
};

// Hook for accessing the room state and send function
export const useRoom = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};

// Selector hook for pulling specific data from state
export function useRoomSelector<T>(selector: (state: ReturnType<typeof useMachine<typeof roomMachine>>[0]) => T): T {
  const { roomService } = useRoom();
  return selector(roomService);
}