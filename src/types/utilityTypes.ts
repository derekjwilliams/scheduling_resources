// types/utilityTypes.ts

import { ValidationError } from "../utils/validators";

export interface Coordinate {
  building: string;
  floor: number;
  x: number; // X position on floor map
  y: number; // Y position on floor map
}

export type TravelTimeMatrix = Record<string, Record<string, number>>;

export interface ValidationResult {
  isValid: boolean;
  errors?: ValidationError[];
  warnings?: string[];
  message: string;
}

// Helper functions
export const isTimeString = (value: string): boolean =>
  /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);

export const isIsoDateString = (value: string): boolean =>
  !isNaN(Date.parse(value));

