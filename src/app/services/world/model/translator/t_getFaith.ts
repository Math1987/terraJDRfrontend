import {Translator} from './translator';

export class T_getFaith extends Translator{

  default = "trouver la foi" ;
  skill = "prêtre" ;

  readKey(){
    return 'getFaith' ;
  }

}
