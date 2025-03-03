import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from '../../interfaces/Workout';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Exercise } from '../../interfaces/Exercise';
import { RecordAdd } from '../../interfaces/RecordAdd';
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  public constructor(private httpClient : HttpClient) { }

  private workouts: Workout[] = [];

  public getWorkouts() : Observable<Workout[]>{
    return this.httpClient.get<Workout[]>('http://localhost:8080/user/workouts').pipe(
      map((response) => {
        this.workouts = [];
        response.forEach((workout) => {
          const {id, exercises, workoutDuration} = workout;
          let {startTime} = workout;
          startTime = new Date(startTime).toLocaleString();
          this.workouts.push({id, exercises, startTime, workoutDuration});
        });

        return this.workouts;
      }),
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }
  public addWorkout() : Observable<string>{
    return this.httpClient.post<string>('http://localhost:8080/user/add-workout', {}, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as 'json'
    }).pipe(
      map(() => {
        return "Workout added";
      }),
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  public getExercises(workoutId: string) : Observable<Exercise[]>{
    return this.httpClient.get<Workout>(`http://localhost:8080/user/workout?id=${workoutId}`).pipe(
      map((response) => {
        return response.exercises;
      }),
      catchError(() => {
        return throwError(() => new Error('Something went wrong probably wrong workout id'));
      })
    );
  }

  public addExercise(workoutId: string, orderInWorkout: number,exerciseDictionaryId: string, records : RecordAdd[]) : Observable<string>{
    const workoutIdNum = Number(workoutId);
    const exerciseDictionaryIdNum = Number(exerciseDictionaryId);

    return this.httpClient.post<string>(`http://localhost:8080/exercise/create-exercise-with-records`, {workoutId: workoutIdNum, orderInWorkout, exerciseDictionaryId: exerciseDictionaryIdNum, records}, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as 'json'
    }).pipe(
      map(() => {
        return "Exercise added";
      }),
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  public deleteWorkout(workoutId: number) : Observable<string>{
    return this.httpClient.delete(`http://localhost:8080/user/delete-workout?id=${workoutId}`, {
      responseType: 'text' as 'json'
    }).pipe(
      map(() => {
        return "Workout deleted";
      }),
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

}
