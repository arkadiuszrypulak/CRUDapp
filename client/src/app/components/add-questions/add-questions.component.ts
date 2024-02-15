//imports Angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//imports Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
//import Services
import { QuestionService } from '../../services/question.service';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-questions',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatButtonModule],
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss'],
})
export class AddQuestionsComponent {
  newQuestion: any = {
    question: {},
    incorrectAnswers: ['', '', ''],
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    try {
      this.newQuestion.id = uuidv4();
      this.questionService.addQuestion(this.newQuestion);
      this.snackBar.open('Pytanie zostało dodane!', 'Zamknij', {
        duration: 3000,
      });
      this.newQuestion = {
        question: {},
        incorrectAnswers: ['', '', ''],
      };
      setTimeout(() => {
        this.successMessage = '';
        this.router.navigateByUrl('/questions');
      }, 3000);
    } catch (error) {
      console.error(error);
      this.snackBar.open(
        'Wystąpił błąd podczas dodawania pytania.',
        'Zamknij',
        {
          duration: 3000,
        }
      );
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
