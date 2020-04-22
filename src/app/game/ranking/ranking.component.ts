import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Net} from '../../services/net';
import {Area} from '../../services/world/area';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  list = [] ;

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
    this.router.navigate(['u/jeu/classement/martyr']);
  }


}
