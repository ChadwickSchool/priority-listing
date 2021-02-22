import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { GetSurveyService } from './get-options.service';
import { Observable } from 'rxjs';
import { Choice } from '../shared/models/choice.model';
import { Surveys } from '../shared/models/options.model';

@Injectable({
  providedIn: 'root'
})
export class GetAllChoicesService {
  allChoices: string[][]; // array of each student's response arrays
  candidates: Observable<Surveys>[]; // options the teacher set
  choicesRef: AngularFirestoreCollection<Choice>;
  choices: Observable<Choice[]>;

  constructor(
    private afs: AngularFirestore,
    private getOptionsService: GetSurveyService
  ) {
    this.choicesRef = afs.collection<Choice>('choices');
    this.choices = this.choicesRef.valueChanges();
  }

  // get the student choices
  getStudentResponses(): Observable<Choice[]> {
    return this.choices;
  }

  // get student choices by the specific survey
  getStudentResponsesByName(name: string): Observable<Choice[]> {
    const query = this.afs.collection<Choice>('choices', ref =>
      ref.where('surveyName', '==', name)
    );
    return query.valueChanges();
  }

  // get the options created by teacher
  getTeacherOptions() {
    return this.getOptionsService.getSurvey();
  }
}
