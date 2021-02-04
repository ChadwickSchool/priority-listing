import { Component, OnInit } from '@angular/core';
import { RankVotesService } from '../services/rank-votes.service';
import { GetAllChoicesService } from '../services/get-all-choices.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { GetOptionsService } from '../services/get-options.service';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Choice } from '../shared/models/choice.model';
import { Options } from '../shared/models/options.model';
import { StudentService } from '../services/student.service';
import { User } from '../shared/models/user.model';
import { SurveyVotersService } from '../services/survey-voters.service';
import { SurveyVoters } from '../shared/models/surveyVoters.model';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss'],
})
export class ViewDataComponent implements OnInit {
  winner: string;
  solution: string;
  solutionPercent: string;
  secondPlace: string;
  students$: Observable<Array<SurveyVoters>>;
  surveyVoters: Array<SurveyVoters>;
  students: Array<User>;
  secondPlacePercent: string;
  normalVoting;
  dataLeft: string[][]; // List of student choices. (List of list of strings)
  candidatesLeft: string[]; // List of option names. (List of strings)
  choicesRef: AngularFirestoreCollection<Choice>;
  choices: Observable<Choice[]>;
  surveyNames: Array<string>;
  options: Options[];
  surveyName = '';
  newArray;

  constructor(
    private getOptionsService: GetOptionsService,
    private afs: AngularFirestore,
    private surveyVotersService: SurveyVotersService,
    private getAllChoicesService: GetAllChoicesService
  ) {
    this.choicesRef = afs.collection<Choice>('choices');
    this.choices = this.choicesRef.valueChanges();
    this.solution = '';
    this.students = [];
    this.surveyNames = [];
    this.secondPlace = '';
    this.options = [];
  }

  ngOnInit() {
    this.showOptions();
  }

  async delete() {
    if (
      !window.confirm(
        'Are you sure you want to delete ' + this.surveyName + '?'
      )
    ) {
      return;
    }

    this.afs.firestore
      .collection('options')
      .where('surveyName', '==', this.surveyName)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          this.afs.firestore.collection('options').doc(doc.id).delete();
        });
      });
  }

  // get data from firebase and activate voting algorithm
  async fetchAndSolve() {
    // get teacher options
    await this.TeacherOptions();
    // get student votes
    await this.StudentChoices();
    // set students observable to the selected survey's votes
    this.students$ = this.surveyVotersService.getSurveyVoters(this.surveyName);
    this.students$.subscribe((voters) => {
      this.students = []; // put it into an array
      voters.forEach((voter) => {
        this.students = this.students.concat(voter.students); // put all student vote arrays into one massive array
      });
    });

    // set functions to variables
    this.normalVoting = this.calculateNormalVoting();
    this.solution = this.solve();
  }

  calculateNormalVoting() {
    const roundScores = this.findRoundScores();

    let sum = 0;

    for (const value of Object.values(roundScores)) {
      sum += value;
    }

    const percents = {};

    for (const id of Object.keys(roundScores)) {
      percents[id] = roundScores[id] / sum;
    }

    for (const id of Object.keys(percents)) {
      percents[id] = (percents[id] * 100).toFixed(0) + '%';
    }

    let output = '';

    for (const id of Object.keys(percents)) {
      output += id + ' ' + percents[id] + ', ';
    }

    return output;
  }

  async showOptions() {
    this.options = await this.getOptionsService
      .getSpecificOptions()
      .pipe(take(1))
      .toPromise();
    this.showSurveyNames();
    console.log('showOptions is being called');
  }

  async TeacherOptions() {
    this.candidatesLeft = await new Promise((resolve, reject) => {
      this.getOptionsService
        .getOptionsByName(this.surveyName)
        .subscribe((options) => {
          resolve(options[Object.keys(options)[0]].tasks);
        });
    });
  }

  async StudentChoices() {
    this.dataLeft = await new Promise((resolve, reject) => {
      this.getAllChoicesService
        .getStudentResponsesByName(this.surveyName)
        .subscribe((studentChoices) => {
          resolve(
            studentChoices.map((element) => {
              return element.ranking;
            })
          );
        });
    });
  }

  showSurveyNames() {
    this.options.forEach((element) => {
      this.surveyNames.push(element.surveyName);
    });
  }

  // set the name of survey to the selected survey
  setName(name: string) {
    this.surveyName = name;
  }

  findRoundScores(): {[key: string]: number} {
    const roundScores = {};

    for (const data of this.dataLeft) {
      for (const dataS of this.dataLeft) {
        if (roundScores[this.dataLeft[0][0]] === undefined) {
          roundScores[this.dataLeft[0][0]] = 0;
        }
      }
    }
    // Give a score based on first-place votes.
    for (const data of this.dataLeft) {
      roundScores[this.dataLeft[0][0]]++;
    }
    return roundScores;
  }

  solve() {
    // Go through all of the rounds
    while (this.candidatesLeft.length > 2) {
      const roundScore = this.findRoundScores();

      // Give a score based on first-place votes.
      for (const data of this.dataLeft) {
        if (!roundScore[this.dataLeft[0][0]]) {
          roundScore[this.dataLeft[0][0]] = 0;
        }

        roundScore[this.dataLeft[0][0]]++;
      }

      let worstCandidate;
      let worstCandidateScore = -1;

      // Find candidate with lowest first-place votes.
      for (const candidate of this.candidatesLeft) {
        if (
          worstCandidateScore === -1 ||
          roundScore[candidate] < worstCandidateScore
        ) {
          worstCandidate = candidate;
          worstCandidateScore = roundScore[candidate];
        }
      }

      // Remove them from the remaining candidates.
      this.candidatesLeft.splice(
        this.candidatesLeft.indexOf(worstCandidate),
        1
      );

      // Remove them from the candidate votes so that lower candidates rise up
      for (const data of this.dataLeft) {
        this.dataLeft[0].splice(this.dataLeft[0].indexOf(worstCandidate), 1);
      }
    }

    const finalRoundScores = this.findRoundScores();
    // Compare the final two candidates and return the winner
    if (
      (finalRoundScores[this.candidatesLeft[0]] || 0) >
      (finalRoundScores[this.candidatesLeft[1]] || 0)
    ) {
      this.secondPlace = this.candidatesLeft[1];
      this.calculateRankedPercents(
        finalRoundScores[this.candidatesLeft[0]],
        finalRoundScores[this.candidatesLeft[1]]
      );
      return this.candidatesLeft[0];
    } else {
      this.secondPlace = this.candidatesLeft[0];
      this.calculateRankedPercents(
        finalRoundScores[this.candidatesLeft[1]],
        finalRoundScores[this.candidatesLeft[0]]
      );
      return this.candidatesLeft[1];
    }
  }

  // get the percent of votes
  calculateRankedPercents(votesWinner, votesLoser) {
    const total = votesWinner + votesLoser;
    if (votesWinner && votesLoser) {
      this.secondPlacePercent = ((votesLoser / total) * 100).toFixed(0) + '%';
      this.solutionPercent = ((votesWinner / total) * 100).toFixed(0) + '%';
    } else {
      this.solutionPercent = '100%';
      this.secondPlacePercent = '0%';
    }
  }
}
