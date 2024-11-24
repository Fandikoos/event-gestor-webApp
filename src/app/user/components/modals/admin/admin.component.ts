import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {

  private adminService = inject(AdminService);
  private authAdminService = inject(AdminAuthService);
  private router = inject(Router);

  public username = signal<string>('');
  public password = signal<string>('');

  public loginError = signal<string>('');

  constructor(
    private dialogRef: MatDialogRef<AdminComponent>, 
    private dialog: MatDialog,
  ) {}

  onSubmit(){
    this.loginError.set('');

    this.adminService.getAdminByUsernameAndPassword(this.username(), this.password()).subscribe({
      next: (admin) => {
        this.authAdminService.loginAdmin(admin);
        this.dialogRef.close();
        this.router.navigate(['admin']);

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
