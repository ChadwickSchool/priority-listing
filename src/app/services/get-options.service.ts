import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Options } from '../shared/models/options.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GetOptionsService {
  optionsRef: AngularFirestoreCollection<Options>;
  options: Observable<Options[]>;
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.optionsRef = afs.collection<Options>('options');
    this.options = this.optionsRef.valueChanges();
  }

  // this gets the options assigned by the teacher on to the student's screen
  getOptions(): Observable<Options[]> {
    return this.options;
  }

  getSpecificOptions(): Observable<Options[]> {
    // filter through and select only the options with the same email as the user
    return this.afs
      .collection<Options>('options', (ref) =>
        ref.where('email', '==', this.authService.getFirebaseEmail())
      )
      .valueChanges();
  }

  // get teacher options by specific survey
  getOptionsByName(name: string) {
    const query = this.afs.collection<Options>('options', (ref) =>
      ref.where('surveyName', '==', name)
    );
    return query.valueChanges();
  }

  // this one is what that the teacher calls to make the tasks
  addOptions(options: any) {}
}
