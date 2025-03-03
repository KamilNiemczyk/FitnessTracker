import { Component } from '@angular/core';
import { ExercisesDictionaryService } from '../../services/exercisesDictionary/exercises-dictionary.service';
import { ExerciseDictionary } from '../../interfaces/ExerciseDictionary';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
interface FilterForm {
  readonly bodyPartName: FormControl<string | null>;
  readonly difficulty1: FormControl<boolean | null>;
  readonly difficulty2: FormControl<boolean | null>;
  readonly difficulty3: FormControl<boolean | null>;
  readonly difficulty4: FormControl<boolean | null>;
  readonly difficulty5: FormControl<boolean | null>;
  readonly alphabetical: FormControl<string | null>;
  readonly difficultyDirection: FormControl<string | null>;
  readonly text: FormControl<string | null>;
  readonly pagination: FormControl<number | null>;
}

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent implements OnInit {
  public constructor(private exercisesDictionaryService: ExercisesDictionaryService, private authService : AuthService, private router: Router) { }
  public exercisesDictionary: ExerciseDictionary[] = [];
  public allExercisesDictionary: ExerciseDictionary[] = [];
  public filteredExercisesDictionary: ExerciseDictionary[] = [];
  public bodyPartNames: string[] = [];
  public isAdmin: boolean = false;

  public currPage: number = 1;
  public itemsPerPage: number =15;
  public maxPages: number = 1;

  public filterForm: FormGroup<FilterForm> = new FormGroup<FilterForm>({
    bodyPartName: new FormControl<string | null>(null),
    difficulty1: new FormControl<boolean | null>(null),
    difficulty2: new FormControl<boolean | null>(null),
    difficulty3: new FormControl<boolean | null>(null),
    difficulty4: new FormControl<boolean | null>(null),
    difficulty5: new FormControl<boolean | null>(null),
    alphabetical: new FormControl<string | null>(null),
    difficultyDirection: new FormControl<string | null>(null),
    text: new FormControl<string | null>(null),
    pagination: new FormControl<number | null>(null)
  });

  public ngOnInit(): void {
    this.getExercisesDictionary();
    this.displayAdminButtons();
  }
  public getExercisesDictionary(): void {
    this.exercisesDictionaryService.getExercisesDictionary().subscribe((response) => {
      this.allExercisesDictionary = response;
      this.exercisesDictionary = response;
      this.filteredExercisesDictionary = response;
      this.bodyPartNames = this.allExercisesDictionary.reduce((acc: string[], exercise: ExerciseDictionary) => {
        if (!acc.includes(exercise.bodyPartName)) {
          acc.push(exercise.bodyPartName);
        }

        return acc;
      }
      , []);
      this.calculateMaxPages();
      this.paginatedExercises();
    });
  }

  private isToken() : boolean {
    return localStorage.getItem('token') !== null;
  }

  private displayAdminButtons() : void {
    if(this.isToken()){
      this.authService.isAdmin().subscribe((response) => {
        // console.log("Response: " + response);
        this.isAdmin = response;
      });
    }
  }

  private filterByBodyPart(exercises: ExerciseDictionary[]): ExerciseDictionary[] {
    const bodyPartName = this.filterForm.value.bodyPartName;
    if (bodyPartName !== null) {
      return exercises.filter((exercise) => exercise.bodyPartName === bodyPartName);
    }

    return exercises;
  }

  private filterByText(exercises: ExerciseDictionary[]): ExerciseDictionary[] {
    const text = this.filterForm.value.text;
    if (text !== null) {
      return exercises.filter((exercise) => exercise.exerciseName.toLowerCase().includes(text?.toLowerCase() ?? ''));
    }

    return exercises;
  }

  private filterByDifficulty(exercises: ExerciseDictionary[]): ExerciseDictionary[] {
    const difficulties = [
      this.filterForm.value.difficulty1,
      this.filterForm.value.difficulty2,
      this.filterForm.value.difficulty3,
      this.filterForm.value.difficulty4,
      this.filterForm.value.difficulty5
    ];

    if (difficulties.some((difficulty) => difficulty === true)) {
      return exercises.filter((exercise) => {
        return difficulties[exercise.difficulty - 1] === true;
      });
    }

    return exercises;
  }

  private sortExercises(exercises: ExerciseDictionary[]): ExerciseDictionary[] {
    const { alphabetical, difficultyDirection } = this.filterForm.value;
    if (alphabetical !== null && difficultyDirection !== null) {
      alert('Cannot sort by alphabetical order and difficulty at the same time');
      this.filterForm.reset();

      return exercises;
    }
    if (alphabetical !== null) {

      return exercises.sort((a, b) => alphabetical === 'asc' ? a.exerciseName.localeCompare(b.exerciseName) : b.exerciseName.localeCompare(a.exerciseName));
    }
    if (difficultyDirection !== null) {

      return exercises.sort((a, b) => difficultyDirection === 'asc' ? a.difficulty - b.difficulty : b.difficulty - a.difficulty);
    }

    return exercises;
  }

  public filterByParams(): void {          
    let temp = this.allExercisesDictionary;
    temp = this.filterByBodyPart(temp);
    temp = this.filterByText(temp);
    temp = this.sortExercises(temp);
    temp = this.filterByDifficulty(temp);
    this.filteredExercisesDictionary = temp;
    this.currPage = 1;
    this.calculateMaxPages();
    this.paginatedExercises();
    const paginationValue = this.filterForm.value.pagination;
    if (paginationValue !== null && paginationValue !== undefined) {
      this.changeItemsPerPage(paginationValue);
    }
  }

  public resetFilter(): void {
    this.currPage = 1;
    this.filteredExercisesDictionary = this.allExercisesDictionary;
    this.calculateMaxPages();
    this.paginatedExercises();
    this.filterForm.reset();
  }

  public calculateMaxPages(): void {
    this.maxPages = Math.ceil(this.filteredExercisesDictionary.length / this.itemsPerPage);
  }

  public paginate(direction: string): void {
    if (direction === 'next' && this.currPage < this.maxPages) {
      this.currPage++;
    } else if (direction === 'prev' && this.currPage > 1) {
      this.currPage--;
    }
    console.log("Cutt page: " + this.currPage);
    console.log("Items per page: " + this.itemsPerPage);
    
    this.paginatedExercises();
  }
  public changeItemsPerPage(howManyItems : number): void {
    const numberOfItems = Number(howManyItems);
    // console.log("Typ liczby: " + typeof numberOfItems);
    this.itemsPerPage = numberOfItems;
    this.currPage = 1;
    this.calculateMaxPages();
    this.paginatedExercises();
  }

  public paginatedExercises(): void {
    const start = (this.currPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.exercisesDictionary = this.filteredExercisesDictionary.slice(start, end);
  }

  public goToAdminAdd(): void {
    this.router.navigate(['/exercises/admin-add']);
  }

  public goToAdminEdit(id: number): void {
    this.router.navigate(['/exercises/admin-edit', id]);
  }
}
