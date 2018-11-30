import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { SharedModule } from '../shared/shared.module';

const ROUTES: Routes = [
  {
    path: '',
    component: DocumentationComponent,
    data: {
      title: 'documentation'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot(),
    MarkdownModule.forChild()
  ],
  declarations: [DocumentationComponent],
  providers: []
})
export class DocumentationModule {}
