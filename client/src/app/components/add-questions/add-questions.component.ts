//imports Angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//imports Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
//import Services
import { QuestionService } from '../../services/question.service';

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

  constructor(private questionService: QuestionService, private router: Router) {}

  onSubmit(): void {
    try {
      this.questionService.addQuestion(this.newQuestion);
      this.successMessage = 'Pytanie zostało dodane!';
      this.newQuestion = {
        question: {},
        incorrectAnswers: ['', '', ''],
      };
      setTimeout(() => {
        this.successMessage = '';
        this.router.navigateByUrl('/questions')
      }, 3000);
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Wystąpił błąd podczas dodawania pytania.';
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
