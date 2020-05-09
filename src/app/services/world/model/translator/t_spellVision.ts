import {Translator} from './translator';
import {Area} from '../../area';

export class T_spellVision extends Translator{

  action = "vision divine" ;
  selfAction  = "vision divine" ;
  default = "vision divine" ;
  skill = "vision divine" ;


  readKey(){
    return 'spellVision' ;
  }
  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ){
      message += `${this.writeMessageInfos(json)}, vous avez invoqué le sort de "vision divine", et trouvé que la mine la plus proche se trouve à  ${ - json.mine_y + Area.world.height/2   }x, ${ json.mine_x -Area.world.width/2 }y.`;
    }


    return message ;
  }
}
