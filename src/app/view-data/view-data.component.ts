import { Component, OnInit } from "@angular/core";
import { RankVotesService } from "../services/rank-votes.service";
import { GetAllChoicesService } from "../services/get-all-choices.service";
import { Observable } from "rxjs";
import { Options } from "../shared/models/options";
import { GetOptionsService } from "../services/get-options.service";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Choices } from '../shared/models/choices';

@Component({
  selector: "app-view-data",
  templateUrl: "./view-data.component.html",
  styleUrls: ["./view-data.component.scss"]
})
export class ViewDataComponent implements OnInit {
  winner: string;
  choicesRef: AngularFirestoreCollection<Choices>;
  choices: Observable<Choices[]>;
  constructor(private getOptionsService: GetOptionsService, private afs: AngularFirestore) {
    this.choicesRef = afs.collection<Choices>('choices');
    this.choices = this.choicesRef.valueChanges();
    // this.rankVotesService = new RankVotesService(candidates, data);
  }

  ngOnInit() {
    // this.rankVotesService = new RankVotesService(firebasedata)
    // this.winner = this.rankVotesService.solve();
  }

  TeacherOptions(): Observable<Options[]> {
    console.log(
      "get teacher options function: " + this.getOptionsService.getOptions()
    );
    return this.getOptionsService.getOptions();
  }

  StudentChoices(): Observable<Choices[]> {
    this.choices.subscribe(choices => {
      console.log(choices);
    });
    console.log(this.choices);
    return this.choices;
  }
}
