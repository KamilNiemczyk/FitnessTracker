import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ExercisesDictionaryService } from '../../../services/exercisesDictionary/exercises-dictionary.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { EventEmitter } from '@angular/core';
interface AddOrEditExerciseForm {
  readonly exerciseName: FormControl<string | null>;
  readonly bodyPartName: FormControl<string | null>;
  readonly difficulty: FormControl<number | null>;
}

@Component({
  selector: 'app-admin-exercise',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, ModalComponent],
  templateUrl: './admin-exercise.component.html',
  styleUrl: './admin-exercise.component.scss'
})
export class AdminExerciseComponent implements OnInit {

  public constructor(private exercisesDictionaryService: ExercisesDictionaryService, private router : Router) {}

  public isEdit: boolean = false;
  private exerciseId: string = '';
  public modalOpen: boolean = false;
  public error : string = '';
  private onConfirmEmitter = new EventEmitter<void>();
  private onCloseEmitter = new EventEmitter<void>();
  public ngOnInit(): void {
    this.isEdit = this.router.url.includes('admin-edit');
    if(this.isEdit){
      this.exerciseId = this.router.url.split('/').pop() || '';
      this.getExerciseById(this.exerciseId);
    }
  }

  public async openModal() : Promise<boolean> {
    this.modalOpen = true;

    return new Promise<boolean>((resolve) => {
      this.onConfirmEmitter.subscribe(() => {
        resolve(true);
      });
      this.onCloseEmitter.subscribe(() => {
        resolve(false);
      });
    });
  }

  public onConfirm() : void{
    this.modalOpen = false;
    this.onConfirmEmitter.emit();
  }

  public onClose() : void{
    this.modalOpen = false;
    this.onCloseEmitter.emit();
  }

  public addOrEditExerciseForm: FormGroup<AddOrEditExerciseForm> = new FormGroup<AddOrEditExerciseForm>({
    exerciseName: new FormControl('', [Validators.required]),
    bodyPartName: new FormControl('', [Validators.required]),
    difficulty: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)])
  });

  public async addExercise(): Promise<void> {
    if(this.addOrEditExerciseForm.valid) {
      const confirm = await this.openModal();
      if(!confirm) {
        return;
      }
      const { exerciseName, bodyPartName, difficulty } = this.addOrEditExerciseForm.value;
      if(exerciseName && bodyPartName && difficulty) {
        this.exercisesDictionaryService.addExerciseDictionary(bodyPartName, exerciseName, difficulty).subscribe({
          next: () => {
            this.router.navigate(['/exercises']);
          },
          error: (error) => {
            console.log("Error adding exercise: ", error.message);
            this.error = 'Error occured while adding exercise';
          }
        });
      }
    }else{
      this.error = 'Please fill in all the fields';
    }
  }

  private getExerciseById(id: string): void {
    this.exercisesDictionaryService.getExerciseById(id).subscribe({
      next: (exercise) => {
        this.addOrEditExerciseForm.controls.exerciseName.setValue(exercise.exerciseName);
        this.addOrEditExerciseForm.controls.bodyPartName.setValue(exercise.bodyPartName);
        this.addOrEditExerciseForm.controls.difficulty.setValue(exercise.difficulty);
        // console.log("Exercise: ", JSON.stringify(exercise));
      },
      error: (error) => {
        console.log("Error getting exercise: ", error.message);
      }
    });
  }

  public async editExercise(): Promise<void> {
    if(this.addOrEditExerciseForm.valid){
      const confirm = await this.openModal();
      if(!confirm) {
        return;
      }
      const { exerciseName, bodyPartName, difficulty } = this.addOrEditExerciseForm.value;
      if(exerciseName && bodyPartName && difficulty && this.exerciseId){ 
        this.exercisesDictionaryService.editExerciseDictionary(this.exerciseId, bodyPartName, exerciseName, difficulty).subscribe({
          next: () => {
            this.router.navigate(['/exercises']);
          },
          error: (error) => {
            console.log("Error editing exercise: ", error.message);
            this.error = 'Error occured while adding exercise';
          }
        });
      }
    }else{
      this.error = 'Please fill in all the fields';
    }
  }

  public async deleteExercise(): Promise<void> {
    const confirm = await this.openModal();
    if(!confirm) {
      return;
    }
    if(this.exerciseId){
      this.exercisesDictionaryService.deleteExerciseDictionary(this.exerciseId).subscribe({
        next: () => {
          this.router.navigate(['/exercises']);
        },
        error: (error) => {
          console.log("Error deleting exercise: ", error.message);
        }
      });
    }
  }

}
