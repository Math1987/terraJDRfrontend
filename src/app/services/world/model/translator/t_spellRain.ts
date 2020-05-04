import {Translator} from './translator';

export class T_spellRain extends Translator{

  action = "pluie sacré" ;
  selfAction  = "pluie sacré" ;
  default = "pluie sacré" ;
  skill = "pluie sacré" ;


  readKey(){
    return 'spellRain' ;
  }

}
