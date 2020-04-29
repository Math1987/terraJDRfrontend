import {Translator} from './translator';

export class T_trade extends Translator{

  action = "échanger" ;
  selfAction  = "échanger" ;
  default = "échanger" ;
  skill = "échanger";


  readKey(){
    return 'trade' ;
  }

}
