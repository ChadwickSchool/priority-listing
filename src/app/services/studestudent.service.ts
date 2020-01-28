import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class StudestudentService {
  studentsRef: AngularFirestoreCollection<User>;
  students: Observable<User[]>;
  constructor(private afs: AngularFirestore) {
    this.studentsRef = afs.collection<User>('user');
    this.students = this.studentsRef.valueChanges();
  }

  getStudents(): Observable<User[]> {
    return this.afs
      .collection<User>('users')
      .valueChanges()
      .pipe(map(students => students.filter(s => !s.isAdmin)));
  }
}
