import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
interface SignInForm{
  readonly email: FormControl<string | null>;
  readonly password: FormControl<string | null>;
}
interface SignUpForm{
  readonly name: FormControl<string | null>;
  readonly email: FormControl<string | null>;
  readonly password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  public constructor(private authService : AuthService, private router: Router) { }
  public isLoginView = true;
  public error: string = '';
  public signInForm = new FormGroup<SignInForm>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  public signUpForm = new FormGroup<SignUpForm>({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public signIn(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      if (email && password) {
        this.authService.login({ email, password }).subscribe({
          next: (info) => {
            console.log("Success: ", info);
            this.router.navigate(['/']);
            window.location.reload();
          },
          error: (error) => {
            console.log('Error login: ', error.message);
            this.error = 'Invalid email or password';
          }
        });
      }
    }else{
      this.error = 'Invalid email or password';
    }
  }
  
  public signUp(): void {
    if (this.signUpForm.valid) {
      const { name, email, password } = this.signUpForm.value;
      if (name && email && password) {
        this.authService.register({ name, email, password }).subscribe({
          next: (info) => {
            console.log("Success: ", info);
            this.isLoginView = true;
          },
          error: (error) => {
            console.log('Error register: ', error.message);
            this.error = 'Invalid email or password - probably already exists';
          }
        });
      }}else{
      this.error = 'Invalid email or password';
    }
  }
  public changeView(): void {
    this.isLoginView = !this.isLoginView;
    this.error = '';
  }
}
