import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/questions');
  }

  saveQuestionsToLocalstorage(questions: any[]): void {
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  addQuestion(newQuestion: any): void {
    let questions = JSON.parse(localStorage.getItem('questions') || '[]');
    questions.push(newQuestion);
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  getQuestionById(id: string): any {
    let questions = JSON.parse(localStorage.getItem('questions') || '[]');
    return questions.find((question: any) => question.id === id);
  }

  updateQuestion(updatedQuestion: any): void {
    let questions = JSON.parse(localStorage.getItem('questions') || '[]');
    let index = questions.findIndex(
      (question: any) => question.id === updatedQuestion.id
    );
    if (index !== -1) {
      questions[index] = updatedQuestion;
      localStorage.setItem('questions', JSON.stringify(questions));
    }
  }
}
