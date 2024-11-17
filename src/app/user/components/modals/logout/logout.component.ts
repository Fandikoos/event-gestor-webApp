import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { privateDecrypt } from 'crypto';
import { authService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent {

  private router = inject(Router)

  constructor(
    private dialogRef: MatDialogRef<LogoutComponent>, 
    private authService: authService 
  ) {}

  onConfirmLogout(): void {
    this.authService.logout(); //Cerrar sesión
    this.dialogRef.close(); 
    this.router.navigate(['']);

  }

  onCancel(): void {
    this.dialogRef.close(); // Cerrar el modal sin hacer logout
  }


 }
