import {Action} from './action';
import {Area} from '../../area';

export class A_getFood extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "getFood";
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
  matchInteraction(user, key1, target, key2){

    if ( key1 == this.readKey()  && ( target[key2] == "ground" ||  target[key2] == "neutral")
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
