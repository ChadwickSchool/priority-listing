import { Injectable } from '@angular/core';
import { SurveyVoters } from '../shared/models/surveyVoters.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import SurveyVotersClass from '../shared/models/surveyVoters';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SurveyVotersService {
  surveyVotersRef: AngularFirestoreCollection<SurveyVoters>;
  surveyVoters: Observable<SurveyVoters[]>;
  users: Array<User>;
  constructor(private afs: AngularFirestore) {
    this.surveyVotersRef = afs.collection<SurveyVoters>('surveyVoters');
    this.surveyVoters = this.surveyVotersRef.valueChanges();
    this.users = [];
   }

  getSurveyVoters(name): Observable<SurveyVoters[]> {
    return this.afs
        .collection<SurveyVoters>('surveyVoters', ref => ref
          .where('surveyName', '==', name)).valueChanges();
  }

  addSurveyVoters(surveyName: string, user: User) {
    this.getSurveyRef(surveyName).then((id) => {
      if (id) {
        this.addUser(surveyName);
        this.users.push(user);
        this.surveyVotersRef.doc(id as string).update({
          students: firestore.FieldValue.arrayUnion(user)
        });
      } else {
        id = this.afs.createId();
        this.users.push(user);
        const newEntry = new SurveyVotersClass(
          id as string,
          surveyName,
          this.users,
        );
        this.surveyVotersRef.doc(id as string).set(Object.assign({}, newEntry));
      }
    });
  }

  addUser(surveyName) {
    this.afs
      .collection<SurveyVoters>('surveyVoters', ref => ref
        .where('surveyName', '==', surveyName)).valueChanges().subscribe(s =>
          s[0].students.forEach(e => this.users.push(e)
        ));
  }

  getSurveyRef(surveyName: string) {
    return new Promise((resolve, reject) => {
      this.afs.collection<SurveyVoters>('surveyVoters', ref => ref.where('surveyName', '==', surveyName)).valueChanges().subscribe(survey => {
        if (survey.length > 0) {
          resolve(survey[0].docId);
        } else {
          resolve(undefined);
        }
      });
    });
  }
}
