import { createMachine, assign } from 'xstate';
import { initialFeedbackContext, FeedbackContext } from '../contexts/feedbackContext';
import { toDirectedGraph } from '@xstate/graph';

import { FeedbackEvent, FeedbackUpdateEvent } from '../types/feedbackMachineTypes';

// type FeedbackEvent =
//   | { type: 'feedback.good' }
//   | { type: 'feedback.bad' }
//   | { type: 'submit' }
//   | { type: 'back' }
//   | { type: 'restart' }
//   | { type: 'close' }
//   | { type: 'feedback.update'; value: string };

function isFeedbackUpdateEvent(event: FeedbackEvent): event is { type: 'feedback.update'; value: string } {
  return event.type === 'feedback.update';
}

export const feedbackMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAdAA4BOA9gLaEAuAxKhjgVKaRANoAMAuoqIabACWVQaQB2vEAA9EAZgDsANnzzZHABwBOAKzbNARgBM+jrIA0IAJ6IALIY751HTesWKb62U+02Avr4t6CCw8IjJKWiCQgix2bkl+IRFxSRkEBWVVDR09IxNzK0RDF3x9dRtFbWdPDn0vbX9AtGDGfGRSYnI6Zuj8AFdCCEwqME4eJBBE4VEJCbSfQxV5U0UXCtkDdQtrBHt9fDVl2UU6zSV1bXlGkCjW9s6aWD70cmExhIFplLnEeUNFpx-WQeQyKDbaAo7NQORTlSrVNR1C7XW6he5daLvCZTZKzUBpGxVFQ+WQmDQQ1bybTbIoefCaYHGTQufQ2Q5+AI3HqtKgAC0wYlwsBoxDgVEwxCoWL4n1xqV+hlk+B8VXU+n0zNUdhpCDVpTV6nsYK08iunNRBGwABsBJARWKJVL4tjZTN5QhWTZ8Ir5DZ1cdPCY-jrig5ZLI9AjNP8tP5OWJWHBJBaPkk3T8EABaRQ6zPaenMwtFwuuFHc0IkCjUVNfPHSIq6UqkqpKDiKYpKEOaBzGX0a9smHRmpoMNEdcg1uUZ7TqdSOdwmTyh476HXQ5VufSKDhKDyAsujgh8gVCyfp-GIcpetkGU1s03GVeFBB+-ZtnSKmxt+xrA8tULWraEBnt8F4voYXY9vofaaAOziXIoca+EAA */
  /** Define machine types explicitly */
  types: {
    context: {} as FeedbackContext,
    events: {} as FeedbackEvent
  },

  id: 'feedback',
  initial: 'prompt',
  context: initialFeedbackContext,
  states: {
    prompt: {
      on: {
        'feedback.good': { target: 'thanks' },
        'feedback.bad': { target: 'form' }
      }
    },
    form: {
      on: {
        'feedback.update': {
          actions: assign({
            feedback: ({ context, event }) => {
              if (event.type === 'feedback.update') {
                return event.value;
              }
              return context.feedback;
            },
          }),
        },
        submit: { target: 'thanks' },
        back: { target: 'prompt' }
      }
    },
    thanks: {
      on: {
        restart: { target: 'prompt' }
      }
    },
    closed: {
      on: {
        restart: { target: 'prompt' }
      }
    }
  }
});

const graph = toDirectedGraph(feedbackMachine)
console.log(JSON.stringify(graph, null, 2))
console.log(JSON.stringify(feedbackMachine, null, 2))