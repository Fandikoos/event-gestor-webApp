import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { authService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modify-user.component.html',
  styleUrl: './modify-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModifyUserComponent implements OnInit{

  modifyUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModifyUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibimos el usuario aqui
    private userService: UserService,
    private authService: authService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.modifyUserForm = this.fb.group({
      name: [this.data.user.name, Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      phone: [this.data.user.phone, Validators.required],
      password: ['', Validators.required]  
    });
  }

  onSubmit(): void {
    if (this.modifyUserForm.valid) {
      this.userService.modifyUser(this.modifyUserForm.value, this.data.user.id).subscribe({
        next: (value) => {
          this.dialogRef.close();
          console.log('Modify User succesfully');
          this.authService.logout();
          this.router.navigate(['']);
        }, error: (error) => {
          console.error('Error updating user', error);
        }
      })
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
 }
