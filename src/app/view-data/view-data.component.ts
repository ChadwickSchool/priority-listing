import { Component, OnInit } from '@angular/core';
import { RankVotesService } from '../services/rank-votes.service';
import { GetAllChoicesService } from '../services/get-all-choices.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Options } from '../shared/models/options';
import { GetOptionsService } from '../services/get-options.service';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Choices } from '../shared/models/choices';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {
  winner: string;
  dataLeft: Choices[]; // List of student choices. (List of list of strings)
  candidatesLeft: Options[]; // List of option names. (List of strings)
  choicesRef: AngularFirestoreCollection<Choices>;
  choices: Observable<Choices[]>;
  newArray;
  constructor(
    private getOptionsService: GetOptionsService,
    private afs: AngularFirestore,
    private getAllChoicesService: GetAllChoicesService
  ) {
    this.choicesRef = afs.collection<Choices>('choices');
    this.choices = this.choicesRef.valueChanges();
    // this.rankVotesService = new RankVotesService(candidates, data);
  }

  ngOnInit() {
    // this.rankVotesService = new RankVotesService(firebasedata)
    // this.winner = this.rankVotesService.solve();
  }

  async TeacherOptions() {
    this.candidatesLeft = await this.getOptionsService
      .getOptions()
      .pipe(take(1))
      .toPromise();
    console.log('this.candidatesLeft:' + JSON.stringify(this.candidatesLeft));
    return this.candidatesLeft;
  }

  async StudentChoices() {
    this.newArray = [];
    // this.choices.subscribe(choices => {
    //   console.log(choices);
    // });
    this.dataLeft = await this.getAllChoicesService
      .getStudentResponses()
      .pipe(take(1))
      .toPromise();
    console.log('this.dataLeft: ' + JSON.stringify(this.dataLeft));
    this.dataLeft.forEach(element => {
      console.log(element.ranking);
      let i = 0;
      this.newArray[0] = element.ranking;
      i++;
    });
    console.log('newArray: ' + this.newArray);
    return this.dataLeft;
  }
}
