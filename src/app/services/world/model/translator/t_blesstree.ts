import {Translator} from './translator';

export class T_blesstree extends Translator{

  action = "bénédiction de forêt" ;
  selfAction  = "bénédiction de forêt" ;
  default = "bénédiction de forêt" ;
  skill = "bénédiction de forêt" ;


  readKey(){
    return 'blesstree' ;
  }

}
