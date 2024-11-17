import { User } from './../../../model/interfaces';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterUserComponent{

  user: User = {
    id: 0,
    name: '',
    password: '',
    email: '',
    phone: '',
  }

  private userService = inject(UserService);
  
  constructor(public dialogRef: MatDialogRef<RegisterUserComponent>){}

  onSubmit() {
    this.userService.addUser(this.user).subscribe(
      (response) => {
        console.log('Usuario registrado con exito', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error(error);
      }
    )
  }


}
