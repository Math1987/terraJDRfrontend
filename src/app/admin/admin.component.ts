import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../services/account';
import {Router} from '@angular/router';
import {Worlds} from '../services/worlds';
import {Area} from '../services/world/area';
import {View} from '../services/world/view/view';

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

      View.canvasWorld = document.getElementById("worldViewAdmin") as HTMLCanvasElement ;

      if ( Area.world === null && Worlds.worlds !== null && Worlds.worlds.length > 0 ){
        this.enterInWorld(Worlds.worlds[0]);
      }

    }
  }
  ngOnDestroy(): void {
    View.canvasWorld = null;
  }

  getWorlds(){
    return Worlds.worlds;
  }
  enterInWorld(world){
    Worlds.enterIn(world, function(res) {
    });
  }
  isFocus(world){
    if ( Area.world !== null && world.name === Area.world.name ){
      return true ;
    }else{
      return false ;
    }
  }


}
