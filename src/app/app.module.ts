import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { AppComponent } from './app.component';

// firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { ViewDataComponent } from './view-data/view-data.component';

export const DATA: InjectionToken<string> = new InjectionToken<
  Array<Array<string>>
>('DATA');
export const CANDIDATES: InjectionToken<string> = new InjectionToken<
  Array<string>
>('CANDIDATES');

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    StudentComponent,
    ViewDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [
    { provide: DATA, useValue: [[]] },
    { provide: CANDIDATES, useValue: [] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
