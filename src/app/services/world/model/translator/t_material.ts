import {Translator} from './translator';

export class T_material extends Translator{

  default = "matériel" ;
  designation = `de matériel` ;

  readKey(){
    return 'material' ;
  }

}
