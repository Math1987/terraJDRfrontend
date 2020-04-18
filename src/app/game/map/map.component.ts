import { Component, OnInit } from '@angular/core';
import {View} from '../../services/world/view/view';
import {Area} from '../../services/world/area';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    View.setCanvasWorld(document.getElementById("worldViewGame") as HTMLCanvasElement) ;

    View.goOn(Area.character.x ,Area.character.y );



  }

}
