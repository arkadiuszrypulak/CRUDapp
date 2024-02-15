// imports Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//imports Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
//import services
import { QuestionService } from '../../services/question.service';
@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.scss',
})
export class EditQuestionComponent implements OnInit {
  id!: string;
  questionForm!: FormGroup;
  questionData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.questionData = this.questionService.getQuestionById(this.id);
    if (!this.questionData) {
      console.error('Brak takiego pytania!');
      return;
    }

    this.questionForm = this.formBuilder.group({
      text: [this.questionData.question.text, Validators.required],
      correctAnswer: [this.questionData.correctAnswer],
      incorrectAnswer1: [this.questionData.incorrectAnswers[0]],
      incorrectAnswer2: [this.questionData.incorrectAnswers[1]],
      incorrectAnswer3: [this.questionData.incorrectAnswers[2]],
    });
  }

  updateQuestion(): void {
    const incorrectAnswers = [
      this.questionForm.value.incorrectAnswer1,
      this.questionForm.value.incorrectAnswer2,
      this.questionForm.value.incorrectAnswer3,
    ].filter((answer) => !!answer);

    const updatedQuestion = {
      id: this.id,
      question: {
        text: this.questionForm.value.text,
      },
      correctAnswer: this.questionForm.value.correctAnswer,
      incorrectAnswers: incorrectAnswers,
    };

    this.questionService.updateQuestion(updatedQuestion);
    this.snackBar.open('Pytanie edytowano!', 'Zamknij', {
      duration: 2000,
    });
    this.router.navigate(['/questions-details']);
  }
}
