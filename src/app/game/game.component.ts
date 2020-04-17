import { Component, OnInit } from '@angular/core';
import {Worlds} from '../services/worlds';
import {Area} from '../services/world/area';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
