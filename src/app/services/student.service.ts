import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { SurveyVoters } from '../shared/models/surveyVoters.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentsRef: AngularFirestoreCollection<User>;
  students: Observable<User[]>;
  constructor(private afs: AngularFirestore) {
    this.studentsRef = afs.collection<User>('user');
    this.students = this.studentsRef.valueChanges();
  }

  // get users by finding those who are not admins
  getStudents(): Observable<User[]> {
    return this.afs
      .collection<User>('users')
      .valueChanges()
      .pipe(map(students => students.filter(s => !s.isAdmin)));
  }

  // check if user has voted on specific survey
  hasVoted(surveyName: string, uid: string): Promise<boolean> {
    return this.afs
      .collection<SurveyVoters>('surveyVoters', ref =>
        ref.where('surveyName', '==', surveyName)
      )
      .valueChanges()
      .pipe(take(1)) // select the specific survey
      .toPromise()
      .then(value => {
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].students.length; j++) {
            if (value[i].students[j].uid === uid) {
              return true;
            }
          }
        }
        return false;
      });
  }
}
