import {Action} from './action';
import {Area} from '../../area';
import {Box} from '../../model/box';
import {MatDialogRef} from '@angular/material';
import {GiveResourceComponent} from '../../../../game/dialogs/give-resource/give-resource.component';
import {BuildComponent} from '../../../../game/dialogs/build/build.component';
import {Dialog} from '../../../dialog';
import {Translator} from '../../model/translator/translator';
import {Net} from '../../../net';
import {View} from '../../view/view';
import {EditorAddComponent} from '../../../../admin/dialogs/editor-add/editor-add.component';
import {Builder} from '../builder';
import {DialogueService} from '../../../../game/dialogs/dialogue.service';


export class A_build extends Action{

  fileNameDialogRef: MatDialogRef<BuildComponent>;

  constructor(){
    super();
  }
  readKey(){
    return "build";
  }
  isActive(): boolean {
    return true;
  }
  matchInteraction(user, key1, target, key2, contextViews){

    if ( Box.isGround(target.key)
      && target.key !== "neutral"
      && user.material >= 1000
      && !Box.isSolid(target.key)
      && target.x == user.x && target.y == user.y
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
  use(user, target){



    const self = this ;

    BuildComponent.builds = [] ;

    let newBuild = new Builder("fortification");
    BuildComponent.builds.push(newBuild);

    DialogueService.open = true ;
    this.fileNameDialogRef = Dialog.dialog.open(BuildComponent);
    this.fileNameDialogRef.afterClosed().subscribe(()=>{
      DialogueService.open = false ;
    });

    this.fileNameDialogRef
      .afterClosed()
      .subscribe(value => {


      });


  }

}
