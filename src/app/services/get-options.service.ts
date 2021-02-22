import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MySurveysComponent } from '../my-surveys/my-surveys.component';
import { Surveys } from '../shared/models/options.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GetSurveyService {
  surveysRef: AngularFirestoreCollection<Surveys>;
  surveys: Observable<Surveys[]>;
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.surveysRef = afs.collection<Surveys>('surveys');
    this.surveys = this.surveysRef.valueChanges();
  }

  // this gets the options assigned by the teacher on to the student's screen
  getSurvey(): Observable<Surveys[]> {
    return this.surveys;
  }

  getSpecificOptions(): Observable<Surveys[]> {
    // filter through and select only the options with the same email as the user
    return this.afs
      .collection<Surveys>('surveys', (ref) =>
        ref.where('email', '==', this.authService.getFirebaseEmail())
      )
      .valueChanges();
  }

  // get teacher options by specific survey
  getOptionsByName(name: string) {
    const query = this.afs.collection<Surveys>('surveys', (ref) =>
      ref.where('surveyName', '==', name)
    );
    return query.valueChanges();
  }

  // this one is what that the teacher calls to make the tasks
  addOptions(surveys: any) {}
}
