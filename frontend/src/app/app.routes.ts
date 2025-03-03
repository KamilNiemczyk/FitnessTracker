import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { profileGuard } from './guards/profile-guard/profile.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { signGuard } from './guards/signin-guard/sign.guard';

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
    loadChildren: () => 
      import('./components/exercises/exercises.routes').then((r) => r.EXERCISES_ROUTES)
  },
  {
    path: "myworkouts",
    loadChildren: () =>
      import('./components/my-workouts/my-workouts.routes').then((r) => r.MYWORKOUTS_ROUTES),
    canActivate: [profileGuard]
  },
  {
    path: "signin",
    component: SignInComponent,
    canActivate: [signGuard]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];