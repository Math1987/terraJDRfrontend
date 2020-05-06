import {Translator} from './translator';

export class T_spellRain extends Translator{

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
      message += `${this.writeMessageInfos(json)}, vous invoquez la pluie magique qui remplie la nappe fréatique sur laquel se trouve le puit que vous comptez exploiter.`;
    }


    return message ;
  }
}
