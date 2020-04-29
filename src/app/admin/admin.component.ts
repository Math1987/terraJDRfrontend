import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../services/account';
import {Router} from '@angular/router';
import {Worlds} from '../services/worlds';
import {Area} from '../services/world/area';
import {View} from '../services/world/view/view';
import {NavComponent} from '../nav/nav.component';
import {UpdateBoxControlComponent} from './update-box-control/update-box-control.component';
import {Net} from '../services/net';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  updateBoxesControl = new UpdateBoxControlComponent();
  createNewWorld = null ;

  static changeWorldFunction = null ;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    if ( !Account.isAdmin() ){
      this.router.navigate(['u/jeu']);
    }else{

      const self = this ;
      View.setCanvasWorld( document.getElementById("worldViewAdmin") as HTMLCanvasElement) ;

      NavComponent.setInitCallBack(function(worlds) {
        if ( Area.world !== null ){
          self.runView();
        }
      });

    }
  }
  ngOnDestroy(): void {
    View.reset();
  }

  getWorlds(){
    return Worlds.worlds;
  }
  enterInWorld(world){
    const self = this;
    if ( Area.world === null || Area.world.name !== world.name ) {
      Worlds.enterIn(world, function(res) {
        self.runView();
        if ( AdminComponent.changeWorldFunction !== null ){
          AdminComponent.changeWorldFunction();
        }
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

  openCreateWorld(){
    this.createNewWorld = true;
  }
  createWorld(){

    let name = (document.getElementById("inputCreateWorldName") as HTMLInputElement).value ;
    let width = (document.getElementById("inputCreateWorldWidth") as HTMLInputElement).value ;
    let height = (document.getElementById("inputCreateWorldHeight") as HTMLInputElement).value ;

    const self = this ;
    if ( name !== null && width !== null && height !== null ){
      Net.http.get(`${environment.backURL}/generate?name=${name}&width=${width}&height=${height}&json={}`, { responseType:'text', headers : Net.headers}).subscribe((res)=>{
        self.createNewWorld = null ;
        self.router.navigate(['/u/admin']);
      });
    }

  }

  runView(){
    const self = this ;
    View.moveControls = function(x,y,callBack){
      callBack('true');
    };
    View.selectFunction = function(views:View){
      self.updateBoxesControl.setViews(views);
    };
    View.goOn(Area.world.width/2,Area.world.height/2);
  }

  pass(){
    if ( Area.world ){
      if ( confirm("êtes vous sur de vouloir passer un tour?") ){
        Net.emitPass( function(res) {
          alert(res);
        });
      }
    }else{
      alert(`vous n'avez pas de monde sélectionné pour passer un tour.`);
    }

  }


}
