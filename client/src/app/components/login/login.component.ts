import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const credentials = {
      username: this.username,
      password: this.password,
    };

    this.http.post<any>('http://localhost:8080/signin', credentials).subscribe(
      (response) => {
        if (response) {
          this.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/questions']);
        } else {
          this.isLoggedIn = false;
          localStorage.removeItem('isLoggedIn');
          this.errorMessage = 'Nieprawidłowe dane logowania';
        }
      },
      (error) => {
        console.error('Błąd logowania:', error);
        this.errorMessage = 'Wystąpił błąd logowania';
      }
    );
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }
}
