import {Translator} from './translator';

export class T_field extends Translator{

  default = "champ" ;

  readKey() {
    return 'field' ;
  }
}
