import { Component, OnInit } from '@angular/core';
import {View} from '../../services/world/view/view';
import {Area} from '../../services/world/area';
import {Router} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';
import {Net} from '../../services/net';
import {Box} from '../../services/world/model/box';
import {Controls} from '../../services/world/controls/controls';
import {Interaction} from '../../services/world/controls/interactions/interaction';
import {Action} from '../../services/world/controls/actions/action';
import {Worlds} from '../../services/worlds';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lastUpdate = 0 ;
  interactions: any = [] ;

  constructor(
    private router: Router
  ) {

    this.lastUpdate = 0 ;
    this.update();

  }

  ngOnInit() {

    const self = this ;

    const canvas = document.getElementById("worldViewGame") as HTMLCanvasElement ;
    canvas.width = 780 ;
    canvas.height = 780*0.59 ;
    this.lastUpdate = 0 ;
    NavComponent.setInitCallBack(function(worlds) {

      if ( Area.world !== null && Area.character !== null ){

        Worlds.reset();
        View.setCanvasWorld(canvas) ;
        View.setRayon(5);
        View.moveControls = function(x,y, callBack){
          if ( Area.character.mover > 0 ){
            Net.socket.emit('action', 'move', {
              user : Area.character,
              x : x,
              y : y
            }, function(action) {
              if ( action ){
                callBack(null);
              }else{
                callBack(null);
              }
            });
          }else{
            callBack(null);
          }
        };
        View.goOn(Area.character.x ,Area.character.y );
        self.lastUpdate = 0 ;
        self.update();
      }else{
        self.router.navigate(['u/jeu/mondes']);
      }

    });





  }

  getMove(){
    if ( Area.character && 'mover' in Area.character ){
      return Area.character.mover;
    }else{
      return 0 ;
    }
  }

  update(){
    if ( Area.character ) {

      if ( Box.lastUpdate !== this.lastUpdate ){
        this.updateSelection();
        this.lastUpdate = Box.lastUpdate ;
      }

    }
    return true ;
  }
  updateSelection(){

    if (View.focused) {

      let interactions = Interaction.buildInteractionsFromView(Area.character, View.focused) ;

      this.interactions = interactions ;

    }
  }


  getActions(){
    if ( Area.character && "actions" in Area.character ){
      return Area.character.actions ;
    }else{
      return 0 ;
    }
  }
  useActive(action){

    action.use(Area.character, Area.character);

  }
  useInteraction(interaction, action){

    interaction.useAction(action);

  }

}
