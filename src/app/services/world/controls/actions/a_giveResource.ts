import {Action} from './action';

export class A_giveResource extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "giveResource";
  }
  getNom(){
    return "donner une resource";
  }
  matchInteraction(user, key1, target, key2): boolean {
    if ( key1 == "water" && key2 == "water"
      && user.x == target.x && user.y == target.y
      && ( !('race' in target && 'race' in user) || target.race !== user.race )
    ){
      return true ;
    }else{
      return false ;
    }
  }



}
