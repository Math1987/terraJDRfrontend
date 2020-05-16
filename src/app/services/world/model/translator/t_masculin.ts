import {Translator} from './translator';

export class T_masculin extends Translator{


  default = "homme";

  constructor() {
    super();
  }
  readKey(): string {
    return 'masculin';
  }
}
