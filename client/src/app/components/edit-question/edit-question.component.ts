import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.scss',
})
export class EditQuestionComponent implements OnInit {
  id!: string;
  questionForm!: FormGroup;
  questionData: any; 

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id, '🔥')
    this.questionData = this.questionService.getQuestionById(this.id);

    this.questionForm = this.formBuilder.group({
      text: [this.questionData.question.text, Validators.required],
      category: [this.questionData.category],
      correctAnswer: [this.questionData.correctAnswer],
      incorrectAnswers: [this.questionData.incorrectAnswers.join(',')], 
    });
  }

  updateQuestion(): void {
    const updatedQuestion = {
      id: this.id,
      question: {
        text: this.questionForm.value.text,
      },
      category: this.questionForm.value.category,
      correctAnswer: this.questionForm.value.correctAnswer,
      incorrectAnswers: this.questionForm.value.incorrectAnswers.split(','),
    };

    this.questionService.updateQuestion(updatedQuestion);
  }
}
