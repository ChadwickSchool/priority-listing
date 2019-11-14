import { Options } from './options';

export default class OptionsClass implements Options {
  id: string;
  // uid: string;
  tasks: Array<string>;

  constructor(id: string, tasks: Array<string>) {
    this.id = id;
    // this.uid = uid;
    this.tasks = tasks;
  }
}
