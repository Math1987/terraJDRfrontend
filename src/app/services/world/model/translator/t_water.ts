import {Translator} from './translator';

export class T_water extends Translator{

  default = "eau" ;
  value = "eau" ;
  designation = `d'eau` ;


  readKey(){
    return 'water' ;
  }

}
