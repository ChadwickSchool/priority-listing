import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { GetOptionsService } from './get-options.service';
import { Observable } from 'rxjs';
import { Options } from '../shared/models/options';
import { Choices } from '../shared/models/choices';

@Injectable({
  providedIn: 'root'
})
export class GetAllChoicesService {
  allChoices: string[][];    // array of each student's response arrays
  candidates: Observable<Options>[];   // options the teacher set
  choicesRef: AngularFirestoreCollection<Choices>;
  choices: Observable<Choices[]>;

  constructor(private afs: AngularFirestore, private getOptionsService: GetOptionsService) {
    this.choicesRef = afs.collection<Choices>('choices');
    this.choices = this.choicesRef.valueChanges();
  }

  getStudentResponses(): Observable<Choices[]> {
    this.choices.subscribe(ref => {
      console.log(ref);
    });
    return this.choices;
  }

  getTeacherOptions() {
    return this.getOptionsService.getOptions();
  }
}
