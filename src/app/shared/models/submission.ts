import { Submission } from './submission.model';


export default class SubmissionClass implements Submission {
  id: string;
  // uid: string;
  surveyName: string;
  ranking: Array<string>;
  timestamp: Date;

  constructor(id: string, surveyName: string, ranking: Array<string>) {
    this.id = id;
    // this.uid = uid;
    this.surveyName = surveyName;
    this.ranking = ranking;
    this.timestamp = new Date();
  }
}
