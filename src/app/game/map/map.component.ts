import { Component, OnInit } from '@angular/core';
import {View} from '../../services/world/view/view';
import {Area} from '../../services/world/area';
import {Router} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';

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


    const canvas = document.getElementById("worldViewGame") as HTMLCanvasElement ;
    canvas.width = 780 ;
    canvas.height = 780*0.59 ;

    NavComponent.setInitCallBack(function(worlds) {

      if ( Area.world !== null && Area.character !== null ){
        View.setCanvasWorld(canvas) ;

        View.moveControls = function(x,y, callBack){
          callBack(null);
        };
        View.goOn(Area.character.x ,Area.character.y );
      }else{
        this.router.navigate(['u/jeu/mondes']);
      }

    });





  }

  getMove(){
    return 0 ;
  }

}
