import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './session1/student.component';
import { AppComponent } from './app.component';

// firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { ViewDataComponent } from './view-data/view-data.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { StudentThankYouComponent } from './student-thank-you/student-thank-you.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageSurveyComponent } from './manage-survey/manage-survey.component';
import { MySurveysComponent } from './my-surveys/my-surveys.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    StudentComponent,
    ViewDataComponent,
    LoginComponent,
    ThankYouComponent,
    StudentThankYouComponent,
    NavbarComponent,
    ManageSurveyComponent,
    MySurveysComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
