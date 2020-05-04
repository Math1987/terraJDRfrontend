import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {Net} from '../../../net';
import {Box} from '../../model/box';
import {View} from '../../view/view';
import {MatDialogRef} from '@angular/material';
import {BewitchComponent} from '../../../../game/dialogs/bewitch/bewitch.component';
import {TradeComponent} from '../../../../game/dialogs/trade/trade.component';

export class A_trade extends Action{


  fileNameDialogRef: MatDialogRef<TradeComponent>;

  constructor(){
    super();
  }
  readKey(){
    return "trade";
  }
  isActive(): boolean {
    return true;
  }
  matchActive(user): boolean {
    if ( user.faith >= 10 ){
      return false ;
    }else{
      return false ;
    }
  }
  matchInteraction(user, key1, target, key2, contextViews : View[]){

    if ( user.gold > 150
      && target.key == "trader"
      && user.id === Area.character.id ){
      return true ;
    }else{
      return false ;
    }
  }
  use(user, target){
    const self = this ;

    this.fileNameDialogRef = Dialog.dialog.open(TradeComponent);

    TradeComponent.skill = target.skill ;

    this.fileNameDialogRef
      .afterClosed()
      .subscribe(value => {

        Net.emitAction( "trade", {
          user : user,
          target : target,
          trade : TradeComponent.skill
        }, function(giveResourceRes) {

          Box.lastUpdate = new Date().getTime();

        });


      });
  }

}
