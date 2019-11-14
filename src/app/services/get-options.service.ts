import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Options } from '../shared/models/options';

@Injectable({
  providedIn: 'root'
})
export class GetOptionsService {
  optionsRef: AngularFirestoreCollection<Options>;
  options: Observable<Options[]>;
  constructor(private afs: AngularFirestore) {
    this.optionsRef = afs.collection<Options>('options');
    this.options = this.optionsRef.valueChanges();
  }

  // this gets the options assigned by the teacher on to the student's screen
  getOptions(): Observable<Options[]> {
    this.options.subscribe(option => {
      console.log(option);
    });
    console.log(this.options);
    return this.options;
  }


  // this one is what that the teacher calls to make the tasks
  addOptions(options: any) {

  }
}
