import {Routes} from '@angular/router';
import { MyWorkoutsComponent } from './my-workouts.component';
import { WorkoutsExercisesComponent } from './workouts-exercises/workouts-exercises.component';
export const MYWORKOUTS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyWorkoutsComponent
  },
  {
    path: 'exercises/:id',
    component: WorkoutsExercisesComponent,
  }
];