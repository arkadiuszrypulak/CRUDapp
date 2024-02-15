import { Injectable } from '@angular/core';

interface QuizResult {
  userName: string;
  correctAnswersCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor() {}

  getRanking(): { userName: string; correctAnswersCount: number }[] {
    const quizResults =
      JSON.parse(localStorage.getItem('quizResults') as string) || [];
    return quizResults.sort(
      (a: QuizResult, b: QuizResult) =>
        b.correctAnswersCount - a.correctAnswersCount
    );
  }
}
