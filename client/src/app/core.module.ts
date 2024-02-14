import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuestionService } from './services/question.service';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
  ],
  exports: [],
  providers: [QuestionService],
})
export class CoreModule {}
