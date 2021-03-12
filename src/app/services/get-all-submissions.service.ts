import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { GetSurveyService } from './get-surveys.service';
import { Observable } from 'rxjs';
import { Submission } from '../shared/models/submission.model';
import { Survey } from '../shared/models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class GetAllChoicesService {
  allSubmissions: string[][]; // array of each student's response arrays
  candidates: Observable<Survey>[]; // options the teacher set
  submissionsRef: AngularFirestoreCollection<Submission>;
  submissions: Observable<Submission[]>;

  constructor(
    private afs: AngularFirestore,
    private getOptionsService: GetSurveyService
  ) {
    this.submissionsRef = afs.collection<Submission>('submissions');
    this.submissions = this.submissionsRef.valueChanges();
  }

  // get the student choices
  getStudentResponses(): Observable<Submission[]> {
    return this.submissions;
  }

  // get student choices by the specific survey
  getStudentResponsesByName(name: string): Observable<Submission[]> {
    const query = this.afs.collection<Submission>('submissions', ref =>
      ref.where('surveyName', '==', name)
    );
    return query.valueChanges();
  }

  // get the options created by teacher
  getTeacherOptions() {
    return this.getOptionsService.getSurvey();
  }
}
