import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout/workout.service';
import { Workout } from '../../interfaces/Workout';
import { OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-my-workouts',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './my-workouts.component.html',
  styleUrl: './my-workouts.component.scss'
})
export class MyWorkoutsComponent implements OnInit {
  public constructor (private workoutService: WorkoutService, private router : Router) { }
  public myWorkouts: Workout[] = [];
  public sortDate: string = "asc";
  public ngOnInit(): void {
    this.getWorkouts();
  }

  private getWorkouts(): void {
    this.workoutService.getWorkouts().subscribe((response) => {
      this.myWorkouts = response;
      this.sortByDate();
    });
  }

  public addWorkout(): void {
    this.workoutService.addWorkout().subscribe(() => {
      this.getWorkouts();
      this.sortByDate();
    });
  }
  public goToExercises(id: number): void {
    this.router.navigate(['/myworkouts/exercises', id]);
  }

  public sortByDate(): void {
    this.sortDate = this.sortDate === "asc" ? "desc" : "asc";
    this.myWorkouts = this.myWorkouts.sort((a, b) => {
      const first = new Date(a.startTime);
      const second = new Date(b.startTime);
      if (this.sortDate === "asc") {
        return first.getTime() - second.getTime();
      } 

      return second.getTime() - first.getTime();
    });
  }

  public deleteWorkout(id: number): void {
    this.workoutService.deleteWorkout(id).subscribe(() => {
      this.getWorkouts();
      this.sortByDate();
    });
  }
}
