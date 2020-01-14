import { Choice } from './choice.model';


export default class ChoiceClass implements Choice {
  id: string;
  // uid: string;
  surveyName: string;
  ranking: Array<string>;

  constructor(id: string, surveyName: string, ranking: Array<string>) {
    this.id = id;
    // this.uid = uid;
    this.surveyName = surveyName;
    this.ranking = ranking;
  }
}
