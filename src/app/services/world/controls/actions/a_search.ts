import {Action} from './action';
import {Area} from '../../area';

export class A_search extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "search";
  }
  isActive(): boolean {
    return true;
  }
  matchInteraction(user, key1, target, key2){

    if ( target[key2] == "mine" && user["search"] > 0
      && target.x == user.x && target.y == user.y
      && user.id === Area.character.id
      && user.id !== target.id ){

      return true ;
    }else{
      return false ;
    }
  }
  getCosts(){
    return [];
  }


}
