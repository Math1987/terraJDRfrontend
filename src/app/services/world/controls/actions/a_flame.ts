import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {Net} from '../../../net';
import {Box} from '../../model/box';
import {View} from '../../view/view';

export class A_flame extends Action{

  spellTargets = ['character', 'squeleton', 'fortification','enemy'] ;

  constructor(){
    super();
  }
  readKey(){
    return "flame";
  }
  isActive(): boolean {
    return true;
  }
  matchInteraction(user, key1, target, key2, contextViews : View[]){

    /*if (user.id !== target.id
    && (target.key == "squeleton" || (target.key == "character" && target.race !== user.race))
    && user.x == target.x && user.y == target.y
    && this.faithCost() <= user.faith ){
      return true ;
    }else{
      return false ;
    }*/
    return false ;
  }
  getCosts(){
    return [
      {
        key : "faith",
        value : 10,
        nom : `foi`,
      }
    ];
  }
  use(user, target){
    const self = this ;

    Net.emitAction( self.readKey(), {
      user : user,
      target : target,
    }, function(waterRes) {

    });


  }

  isCompatibleAsReligion(user, target){
    if ( target.life && user.race && (!target.race || target.race !== user.race )){
      return true ;
    }else{
      return false ;
    }
  }

}
