import {Translator} from './translator';
import {Box} from '../box';
import {Area} from '../../area';

export class T_kill extends Translator{

  constructor(){
    super();
  }
  readKey(){
    return 'kill' ;
  }

  /*asMessage(user, json, language) {

    let message = '' ;

    console.log(json);

    if ( json.user.id == user.id ){
      console.log('try kill');


      if ( json.target.key == "squeleton" && json.gold ){
        message = `Tu as massacré un squelette érrant...en fouillant ses entrailles tu trouve ${json.gold} or.` ;
      }else{
        message = `vous avez massacré sans pitié un ennemi sans pitié.` ;
      }

    }

    return message ;
  }*/

}
