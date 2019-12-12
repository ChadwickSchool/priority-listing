import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ViewDataComponent } from './view-data/view-data.component';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
