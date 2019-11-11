import { Injectable } from '@angular/core';
import { Choices } from '../shared/models/choices';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import ChoiceClass from '../shared/models/choices.model';

@Injectable({
  providedIn: 'root'
})
export class SaveChoiceService {
  choicesRef: AngularFirestoreCollection<Choices>;
  choices: Observable<Choices[]>;
  constructor(private afs: AngularFirestore) {
    this.choicesRef = afs.collection<Choices>(
      'choices'
    );
    this.choices = this.choicesRef.valueChanges();
  }

  getChoices(): Observable<Choices[]> {
    return this.choices;
  }

  addChoices(choices: any) {
    const id = this.afs.createId();
    const newRanking = new ChoiceClass(
      id,
      choices.uid,
      choices.ranking
    );
    this.choicesRef.doc(id).set(Object.assign({}, newRanking));
  }
}
