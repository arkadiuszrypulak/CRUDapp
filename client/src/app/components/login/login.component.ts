import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//angular material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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
          this.snackBar.open('Zalogowano pomyślnie!', 'Zamknij', {
            duration: 2000,
          });
          this.router.navigate(['/questions-details']);
        } else {
          this.isLoggedIn = false;
          localStorage.removeItem('isLoggedIn');
          this.snackBar.open(
            'Błąd podczas logowania, sprawdź wporowadzone dane!',
            'Zamknij',
            {
              duration: 2000,
            }
          );
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
