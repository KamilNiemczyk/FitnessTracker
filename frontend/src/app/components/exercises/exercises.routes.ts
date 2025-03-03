import {Routes} from '@angular/router';
import {ExercisesComponent} from './exercises.component';
import { AdminExerciseComponent } from './admin-exercise/admin-exercise.component';
import { adminGuard } from '../../guards/admin-guard/admin.guard';
export const EXERCISES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExercisesComponent
  },
  {
    path: 'admin-add',
    component: AdminExerciseComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin-edit/:id',
    component: AdminExerciseComponent,
    canActivate: [adminGuard]
  }
];