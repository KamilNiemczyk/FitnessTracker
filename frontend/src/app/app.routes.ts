import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { MyWorkoutsComponent } from './components/my-workouts/my-workouts.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { profileGuard } from './guards/profile-guard/profile.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [profileGuard]
  },
  {
    path: "exercises",
    component: ExercisesComponent
  },
  {
    path: "myworkouts",
    component: MyWorkoutsComponent,
    canActivate: [profileGuard]
  },
  {
    path: "signin",
    component: SignInComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];