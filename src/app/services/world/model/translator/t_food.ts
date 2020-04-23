import {Translator} from './translator';

export class T_food extends Translator{

  default = "nourriture" ;
  value = "nourriture" ;
  designation = `de nourriture` ;

  readKey(){
    return 'food' ;
  }

}
