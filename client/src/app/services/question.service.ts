import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/test');
  }

  saveQuestionsToLocalstorage(questions: any[]): void {
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  addQuestion(newQuestion: any): void {
    let questions = JSON.parse(localStorage.getItem('questions') || '[]');
    questions.push(newQuestion);
    localStorage.setItem('questions', JSON.stringify(questions));
  }
}