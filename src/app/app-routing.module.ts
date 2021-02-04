import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './session1/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { StudentThankYouComponent } from './student-thank-you/student-thank-you.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './shared/guards/login.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { ManageSurveyComponent } from './manage-survey/manage-survey.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'session1',
    component: StudentComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'view-data',
    component: ViewDataComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'thank-you',
    component: ThankYouComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'manage-survey',
    component: ManageSurveyComponent,
  },
  {
    path: 'student-thank-you',
    component: StudentThankYouComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
