import {Action} from './action';
import {Area} from '../../area';
import {Box} from '../../model/box';
import {View} from '../../view/view';

export class A_getWater extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "getWater";
  }
  isActive(): boolean {
    return true;
  }
  matchActive(user): boolean {
    if ( user.actions > 0 ){
      return true ;
    }else{
      return false ;
    }
  }
  matchInteraction(user, key1, target, key2, contextViews : View[]){
    if ( key1 == this.readKey() && Box.isGround( target[key2] )
      && target.x == user.x && target.y == user.y
      && user.id === Area.character.id
      && user.actions > 0 ){
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
        nom : `point d'action`,
      }
    ];
  }


}
