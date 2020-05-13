import { Component, OnInit } from '@angular/core';
import {Net} from '../../services/net';
import {environment} from '../../../environments/environment';
import {Area} from '../../services/world/area';
import {NavComponent} from '../../nav/nav.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  users = [];

  constructor() { }

  ngOnInit() {

    const self = this ;

    NavComponent.setInitCallBack(function() {

      console.log(Area.world);

      Net.http.get(`${environment.backURL}/readAllHistoric?world=${Area.world.name}`, {responseType: 'json', headers : Net.headers}).subscribe((res)=>{

        let tourMiliseconds = 43200000 ;

        let actualTime = new Date().getTime();
        let firstTime = actualTime - Area.world.pass*tourMiliseconds ;

        let finalArray = [] ;

        for ( let row of res ){

          let tour = Math.round((new Date(row.date).getTime() - firstTime)/tourMiliseconds) ;
          row.pass = tour ;
          console.log(tour);

        }

        console.log(res);
        self.users = res ;

      });

    });


  }


  getUsers(){
    return this.users ;
  }

}
