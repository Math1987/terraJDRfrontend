import {Translator} from './translator';
import {Box} from '../box';

export class T_defense extends Translator{

  action = "soigner" ;
  selfAction = "se soigner"

  constructor(){
    super();
  }
  readKey(){
    return 'defense' ;
  }


}
