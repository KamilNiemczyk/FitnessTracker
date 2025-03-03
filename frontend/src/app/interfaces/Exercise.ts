import { ExerciseDictionary } from './ExerciseDictionary';
import { ExerciseRecord } from './ExerciseRecord';
export interface Exercise{
    readonly id: number;
    readonly orderInWorkout: number;
    readonly exerciseDictionary: ExerciseDictionary;
    readonly exerciseRecords : ExerciseRecord[];
}