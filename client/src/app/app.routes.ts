import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { AddQuestionsComponent } from './components/add-questions/add-questions.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';

export const routes: Routes = [
  { path: '', redirectTo: 'questions', pathMatch: 'full' },
  { path: 'questions', component: QuestionsListComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'add', component: AddQuestionsComponent, canActivate: [AuthGuard] },
  {
    path: 'questions-details',
    component: QuestionDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'edit-question/:id', component: EditQuestionComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
