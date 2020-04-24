import {Translator} from './translator';

export class T_getResource extends Translator{

  action =  "chercher une resource" ;
  selfAction = "chercher une resource" ;

  readKey(){
    return 'getResource' ;
  }

}
