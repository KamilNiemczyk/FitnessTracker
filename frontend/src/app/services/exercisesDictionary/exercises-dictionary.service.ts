import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseDictionary } from '../../interfaces/ExerciseDictionary';
import { catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ExercisesDictionaryService {

  public constructor(private httpClient: HttpClient) { }

  public getExercisesDictionary() : Observable<ExerciseDictionary[]>{
    return this.httpClient.get<ExerciseDictionary[]>('http://localhost:8080/exercise-dictionary/all').pipe(
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  public addExerciseDictionary(bodyPartName: string, exerciseName: string, difficulty: number) : Observable<string>{
    const json = {bodyPartName, exerciseName, difficulty : Number(difficulty)};

    return this.httpClient.post<string>('http://localhost:8080/exercise-dictionary/add', json, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as 'json'
    }).pipe(
      map(() => "Success"),
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  public getExerciseById(id: string) : Observable<ExerciseDictionary>{
    const idNumber = Number(id);
    if(isNaN(idNumber) || idNumber < 0){
      return throwError(() => new Error('Invalid id'));
    }

    return this.httpClient.get<ExerciseDictionary>(`http://localhost:8080/exercise-dictionary/get-by-id?id=${idNumber}`).pipe(
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  public editExerciseDictionary(id: string, bodyPartName: string, exerciseName: string, difficulty: number) : Observable<string>{
    const json = {bodyPartName, exerciseName, difficulty : Number(difficulty)};

    return this.httpClient.put<string>(`http://localhost:8080/exercise-dictionary/update?id=${id}`, json, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as 'json'
    }).pipe(
      map(() => "Success"),
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  public deleteExerciseDictionary(id: string) : Observable<string>{
    const idNumber = Number(id);
    if(isNaN(idNumber) || idNumber < 0){
      return throwError(() => new Error('Invalid id'));
    }

    return this.httpClient.delete(`http://localhost:8080/exercise-dictionary/delete?id=${idNumber}`, {
      responseType: 'text' as 'json'
    }).pipe(
      map(() => "Success"),
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }
}
