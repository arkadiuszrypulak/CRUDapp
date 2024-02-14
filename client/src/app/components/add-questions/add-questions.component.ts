import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-questions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss'],
})
export class AddQuestionsComponent {
  newQuestion: any = {};
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private questionService: QuestionService) {}

  onSubmit(): void {
    try {
      this.questionService.addQuestion(this.newQuestion);
      this.successMessage = 'Pytanie zostało dodane!';
      this.newQuestion = {};
      setTimeout(() => {
        this.successMessage = ''; // Usuwa wiadomość o sukcesie po kilku sekundach
      }, 3000); // Ustaw czas w milisekundach
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Wystąpił błąd podczas dodawania pytania.';
    }
  }
}
