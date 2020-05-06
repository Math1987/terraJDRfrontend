import {Translator} from './translator';
import {Box} from '../box';
import {Area} from '../../area';

export class T_mine extends Translator{


  readKey(){
    return 'mine' ;
  }

  /*asMessage(user, json, language) {

    let message = '' ;
    let userBox = Box.readById(json.user);

    if ( user.id === Area.character.id ){

      message = `voici les coordonnée de la mine la plus proche: ${ - json.y + Area.world.height/2   }x, ${ json.x -Area.world.width/2 }y`;

    }else{
      message = null ;
    }


    return message ;
  }*/
}
