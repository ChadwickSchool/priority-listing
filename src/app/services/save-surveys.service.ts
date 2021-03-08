import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Surveys } from '../shared/models/options.model';
import OptionsClass from '../shared/models/surveys';
import { User } from 'firebase';
import { take } from 'rxjs/operators';
// import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SaveOptionsService {
  surveysRef: AngularFirestoreCollection<Surveys>;
  surveys: Observable<Surveys[]>;
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  constructor(private afs: AngularFirestore) {
    this.surveysRef = afs.collection<Surveys>('surveys');
    this.surveys = this.surveysRef.valueChanges();
    this.usersRef = this.afs.collection<User>('users');
    this.users = this.usersRef.valueChanges();
  }

  // get all teacher options from firebase
  getSubmissions(): Observable<Surveys[]> {
    return this.surveys;
  }

  // combine id, the survey name, and options into one document on firebase
  async addOptions(
    surveys: Array<string>,
    surveyName: string,
    email: string,
    displayName: string
  ) {
    const id = this.afs.createId();
    const firebaseOptions = [];

    for (const optionsArray of surveys) {
      firebaseOptions.push(optionsArray);
    }
    const newRanking = new OptionsClass(
      id,
      surveyName,
      firebaseOptions,
      email,
      displayName
    );
    this.surveysRef.doc(id).set(Object.assign({}, newRanking));
  }

  deleteOptions(surveyName: string) {
  }

  // return the current user
  async getCurrentUser(idToken: string): Promise<User> {
    const email = await this.usersRef
      .doc<User>(idToken)
      .valueChanges()
      .pipe(take(1))
      .toPromise();
    return email;
  }
}
