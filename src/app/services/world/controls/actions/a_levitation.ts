import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {Net} from '../../../net';
import {Box} from '../../model/box';
import {View} from '../../view/view';

export class A_levitation extends Action{

  religions  = ['hermes'] ;
  spellTargets = ['character'];

  constructor(){
    super();
  }
  readKey(){
    return "levitation";
  }
  isActive(): boolean {
    return true;
  }
  matchActive(user): boolean {
    if ( user.faith >= 10 ){
      return true ;
    }else{
      return false ;
    }
  }
  matchInteraction(user, key1, target, key2, contextViews : View[]){

    if ( user.religion == "hermes" && user.faith >= 10
      && user.id === target.id
      && user.id === Area.character.id ){
      return false ;
    }else{
      return false ;
    }
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

}
