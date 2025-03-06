import { EventObject, createMachine, assign } from 'xstate';

function assertEvent<TEvent extends EventObject, Type extends TEvent['type']>(
  ev: TEvent,
  type: Type
): asserts ev is Extract<TEvent, { type: Type }> {
  if (ev.type !== type) {
    throw new Error('Unexpected event type.');
  }
}

type Player = 'x' | 'o';

const context = {
  board: Array(9).fill(null) as Array<Player | null>,
  moves: 0,
  player: 'x' as Player,
  winner: undefined as Player | undefined
};

export const ticTacToeMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgAcAbdATwKgGIAFAGQEEBNAbQAYBdRUGQD2sXABdcQ-AJAAPRABYATABoQ1REoUBOEgDYFADm4B2bQGZu3c4fMBGcwF9HatFjyFSlGnXo9+SCDCohJSMvIIWnYkAKyG2oZxeoZ2tty2ahoI9iYkNjE2hgrFCibmCs6uGDgExORUtPgMnHYBgiLiktKBEVGx8YmGyamWGeqI5npKJHYKk-YK3DF62nZLlSBuNZ4kUOioYADyAG5gAE70AEoAogDK1wAq-jLBnWE9iHZ6MSSLStxTVJzEwFQyZRApGYpIog8raBRrCobfBCCBwGRbDzEF4dULdUARAC0enBCGJG0xtS8DToOJCXXCEMMvzKBXSawKMS5pPKzO0plSMTWsysThcm2qWNIewOJ3OdLe+LkiiUzNVem4OjiJmK2hJ4wQX1yxW42gK5nMMTNhiUYqq7ipu32R1OZxIAHcCIQzgq8YyEKU9CR1ZrrTqdPqskoYgp9EpVVZDCZ0tptNGKZLHTKXecSBAzuh3b6GR8AyYgyGtUndZGJlaSCYzJq1kptMnuHZnM4gA */
    initial: 'playing',
    types: {} as {
      context: typeof context;
      events: { type: 'PLAY'; value: number } | { type: 'RESET' };
    },
    context,
    states: {
      playing: {
        always: [
          { target: 'gameOver.winner', guard: 'checkWin' },
          { target: 'gameOver.draw', guard: 'checkDraw' }
        ],
        on: {
          PLAY: [
            {
              target: 'playing',
              guard: 'isValidMove',
              actions: 'updateBoard'
            }
          ]
        }
      },
      gameOver: {
        initial: 'winner',
        states: {
          winner: {
            tags: 'winner',
            entry: 'setWinner'
          },
          draw: {
            tags: 'draw'
          }
        },
        on: {
          RESET: {
            target: 'playing',
            actions: 'resetGame'
          }
        }
      }
    }
  },
  {
    actions: {
      updateBoard: assign({
        board: ({ context, event }) => {
          assertEvent(event, 'PLAY');
          const updatedBoard = [...context.board];
          updatedBoard[event.value] = context.player;
          return updatedBoard;
        },
        moves: ({ context }) => context.moves + 1,
        player: ({ context }) => (context.player === 'x' ? 'o' : 'x')
      }),
      resetGame: assign(context),
      setWinner: assign({
        winner: ({ context }) => (context.player === 'x' ? 'o' : 'x')
      })
    },
    guards: {
      checkWin: ({ context }) => {
        const { board } = context;
        const winningLines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];

        for (const line of winningLines) {
          const xWon = line.every((index) => {
            return board[index] === 'x';
          });

          if (xWon) {
            return true;
          }

          const oWon = line.every((index) => {
            return board[index] === 'o';
          });

          if (oWon) {
            return true;
          }
        }

        return false;
      },
      checkDraw: ({ context }) => {
        return context.moves === 9;
      },
      isValidMove: ({ context, event }) => {
        if (event.type !== 'PLAY') {
          return false;
        }

        return context.board[event.value] === null;
      }
    }
  }
);