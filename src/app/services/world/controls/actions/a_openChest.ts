import {Action} from './action';
import {Area} from '../../area';
import {View} from '../../view/view';

export class A_openChest extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "openChest";
  }
  isActive(): boolean {
    return true;
  }
  matchInteraction(user, key1, target, key2, contextViews){

    if ( target[key2] == "chest"
      && target.x == user.x && target.y == user.y
      && user.id === Area.character.id
      && user.id !== target.id ){

      let canMatch = true ;
      if ( contextViews && contextViews.length > 0 ) {
        for (let views of contextViews) {
          for ( let view of views ){
            if ( view && view.box.key == "character" && view.box.race !== user.race ){
              canMatch = false;
            }
          }
        }
      }


      return canMatch ;
    }else{
      return false ;
    }
  }
  getCosts(){
    return [];
  }


}
