import {Translator} from './translator';


export class T_build extends Translator{

  action = "construire" ;
  selfAction = "construire"

  constructor(){
    super();
  }
  readKey(){
    return 'build' ;
  }


}
