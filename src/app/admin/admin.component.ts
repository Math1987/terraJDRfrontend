import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../services/account';
import {Router} from '@angular/router';
import {Worlds} from '../services/worlds';
import {Area} from '../services/world/area';
import {View} from '../services/world/view/view';
import {NavComponent} from '../nav/nav.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {


  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    if ( !Account.isAdmin() ){
      this.router.navigate(['u/jeu']);
    }else{

      const self = this ;
      View.canvasWorld = document.getElementById("worldViewAdmin") as HTMLCanvasElement ;

      NavComponent.setInitCallBack(function(worlds) {
        if ( Area.world !== null ){
          self.runView();
        }
      });

    }
  }
  ngOnDestroy(): void {
    View.canvasWorld = null;
  }

  getWorlds(){
    return Worlds.worlds;
  }
  enterInWorld(world){
    const self = this;
    if ( Area.world === null || Area.world.name !== world.name ) {
      Worlds.enterIn(world, function(res) {
        self.runView();
      });
    }
  }
  isFocus(world){
    if ( Area.isWorldFocused(world) ){
      return true ;
    }else{
      return false ;
    }
  }

  runView(){
    View.moveControls = function(x,y,callBack){
      callBack('true');
    };
    View.goOn(Area.world.width/2,Area.world.height/2);
  }


}
