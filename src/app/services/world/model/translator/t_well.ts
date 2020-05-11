import {Translator} from './translator';

export class T_well extends Translator{

  action = "puiser de l'eau" ;
  default = "puit" ;


  readKey(){
    return 'well' ;
  }

}
