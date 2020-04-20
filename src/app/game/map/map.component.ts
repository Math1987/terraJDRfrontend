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

  lastCharacterUpdate = 0 ;
  lastSelectFocusUpdate = 0 ;
  lastValueUpdate = 0 ;
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
        self.lastCharacterUpdate = 0 ;
        self.lastSelectFocusUpdate = 0 ;
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

      if ( Area.lastCharacterUpdate !== this.lastCharacterUpdate ){
        this.actives = Box.getActivesFromObj(Area.character);
      }

      if ( View.lastUpdateFocused !== this.lastSelectFocusUpdate ) {
        this.lastSelectFocusUpdate = View.lastUpdateFocused ;
        this.updateSelection();
      }
      if ( Box.lastUpdateValue !== this.lastValueUpdate ){
        this.lastValueUpdate = Box.lastUpdateValue ;
        this.updateSelection();
      }

    }
    return true ;
  }
  updateSelection(){
    if (View.focused) {
      this.interactions = [] ;
      for (let view of View.focused) {
        if ( view.box.id !== Area.character.id) {

          let interactions = Controls.getInteractionsBetween(Area.character, view.box);
          if (interactions) {
            this.interactions.push(interactions);
          }

        }

      }
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

    if ( this.getActions() > 0 ) {
      Net.socket.emit('action', action.key, {
        user: Area.character,
        target : Area.character
      }, function(res) {

      });
    }else{
      alert(`tu as utilisé toutes tes actions.`);
    }

  }
  useInteraction(interaction, action){

    let canDo = true ;
    console.log(action);
    if ( "cost" in action ){

      for ( let key of Object.keys(action.cost) ){
        if ( interaction.user[key] < action.cost[key] ){
          canDo = false ;
          let resource = Controls.getRessourceFromKey(key);
          alert(`Il te faut au moins ${action.cost[key]} ${resource.nom}`);
        }
      }

    }
    if ( canDo ){
      Net.socket.emit('action', action.key, {
        user : interaction.user,
        target : interaction.target
      }, function(res) {

      });
    }

    if ( 'actions_cost' in action && this.getActions() <= 0 ){
      //alert(`il te faut plus d'actions.`)
    }else{


    }

  }

}
