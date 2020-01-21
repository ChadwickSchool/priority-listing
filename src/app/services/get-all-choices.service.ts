import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { GetOptionsService } from './get-options.service';
import { Observable } from 'rxjs';
import { Choice } from '../shared/models/choice.model';
import { Options } from '../shared/models/options.model';


@Injectable({
  providedIn: 'root'
})
export class GetAllChoicesService {
  allChoices: string[][];    // array of each student's response arrays
  candidates: Observable<Options>[];   // options the teacher set
  choicesRef: AngularFirestoreCollection<Choice>;
  choices: Observable<Choice[]>;

  constructor(private afs: AngularFirestore, private getOptionsService: GetOptionsService) {
    this.choicesRef = afs.collection<Choice>('choices');
    this.choices = this.choicesRef.valueChanges();
  }

  getStudentResponses(): Observable<Choice[]> {
    return this.choices;
  }

  getStudentResponsesByName(name: string): Observable<Choice[]> {
    const query = this.afs.collection<Choice>('choices', ref => ref
      .where('surveyName', '==', name));
    return query.valueChanges();
  }

  getTeacherOptions() {
    return this.getOptionsService.getOptions();
  }
}
