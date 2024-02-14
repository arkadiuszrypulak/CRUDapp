// imports Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//imports Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
//import Service
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatRadioModule
  ],
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  answers: string[][] = [];
  correctAnswersCount: number = 0;
  quizFinished: boolean = false;
  quizStarted: boolean = false;
  userName: string = '';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  startQuiz(): void {
    this.quizStarted = true;
  }

  getQuestions(): void {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      this.questions = JSON.parse(storedQuestions);
      this.initAnswers();
    } else {
      this.questionService.getQuestions().subscribe((data) => {
        this.questions = data;
        this.initAnswers();
      });
    }
  }

  initAnswers(): void {
    if (this.questions) {
      this.answers = new Array(this.questions.length).fill([]).map(() => []);
    }
  }

  toggleAnswer(answer: string): void {
    const selectedAnswers: string[] = this.answers[this.currentQuestionIndex];
    const index = selectedAnswers.indexOf(answer);
    if (index === -1) {
      selectedAnswers.push(answer);
    } else {
      selectedAnswers.splice(index, 1);
    }
  }

  isAnswerSelected(answer: string): boolean {
    return this.answers[this.currentQuestionIndex].includes(answer);
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  selectAnswer(answer: string): void {
    const selectedAnswers: string[] = this.answers[this.currentQuestionIndex];
    selectedAnswers.length = 0;
    selectedAnswers.push(answer);
  }

  calculateResult(): void {
    this.correctAnswersCount = 0;
    this.questions.forEach((question, index) => {
      const selectedAnswers = this.answers[index];
      const correctAnswer = question.correctAnswer;
      if (selectedAnswers[0] === correctAnswer) {
        this.correctAnswersCount++;
      }
    });

    const quizResult = {
      userName: this.userName,
      correctAnswersCount: this.correctAnswersCount,
    };

    let quizResults: any[] = JSON.parse(
      localStorage.getItem('quizResults') || '[]'
    );

    quizResults.push(quizResult);

    localStorage.setItem('quizResults', JSON.stringify(quizResults));
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.initAnswers();
    this.correctAnswersCount = 0;
    this.quizFinished = false;
    this.quizStarted = false;
  }

  shuffleAnswers(question: any): string[] {
    if (!question.shuffledAnswers) {
      const answers = [question.correctAnswer, ...question.incorrectAnswers];
      question.shuffledAnswers = this.shuffle(answers);
    }
    return question.shuffledAnswers;
  }

  shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  finishQuiz(): void {
    this.calculateResult();
    this.quizFinished = true;
  }
}
