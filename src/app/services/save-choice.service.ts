import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Submission as Submission } from '../shared/models/submission.model';
import ChoiceClass from '../shared/models/submission';

@Injectable({
  providedIn: 'root'
})
export class SaveChoiceService {
  submissionsRef: AngularFirestoreCollection<Submission>;
  submissions: Observable<Submission[]>;
  constructor(private afs: AngularFirestore) {
    this.submissionsRef = afs.collection<Submission>('submissions');
    this.submissions = this.submissionsRef.valueChanges();
  }

  // get the submissions from firebase
  getSubmissions(): Observable<Submission[]> {
    return this.submissions;
  }

  // combine id, the survey name, and submissions into one document on firebase
  addChoices(submissions: Array<string>, surveyName: string) {
    const id = this.afs.createId();
    const newRanking = new ChoiceClass(id, surveyName, submissions);
    this.submissionsRef.doc(id).set(Object.assign({}, newRanking));
  }
}
