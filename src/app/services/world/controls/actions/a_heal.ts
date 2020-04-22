import {Action} from './action';

export class A_heal extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "defense";
  }
  getNom(){
    return "soigner";
  }
  getActiveNom(){
    return "se soigner" ;
  }
  isActive(): boolean {
    return true;
  }
  matchActive(user): boolean {
    if ( user.life < user.life_max && user.food > 20 ){
      return true ;
    }else{
      return false ;
    }
  }

  matchInteraction(user, key1, target, key2): boolean {
    if ( key1 == "defense" && key2 == "life"
        && user.food >= 20
        && user.x == target.x && user.y == target.y
        && target.life < target.life_max
        && ( !('race' in target && 'race' in user) || target.race === user.race )
      ){
        return true ;
      }else{
        return false ;
      }
  }
  getCosts(){
    return [
      {
        key : "food",
        value : 20,
        nom : `de nourriture`,
      }
    ];
  }


}
