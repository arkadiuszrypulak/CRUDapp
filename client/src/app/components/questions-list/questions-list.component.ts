import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.scss',
})
export class QuestionsListComponent implements OnInit {
  questions: any[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
      this.questionService.saveQuestionsToLocalstorage(data);
    });
  }
}
