import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Options } from '../shared/models/options.model';
import OptionsClass from '../shared/models/options';
import { User } from 'firebase';
import { take } from 'rxjs/operators';
// import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SaveOptionsService {
  optionsRef: AngularFirestoreCollection<Options>;
  options: Observable<Options[]>;
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  constructor(private afs: AngularFirestore) {
    this.optionsRef = afs.collection<Options>('options');
    this.options = this.optionsRef.valueChanges();
    this.usersRef = this.afs.collection<User>('users');
    this.users = this.usersRef.valueChanges();
  }

  // get all teacher options from firebase
  getChoices(): Observable<Options[]> {
    return this.options;
  }

  // combine id, the survey name, and options into one document on firebase
  async addOptions(
    options: Array<string>,
    surveyName: string,
    email: string,
    displayName: string
  ) {
    const id = this.afs.createId();
    const firebaseOptions = [];

    for (const optionsArray of options) {
      firebaseOptions.push(optionsArray);
    }
    const newRanking = new OptionsClass(
      id,
      surveyName,
      firebaseOptions,
      email,
      displayName
    );
    this.optionsRef.doc(id).set(Object.assign({}, newRanking));
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
