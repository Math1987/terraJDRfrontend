import { Component, OnInit } from '@angular/core';
import {View} from '../../services/world/view/view';
import {Area} from '../../services/world/area';
import {Router} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';
import {Net} from '../../services/net';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

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

        console.log(Area.character);

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

}
