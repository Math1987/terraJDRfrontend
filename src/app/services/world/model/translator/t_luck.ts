import {Translator} from './translator';

export class T_luck extends Translator{

  action = "chance" ;
  selfAction  = "chance" ;
  default = "chance" ;
  skill = "chance" ;


  readKey(){
    return 'luck' ;
  }

}
