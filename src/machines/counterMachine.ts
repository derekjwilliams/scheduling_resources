// machines/counterMachine.ts
import { setup, assign } from 'xstate';

export const counterMachine = setup({
  types: {
    context: {} as { count: number },
    events: {} as { type: 'increment' } | { type: 'decrement' }
  }
}).createMachine({
  id: 'counter',
  context: {
    count: 0
  },
  on: {
    increment: {
      actions: assign({
        count: ({ context }) => context.count + 1
      })
    },
    decrement: {
      actions: assign({
        count: ({ context }) => context.count - 1
      })
    }
  }
});