import {Translator} from './translator';
import {Box} from '../box';

export class T_giveResource extends Translator{

  default = "donner une resource";
  action = "donner une resource";

  constructor(){
    super();
  }
  readKey(){
    return 'giveResource' ;
  }

}
