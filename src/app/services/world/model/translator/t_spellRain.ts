import {Translator} from './translator';

export class T_spellRain extends Translator{

  info = "pluie sacrée";
  action = "pluie sacré" ;
  selfAction  = "pluie sacré" ;
  default = "pluie sacré" ;
  skill = "pluie sacré" ;


  readKey(){
    return 'spellRain' ;
  }
  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ){
      message += `${user.name} invoque pluie sacrée.`;
    }


    return message ;
  }
}
