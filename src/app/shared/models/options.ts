import { Options } from './options.model';

export default class OptionsClass implements Options {
  id: string;
  tasks: Array<string>;

  constructor(id: string, tasks: Array<string>) {
    this.id = id;
    this.tasks = tasks;
  }
}
