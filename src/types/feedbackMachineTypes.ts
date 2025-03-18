export interface FeedbackContext {
  feedback: string;
}

export type FeedbackGoodEvent = { type: 'feedback.good' };
export type FeedbackBadEvent = { type: 'feedback.bad' };
export type SubmitEvent = { type: 'submit' };
export type BackEvent = { type: 'back' };
export type RestartEvent = { type: 'restart' };
export type CloseEvent = { type: 'close' };
export type FeedbackUpdateEvent = { type: 'feedback.update'; value: string };

export type FeedbackEvent =
  | FeedbackGoodEvent
  | FeedbackBadEvent
  | SubmitEvent
  | BackEvent
  | RestartEvent
  | CloseEvent
  | FeedbackUpdateEvent;