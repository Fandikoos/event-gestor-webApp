import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './user/components/modals/login/login.component';
import { authService } from './user/services/auth.service';
import { LogoutComponent } from './user/components/modals/logout/logout.component';
import { UserService } from './user/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, MatButtonModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'event-gestor-webApp';

  private authService = inject(authService);
  userId = signal<number>(0);

  constructor(private dialog: MatDialog){
  }

  ngOnInit(){
    this.authService.logout();
  }

  openLoginModal(){
    this.dialog.open(LoginComponent)
  }

  onLogout(){
    this.dialog.open(LogoutComponent);
    //this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuth();
  }

  getUsername(): string{
    const user = this.authService.getUser();
    return user.name ? user.name: '';
  }

  getUserId(){
    const userId = this.authService.getUser().id;
    this.userId.set(userId);
  }
}
