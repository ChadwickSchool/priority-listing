import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Choice } from '../shared/models/choice.model';
import ChoiceClass from '../shared/models/choice';


@Injectable({
  providedIn: 'root'
})
export class SaveChoiceService {
  choicesRef: AngularFirestoreCollection<Choice>;
  choices$: Observable<Choice[]>;
  constructor(private afs: AngularFirestore) {
    this.choicesRef = afs.collection<Choice>('choices');
    this.choices$ = this.choicesRef.valueChanges();
  }

  getChoices(): Observable<Choice[]> {
    return this.choices$;
  }

  addChoices(choices: Array<string>, surveyName: string) {
    const id = this.afs.createId();

    const newRanking = new ChoiceClass(
      id,
      surveyName,
      choices
    );
    this.choicesRef.doc(id).set(Object.assign({}, newRanking));
  }
}
