import {Translator} from './translator';

export class T_neutral extends Translator{

  default = "zone neutre" ;


  readKey(){
    return 'neutral' ;
  }

}
