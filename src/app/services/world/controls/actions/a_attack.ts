import {Action} from './action';
import {View} from '../../view/view';
import {Box} from '../../model/box';

export class A_attack extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "attack";
  }
  getNom(){
    return "attaquer";
  }
  matchInteraction(user, key1, target, key2): boolean {

    if ( !Box.isInPositionOf('neutral', user.x, user.y)
      && key1 == "attack" && key2 == "life"
      && user.x == target.x && user.y == target.y
      && ( !('race' in target && 'race' in user) || target.race !== user.race )
    ){
      return true ;
    }else{
      return false ;
    }
  }
  getCosts(){
    return [
      {
        key : "actions",
        value : 1,
        nom : `point d'action`
      }
    ];
  }


}
