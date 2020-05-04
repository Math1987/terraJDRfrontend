import {Action} from './action';
import {Area} from '../../area';
import {View} from '../../view/view';
import {Net} from '../../../net';
import {Box} from '../../model/box';

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
  matchInteraction(user, key1, target, key2, contextViews){



    if ( target[key2] == "mine" //&& user["search"] > 0
      && target.x == user.x && target.y == user.y
      && user.id === Area.character.id
      && user.id !== target.id ){

      let alreadyShearched = false ;
      if (  user.searched ) {
        if ( Array.isArray(user.searched) ){
          for (let searched of user.searched) {
            if (searched == target.id ){
              alreadyShearched = true ;
            }
          }
        }else if ( user.searched == target.id ){
          alreadyShearched = true ;
        }

      }
      if ( !alreadyShearched ) {
        let canMatch = true;
        if (contextViews && contextViews.length > 0) {
          for (let views of contextViews) {
            for (let view of views) {
              if (view && view.box.key == "character" && view.box.race !== user.race) {
                canMatch = false;
              }
            }
          }
        }


        return canMatch;
      }else{
        return false ;
      }
    }else{
      return false ;
    }
  }
  getCosts(){
    return [];
  }
  use(user, target){

    let canMakeAction = true ;
    for ( let cost of this.getCosts() ){
      for ( let key of Object.keys(user) ){
        if ( cost.key == key && user[key] < cost.value ){
          canMakeAction = false ;
          alert(`il vous faut au moins ${cost.value} ${cost.nom} pour ${this.getNom(user, target)}`);
        }
      }
    }

    if ( canMakeAction ) {
      Net.emitAction(  this.readKey(), {
        user: user,
        target: target
      }, function(res) {
        if ( user.searched ){
          if ( Array.isArray(user.searched) ){
            user.searched.push(target.id);
          }else{
            user.searched = [user.searched];
            user.searched.push(target.id);
          }
        }else{
          user.searched = [target.id];
        }
        Box.lastUpdate = new Date().getTime() ;
      });
    }

  }

}
