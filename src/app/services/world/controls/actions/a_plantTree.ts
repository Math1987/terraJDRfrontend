import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {Net} from '../../../net';
import {Box} from '../../model/box';
import {View} from '../../view/view';

export class A_plantTree extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "plantTree";
  }
  isActive(): boolean {
    return true;
  }
  matchActive(user): boolean {
    if ( user.water >= 50 ){
      return true ;
    }else{
      return false ;
    }
  }
  matchInteraction(user, key1, target, key2, contextViews : View[]){

    if ( target.key !== 'neutral'
      && user.water >= 50 && Box.isGround(target.key)
      && !Box.gotSolidInPosition(user.x, user.y)
      && user.x == target.x && user.y == target.y
      && user.id === Area.character.id ){

      return true ;
    }else{
      return false ;
    }
  }
  getCosts(){
    return [
      {
        key : "water",
        value : 50,
        nom : `eau`,
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
