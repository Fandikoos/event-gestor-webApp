import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { authService } from '../../services/auth.service';
import { User } from '../../model/interfaces';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {

  private authService = inject(authService);

  user = signal<User | null>(null);

  constructor(){
    const userInfo = this.authService.getUser();
    this.user.set(userInfo);
  }
}
