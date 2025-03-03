import { Component } from '@angular/core';
import { WorkoutService } from '../../../services/workout/workout.service';
import { Exercise } from '../../../interfaces/Exercise';
import { OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ExerciseDictionary } from '../../../interfaces/ExerciseDictionary';
import { ExercisesDictionaryService } from '../../../services/exercisesDictionary/exercises-dictionary.service';
import {FormGroup, FormControl, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecordAdd } from '../../../interfaces/RecordAdd';

interface ExerciseForm{
  readonly exerciseDictionaryId : FormControl<string | null>;
  readonly records: FormArray<FormGroup<RecordForm>>;
}

interface RecordForm{
  readonly weight: FormControl<number | null>;
  readonly reps: FormControl<number | null>;
}



@Component({
  selector: 'app-workouts-exercises',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './workouts-exercises.component.html',
  styleUrl: './workouts-exercises.component.scss'
})
export class WorkoutsExercisesComponent implements OnInit {
  public constructor(private workoutService: WorkoutService, private router : Router, private exercisesDictionaryService : ExercisesDictionaryService) { }
  public exercises: Exercise[] = [];
  private workoutId: string = '';
  public exerciseDictionary: ExerciseDictionary[] = [];
  public error: string = '';

  public ngOnInit(): void {
    this.workoutId = this.router.url.split('/').pop() || '';
    this.getExercises();
    this.getExercisesDictionary();
  }

  public ExerciseForm: FormGroup<ExerciseForm> = new FormGroup<ExerciseForm>({
    exerciseDictionaryId: new FormControl('', Validators.required),
    records: new FormArray<FormGroup<RecordForm>>([], Validators.required)
  });

  public addRecord(): void {
    this.ExerciseForm.controls.records.push(
      new FormGroup<RecordForm>({
        weight: new FormControl(0, [Validators.required, Validators.min(1)]),
        reps: new FormControl(0, [Validators.required, Validators.min(1)])
      })
    );
  }
  public deleteRecord(index: number): void {
    this.ExerciseForm.controls.records.removeAt(index);
  }

  private deleteAllRecords(): void {
    while(this.records.length){
      this.records.removeAt(0);
    }
  }

  public saveExercise(): void {
    if(this.ExerciseForm.valid){
      const {exerciseDictionaryId, records} = this.ExerciseForm.value;
      if(exerciseDictionaryId && records){
        const transofrmedRecords : RecordAdd[] = records.map((record) => ({
          weight: record.weight || 0,
          reps: record.reps || 0
        }));
        const orderInWorkout = this.exercises.length + 1;
        this.workoutService.addExercise(this.workoutId, orderInWorkout,exerciseDictionaryId, transofrmedRecords).subscribe(() => {
          this.getExercises();
        });
        this.ExerciseForm.reset();
        this.deleteAllRecords();
        this.error = '';
      }
    }
    else{
      this.error = 'Please fill in all the fields and add at least one record';
    }
  }

  public get records(): FormArray<FormGroup<RecordForm>> {
    return this.ExerciseForm.controls.records as FormArray<FormGroup<RecordForm>>;
  }

  public getExercises(): void {
    this.workoutService.getExercises(this.workoutId).subscribe({
      next: (response) => {
        this.exercises = response;
      },
      error: () => {
        // alert('Error getting exercises');
        this.router.navigate(['/myworkouts']);
      }
    });
  }
  private getExercisesDictionary(): void {
    this.exercisesDictionaryService.getExercisesDictionary().subscribe((response) => {
      this.exerciseDictionary = response;
      // console.log(JSON.stringify(this.exerciseDictionary));
    });
  }

}
