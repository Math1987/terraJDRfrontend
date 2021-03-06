import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from '../services/account';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Worlds } from '../services/worlds';
import { View } from '../services/world/view/view';
import { Characters } from '../services/characters';
import { Area } from '../services/world/area';
import { Net } from '../services/net';
import { version } from '../../../package.json';
import {GameComponent} from '../game/game.component';

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
export class NavComponent implements OnInit {

  static functionInit = null;
  static initialized = false;

  gameNav = 'carte' ;

  constructor(
    private router: Router
  ) {

    const self = this;

    if (Account.user) {
      self.initPage();
    } else {
      Account.setCallBackInit(function (res) {
        if (Account.user === null) {
          self.router.navigate(['/login']);
        } else {
          self.initPage();
        }

      });
    }


  }
  ngOnInit() {

    const self = this;

    /*let interval = setInterval(function() {

      if ( !Account.user ){
        self.deconnexion();
        clearInterval(interval);
      }

    },100);*/

  }
  static setInitCallBack(callBackFunction) {
    if (NavComponent.initialized) {
      callBackFunction();
    } else {
      NavComponent.functionInit = callBackFunction;
    }
  }

  initPage() {

    const self = this ;

    Worlds.init(function (worlds) {
      Characters.init(function (characters) {
        NavComponent.initialized = true;
        if (NavComponent.functionInit) {
          NavComponent.functionInit();
        }
      });
    });

  }

  getCharacter(){
    if ( Area.character ){
      return true ;
    }else{
      return false ;
    }
  }

  isAdmin() {
    return Account.isAdmin();
  }
  getUserPseudo() {
    if (Account.user !== null && 'pseudo' in Account.user) {
      return Account.user.pseudo;
    } else {
      return '';
    }
  }
  deconnexion() {
    const self = this;
    Net.emitDeconnection(Account.user, function (res) {

      console.log(res);

      Account.deconnexion();
      Area.reset();
      Worlds.reset();
      self.router.navigate(['/login']);

      Net.reset();

    });

  }

  /**
   * Gets version
   * @returns String version
   */
  getVersion() {
    return version;
  }


}
