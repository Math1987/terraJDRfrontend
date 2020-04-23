import {Translator} from './translator';

export class T_material extends Translator{

  default = "matériel" ;
  value = "matériel" ;
  skill = "bûcheron" ;

  readKey(){
    return 'getMaterial' ;
  }

}
