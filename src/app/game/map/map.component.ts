import { Component, OnInit } from '@angular/core';
import {View} from '../../services/world/view/view';
import {Area} from '../../services/world/area';
import {Router} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';
import {Net} from '../../services/net';
import {Box} from '../../services/world/model/box';
import {Controls} from '../../services/world/controls/controls';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lastCharacterUpdate = new Date().getTime() ;
  lastSelectFocusUpdate = new Date().getTime() ;
  actives = [] ;
  interactions = [] ;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    const self = this ;

    const canvas = document.getElementById("worldViewGame") as HTMLCanvasElement ;
    canvas.width = 780 ;
    canvas.height = 780*0.59 ;

    NavComponent.setInitCallBack(function(worlds) {

      if ( Area.world !== null && Area.character !== null ){

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

      if ( Area.lastCharacterUpdate !== this.lastCharacterUpdate ){
        this.actives = Box.getActivesFromObj(Area.character);
      }

      if ( View.lastUpdateFocused !== this.lastSelectFocusUpdate ) {
        if (View.focused) {
          this.interactions = [] ;
          for (let view of View.focused) {
            if ( view.box.id !== Area.character.id ) {

              let interactions = Controls.getInteractionsBetween(Area.character, view.box);
              if (interactions && interactions.actions.length > 0) {
                this.interactions.push(interactions);
              }

            }

          }
        }
        this.lastSelectFocusUpdate = View.lastUpdateFocused ;
      }

    }
    return true ;
  }

  getActions(){
    if ( Area.character && "actions" in Area.character ){
      return Area.character.actions ;
    }else{
      return 0 ;
    }
  }
  useActive(action){

    if ( this.getActions() > 0 ) {
      Net.socket.emit('action', action.key, {
        user: Area.character
      }, function(res) {

      });
    }else{
      alert(`tu as utilisé toutes tes actions.`);
    }

  }

}
