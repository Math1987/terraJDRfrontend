import {Translator} from './translator';

export class T_getMaterial extends Translator{

  default = "chercher du matériel" ;
  skill = "bûcheron" ;

  readKey(){
    return 'getMaterial' ;
  }

}
