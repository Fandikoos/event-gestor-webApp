import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { authService } from '../../../services/auth.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 

  private userService = inject(UserService);
  private authService = inject(authService);

  public username = signal<string>('');
  public password = signal<string>('');

  public loginError = signal<string>('');

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>, 
  ) {}

  onSubmit(){
    this.loginError.set('');

    this.userService.getClientByUserAndPassword(this.username(), this.password()).subscribe({
      next: (user) => {
        this.authService.login(user);
        this.dialogRef.close();
      },
      error: (err) => {
        this.loginError.set('Invalid user or password',);
      }
    })
  }

  // Recogemos el value de los inputs del form
  onUsernameChange(event: Event) {
    // Casting el evento para asegurarse de que tiene la propiedad 'value'
    const input = event.target as HTMLInputElement;
    this.username.set(input.value);
  }

  onPasswordChange(event: Event) {
    // Casting el evento para asegurarse de que tiene la propiedad 'value'
    const input = event.target as HTMLInputElement;
    this.password.set(input.value);
  }


}
