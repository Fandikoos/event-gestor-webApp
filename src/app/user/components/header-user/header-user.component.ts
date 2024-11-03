import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent { }
