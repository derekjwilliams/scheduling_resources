// src/components/Counter.tsx
import { useMachine } from '@xstate/react';
import { createBrowserInspector } from '@statelyai/inspect';
import { counterMachine } from '../machines/counterMachine';

const { inspect } = createBrowserInspector({
  // Comment out the line below to start the inspector
  // autoStart: false
})

export default function Counter() {
  const [state, send] = useMachine(counterMachine, {
    inspect,
    input: { count: 0 }
  });

  return (
    <div className="counter">
      <h2>Count: {state.context.count}</h2>
      <div className="controls">
        <button
          className="button"
          onClick={() => send({ type: 'decrement' })}
        >
          -
        </button>
        <button
          className="button"
          onClick={() => send({ type: 'increment' })}
        >
          +
        </button>
      </div>
    </div>
  );
}