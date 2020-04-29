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
  matchInteraction(user, key1, target, key2, contextViews){


    if ( !Box.isInPositionOf('neutral', user.x, user.y)
      && key1 == "attack" && key2 == "life"
      && user.x == target.x && user.y == target.y
      && (!('protection' in target) || target.protection <= 0 )
      && ( !('race' in target && 'race' in user) || target.race !== user.race )
    ){

      let isFortified = false ;
      if ( target.key !== "fortification" ) {
        for (let views of contextViews) {
          for (let view of views) {
            if (view.box.key == "fortification" && view.box.race !== user.race) {
              isFortified = true;
            }
          }
        }
      }
      if ( isFortified ){
        return false ;
      }else{
        return true ;
      }
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
