import { Component, OnInit } from '@angular/core';
import {UpdateBoxControlComponent} from '../update-box-control/update-box-control.component';
import {Router} from '@angular/router';
import {Account} from '../../services/account';
import {View} from '../../services/world/view/view';
import {NavComponent} from '../../nav/nav.component';
import {Area} from '../../services/world/area';
import {Worlds} from '../../services/worlds';
import {Dialog} from '../../services/dialog';
import {GetResourceComponent} from '../../game/dialogs/get-resource/get-resource.component';
import {Net} from '../../services/net';
import {Box} from '../../services/world/model/box';
import {MatDialogRef} from '@angular/material';
import {EditorAddComponent} from '../dialogs/editor-add/editor-add.component';
import {Translator} from '../../services/world/model/translator/translator';
import {Builder} from '../../services/world/controls/builder';

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.scss']
})
export class AdminMapComponent implements OnInit {

  updateBoxesControl = new UpdateBoxControlComponent();
  editorAddDialog: MatDialogRef<EditorAddComponent>;

  static BUILDERS = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit() {

    AdminMapComponent.BUILDERS = [
      new Builder('squeleton'),
      new Builder('field'),
      new Builder('well'),
      new Builder('tree'),
      new Builder('temple'),
      new Builder('mine'),
      new Builder('trader'),
      new Builder("fortification")
    ];

    if (!Account.isAdmin()) {
      this.router.navigate(['u/jeu']);
    } else {

      const self = this;
      View.setCanvasWorld( document.getElementById("worldViewAdmin") as HTMLCanvasElement );

      NavComponent.setInitCallBack(function(worlds) {
        if (Area.world !== null) {
          self.runView();
          View.goOn(Area.world.width / 2, Area.world.height / 2);
        }
      });

    }
  }

  ngOnDestroy(): void {
    View.reset();
  }

  getWorlds() {
    return Worlds.worlds;
  }

  enterInWorld(world) {
    const self = this;
    if (Area.world === null || Area.world.name !== world.name) {
      Worlds.enterIn(world, function(res) {
        self.runView();
        View.goOn(Area.world.width / 2, Area.world.height / 2);
      });
    }
  }

  isFocus(world) {
    if (Area.isWorldFocused(world)) {
      return true;
    } else {
      return false;
    }
  }
  addElement(){
    const self = this ;

    self.stopView();

    EditorAddComponent.builds = [] ;
    for ( let build of AdminMapComponent.BUILDERS ){
      let newBuild = new Builder(build.key);
      EditorAddComponent.builds.push(newBuild);
    }

    this.editorAddDialog = Dialog.dialog.open(EditorAddComponent);


    this.editorAddDialog
      .afterClosed()
      .subscribe(value => {

        self.runView();

        });

  }

  stopView(){
    View.moveControls = function(x,y, callBack) {
      callBack(null);
    };
    View.selectFunction = function(views: View) {
    };
  }

  runView() {
    const self = this;
    View.moveControls = function(x, y, callBack) {
      callBack('true');
    };
    View.selectFunction = function(views: View) {
      self.updateBoxesControl.setViews(views);
    };
  }
}
