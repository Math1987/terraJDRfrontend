import {Translator} from './translator';
import {Area} from '../../area';

export class T_bewitch extends Translator{

  action = "ensorceler" ;
  selfAction = "ensorceler";
  default = "ensorceler" ;
  value = "foi" ;

  readKey() {
    return 'bewitch' ;
  }


}
