import {Translator} from './translator';

export class T_bewitch extends Translator{

  action = "ensorceller" ;
  selfAction = "ensorceller";
  default = "ensorceller" ;
  value = "foi" ;

  readKey() {
    return 'bewitch' ;
  }
}
