import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Net} from './services/net';
import {Account} from './services/account';
import * as $ from 'jquery';
import {MatDialog} from '@angular/material';
import {Dialog} from './services/dialog';
import {Area} from './services/world/area';
import {Worlds} from './services/worlds';
import {Router} from '@angular/router';
import {NavComponent} from './nav/nav.component';
import {Box} from './services/world/model/box';
import {MapComponent} from './game/map/map.component';
import {Calculation} from './services/calculation';
import {Translator} from './services/world/model/translator/translator';
import {T_ground} from './services/world/model/translator/t_ground';
import {T_neutral} from './services/world/model/translator/t_neutral';
import {T_field} from './services/world/model/translator/t_field';
import {T_defense} from './services/world/model/translator/t_defense';
import {T_attack} from './services/world/model/translator/t_attack';
import {T_attack_counter} from './services/world/model/translator/t_attack_counter';
import {T_die} from './services/world/model/translator/t_die';
import {T_heal} from './services/world/model/translator/t_heal';
import {T_getFood} from './services/world/model/translator/t_getFood';
import {T_getWater} from './services/world/model/translator/t_getWater';
import {T_getMaterial} from './services/world/model/translator/t_getMaterial';
import {T_gold} from './services/world/model/translator/t_gold';
import {T_getFaith} from './services/world/model/translator/t_getFaith';
import {T_getResource} from './services/world/model/translator/t_getResource';
import {T_giveResource} from './services/world/model/translator/t_giveResource';
import {T_waterTree} from './services/world/model/translator/t_waterTree';
import {T_search} from './services/world/model/translator/t_search';
import {T_openchest} from './services/world/model/translator/t_openChest';
import {T_bewitch} from './services/world/model/translator/t_bewitch';
import {T_life} from './services/world/model/translator/t_life';
import {T_water} from './services/world/model/translator/t_water';
import {T_food} from './services/world/model/translator/t_food';
import {T_material} from './services/world/model/translator/t_material';
import {T_faith} from './services/world/model/translator/t_faith';
import {T_relic} from './services/world/model/translator/t_relic';
import {T_trade} from './services/world/model/translator/t_trade';
import {T_build} from './services/world/model/translator/t_build';
import {T_trader} from './services/world/model/translator/T_trader';
import {T_mine} from './services/world/model/translator/t_mine';
import {T_spellVision} from './services/world/model/translator/t_spellVision';
import {T_spellRain} from './services/world/model/translator/t_spellRain';
import {T_blesstree} from './services/world/model/translator/t_blesstree';
import {T_luck} from './services/world/model/translator/t_luck';
import {T_plantTree} from './services/world/model/translator/t_plantTree';
import {T_tree} from './services/world/model/translator/T_tree';
import {T_kill} from './services/world/model/translator/t_kill';
import {T_squeleton} from './services/world/model/translator/t_squeleton';
import {T_fortification} from './services/world/model/translator/t_fortification';
import {T_flame} from './services/world/model/translator/t_flame';
import {T_well} from './services/world/model/translator/t_well';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private http: HttpClient,
    private dialog : MatDialog,
    private router : Router
  ){}

  ngOnInit(): void {



    const self = this ;

    Net.init(this.http);
    Translator.init([
      new T_ground(),
      new T_neutral(),
      new T_field(),
      new T_defense(),
      new T_attack(),
      new T_attack_counter(),
      new T_die(),
      new T_heal(),
      new T_getFood(),
      new T_getWater(),
      new T_getFood(),
      new T_getMaterial(),
      new T_gold(),
      new T_getFaith(),
      new T_getResource(),
      new T_giveResource(),
      new T_waterTree(),
      new T_search(),
      new T_openchest(),
      new T_bewitch(),
      new T_life(),
      new T_water(),
      new T_food(),
      new T_material(),
      new T_faith(),
      new T_relic(),
      new T_trade(),
      new T_build(),
      new T_trader(),
      new T_mine(),
      new T_spellVision(),
      new T_spellRain(),
      new T_blesstree(),
      new T_luck(),
      new T_plantTree(),
      new T_tree(),
      new T_kill(),
      new T_squeleton(),
      new T_fortification(),
      new T_flame(),
      new T_well()
    ]);

    Calculation.init();
    Account.init(function(res) {});
    Dialog.init(this.dialog);


    /*Net.socket.on('disconnect', function () {
      alert('test');
      Net.socket.disconnect();
      Account.init(function(res) {
        if ( res ) {

        }else{
          Account.deconnexion();
          self.router.navigate(['login']);
        }
      });

    });*/

    check();

    let status = "connected" ;

    function check(){

      setTimeout(function() {

        if (status == "disconnect") {

          if ( Net.socket.connected ){
            Net.reset();
            Account.init(function(accountInit) {
              Box.reset();
              Worlds.init(function(res) {
                status = "connected";
                if ( res ){
                  MapComponent.reload();
                  check();
                }else{
                  self.router.navigate(['u/jeu']);
                }
              });
            });

          }else{
            console.log()
            check();
          }
          /*let checkStatus = false ;
          Worlds.init(function() {
            checkStatus = true ;
            check();
          });

          setTimeout(function() {
            if ( !checkStatus ){
              alert('erreur de connection');
              self.deconnection();
            }
          }, 2500);*/

        }else{
          if ( !Net.socket.connected ){
            status = "disconnect" ;
            Net.worldsStatus = false ;
            //Net.socket.disconnect();
          }
          check();
        }

      },100);


    }

  }


  deconnection(){

    Net.socket.disconnect();
    Account.deconnexion();
    Area.reset();
    Worlds.reset();
    this.router.navigate(['/login']);
  }
}
