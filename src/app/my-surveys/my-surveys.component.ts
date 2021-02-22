import { Component, OnInit } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.scss']
})
export class MySurveysComponent implements OnInit {
  surveyNames: Array<string>;
  surveyName = '';
  constructor(private afs: AngularFirestore) {
    this.surveyNames = [];
  }

  ngOnInit() {
  }

  getSurveys() {
    return this.afs.collection('submissions').valueChanges;
  }
  }
