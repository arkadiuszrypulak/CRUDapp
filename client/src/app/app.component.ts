// Angular imports
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from './core.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CoreModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CRUD-app';
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  loginOrLogout() {
    if (this.isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
      this.isLoggedIn = false;
      this.router.navigate(['/signin']);
    } else {
      this.router.navigate(['/signin']);
    }
  }
}
