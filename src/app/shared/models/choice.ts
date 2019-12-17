import { Choice } from './choice.model';


export default class ChoiceClass implements Choice {
  id: string;
  // uid: string;
  ranking: Array<string>;

  constructor(id: string, ranking: Array<string>) {
    this.id = id;
    // this.uid = uid;
    this.ranking = ranking;
  }
}
