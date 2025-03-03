import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule } from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
interface PasswordForm {
  newPassword: FormControl<string | null>;
}
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent{
  public constructor(private authService: AuthService) { }
  public profileImageUrl: string = 'https://media.istockphoto.com/id/610003972/vector/vector-businessman-black-silhouette-isolated.jpg?s=612x612&w=0&k=20&c=Iu6j0zFZBkswfq8VLVW8XmTLLxTLM63bfvI6uXdkacM=';
  public error : string = '';
  public success : string = '';
  public passwordForm: FormGroup<PasswordForm> = new FormGroup<PasswordForm>({
    newPassword: new FormControl('', [Validators.required])
  });

  public changePassword(): void {
    if (this.passwordForm.valid) {
      const { newPassword } = this.passwordForm.value;
      if (newPassword) {
        this.authService.changePassword(newPassword).subscribe({
          next: () => {
            this.success = 'Password changed';
            this.error = '';
          },
          error: () => {
            this.error = "Error changing password";
            this.success = '';
          }
        });
      }
    }else{
      this.error = 'Invalid password';
      this.success = '';
    }
  }
}
