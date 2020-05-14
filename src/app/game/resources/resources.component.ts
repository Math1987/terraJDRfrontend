import {Component, OnDestroy, OnInit} from '@angular/core';
import {Historic} from '../../services/historic';
import {Box} from '../../services/world/model/box';
import {Area} from '../../services/world/area';
import {Controls} from '../../services/world/controls/controls';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, OnDestroy {

  resources = [] ;

  deplacement : number = 0 ;
  actions : number = 0 ;

  lastUpdate = 0 ;

  updateInterval = null ;

  constructor() { }

  ngOnInit() {
    const self = this ;
    this.updates();
    this.updateInterval = setInterval(function() {
      self.updates();
    }, 100);
  }
  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
  }


  updates(){

    if ( Box.lastUpdate !== this.lastUpdate && Area.character ) {

      this.deplacement = Area.character.mover ;
      this.actions = Area.character.actions ;

      while(this.resources.length > 0 ){
        this.resources.splice(0,1);
      }

      for (let i = 0; i < Object.keys(Area.character).length; i++) {

        let resource = Controls.getRessourceFromKey(Object.keys(Area.character)[i]);
        if ( resource !== null ){
          this.resources.push({
            key: Object.keys(Area.character)[i],
            fr : resource.nom,
            value: Object.values(Area.character)[i]
          });
        }
      }
      this.lastUpdate = Box.lastUpdate ;
    }
    return true ;
  }

}
