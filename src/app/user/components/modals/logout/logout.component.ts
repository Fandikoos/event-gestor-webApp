import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { privateDecrypt } from 'crypto';
import { authService } from '../../../services/auth.service';

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

  constructor(
    private dialogRef: MatDialogRef<LogoutComponent>, 
    private authService: authService 
  ) {}

  onConfirmLogout(): void {
    this.authService.logout(); //Cerrar sesión
    this.dialogRef.close(); 
  }

  onCancel(): void {
    this.dialogRef.close(); // Cerrar el modal sin hacer logout
  }


 }
