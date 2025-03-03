import { Exercise } from './Exercise';
export interface Workout {
    readonly id: number;
    readonly startTime: string;
    readonly workoutDuration: number;
    readonly exercises: Exercise[];
}