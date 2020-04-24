import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Net} from '../../services/net';
import {Area} from '../../services/world/area';
import {Router} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  list = [] ;

  martyrs = [] ;
  killer = [] ;

  constructor(
    private router : Router
  ) {
    this.update();
  }

  ngOnInit() {
    //this.router.navigate(['u/jeu/classement/martyr']);

    const self = this ;
    NavComponent.functionInit = function() {
      self.update();
    };

  }

  update(){

    const self = this ;

    if ( Area.world ) {
      Net.http.get(`${environment.backURL}/rank?world=${Area.world.name}&key=death`, {
        responseType: "json",
        headers: Net.headers
      }).subscribe((res) => {

        self.martyrs = res ;

      });
      Net.http.get(`${environment.backURL}/rank?world=${Area.world.name}&key=kill`, {
        responseType: "json",
        headers: Net.headers
      }).subscribe((res) => {

        self.killer = res ;

      });
    }

  }


}
