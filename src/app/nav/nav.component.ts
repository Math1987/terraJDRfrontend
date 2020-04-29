import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../services/account';
import {Router} from '@angular/router';
import {Worlds} from '../services/worlds';
import {View} from '../services/world/view/view';
import {Characters} from '../services/characters';
import {Area} from '../services/world/area';
import {Net} from '../services/net';

/**
 * Nav Component:
 *
 * This is the header of the user e.
 * It manage roots to switch worlds or account
 *
 */

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  static functionInit = null ;
  static initialized = false ;

  constructor(
    private router: Router
  ) {

    const self = this ;

    if ( Account.user ){
      self.initPage();
    }else {
      Account.setCallBackInit(function(res) {
        if (Account.user === null) {
          this.router.navigate(['/login']);
        } else {
          self.initPage();
        }

      });
    }


  }
  ngOnInit() {}
  static setInitCallBack(callBackFunction){
    if ( NavComponent.initialized ){
      callBackFunction();
    }else{
      NavComponent.functionInit = callBackFunction;
    }
  }

  initPage(){

    Worlds.init(function(worlds) {
      Characters.init(function(characters) {
        NavComponent.initialized = true;
        if (NavComponent.functionInit !== null) {
          NavComponent.functionInit();
        }
      });
    });

  }

  isAdmin(){
    return Account.isAdmin();
  }
  getUserPseudo(){
    if ( Account.user !== null && 'pseudo' in Account.user ){
      return Account.user.pseudo ;
    }else{
      return '' ;
    }
  }
  deconnexion(){
    const self = this ;
    Net.emitDeconnection( function(res) {

      Account.deconnexion();
      Area.reset();
      Worlds.reset();
      self.router.navigate(['/login']);

      Net.reset();

    });

  }


}
