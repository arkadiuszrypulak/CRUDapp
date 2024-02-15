//import Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
//imports Angular Material
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss'],
})
export class QuestionDetailsComponent implements OnInit {
  questions: any[] = [];

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      this.questions = JSON.parse(storedQuestions);
    }
  }

  editQuestion(index: number): void {
    this.router.navigate(['/edit-question', index]);
  }

  deleteQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.snackBar.open('Pytanie zostało usuniętę!', 'Zamknij', {
        duration: 2000,
      });
      this.questions.splice(index, 1); 
      localStorage.setItem('questions', JSON.stringify(this.questions)); 
    }
  }

  addNewQuestion(): void {
    this.router.navigate(['/add'])
  }
}
