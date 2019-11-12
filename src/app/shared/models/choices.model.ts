import { Choices } from './choices';

export default class ChoiceClass implements Choices {
  id: string;
  // uid: string;
  ranking: Array<Array<string>>;

  constructor(id: string, ranking: Array<Array<string>>) {
    this.id = id;
    // this.uid = uid;
    this.ranking = ranking;
  }
}
