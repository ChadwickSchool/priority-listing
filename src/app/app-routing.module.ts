import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { StudentThankYouComponent } from './student-thank-you/student-thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent
  },
  {
    path: 'student',
    component: StudentComponent,
  },
  {
    path: 'teacher',
    component: TeacherComponent,
  },
  {
    path: 'view-data',
    component: ViewDataComponent
  },
  {
    path: 'thank-you',
    component: ThankYouComponent
  },
  {
    path: 'student-thank-you',
    component: StudentThankYouComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
