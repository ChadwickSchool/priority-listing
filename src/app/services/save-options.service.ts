import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Options } from '../shared/models/options';
import OptionsClass from '../shared/models/options.model';

@Injectable({
  providedIn: 'root'
})
export class SaveOptionsService {
  optionsRef: AngularFirestoreCollection<Options>;
  options: Observable<Options[]>;
  constructor(private afs: AngularFirestore) {
    this.optionsRef = afs.collection<Options>('options');
    this.options = this.optionsRef.valueChanges();
  }

  getChoices(): Observable<Options[]> {
    return this.options;
  }

  addOptions(options: any) {
    const id = this.afs.createId();
    console.log('options', options);
    const firebaseOptions = [];

    for (const optionsArray of options) {
      firebaseOptions.push(optionsArray);
    }
    console.log('firebaseOptions', firebaseOptions);
    const newRanking = new OptionsClass(
      id,
      // choices.uid,
      firebaseOptions
    );
    this.optionsRef.doc(id).set(Object.assign({}, newRanking));
  }
}
