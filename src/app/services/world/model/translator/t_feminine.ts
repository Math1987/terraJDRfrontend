import {Translator} from './translator';

export class T_feminine extends Translator{

  default = "femme" ;

  constructor(){
    super();
  }
  readKey(): string {
    return 'feminine';
  }
}
