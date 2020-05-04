import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {View} from '../../view/view';
import {MatDialogRef} from '@angular/material';

import {BewitchComponent} from '../../../../game/dialogs/bewitch/bewitch.component';

export class A_bewitch extends Action{

  fileNameDialogRef: MatDialogRef<BewitchComponent>;

  constructor(){
    super();
  }
  readKey(){
    return "bewitch";
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

    if ( user.faith >= 10
      && (user.id === target.id || ( this.isCompatibleAsReligion(user, target)) )
      && user.id === Area.character.id ){

      let spells_ = Action.getSpellsFrom(user, target) ;
      if ( spells_.length > 0 ){
        return true ;
      }else{
        return false ;
      }

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

    BewitchComponent.build(user, target);
    BewitchComponent.user = user ;
    BewitchComponent.target = target ;
    this.fileNameDialogRef = Dialog.dialog.open(BewitchComponent);

    /*this.fileNameDialogRef
      .afterClosed()
      .subscribe(value => {


        console.log(user);
        console.log(target);


        Net.emitAction( BewitchComponent.spellFocused.readKey(), {
          user : user,
          target : target
        }, function(giveResourceRes) {


        });


      });*/
  }

}
