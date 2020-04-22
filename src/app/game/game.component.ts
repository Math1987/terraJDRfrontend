import { Component, OnInit } from '@angular/core';
import {Worlds} from '../services/worlds';
import {Area} from '../services/world/area';
import {View} from '../services/world/view/view';
import {Net} from '../services/net';
import {Characters} from '../services/characters';
import {NavComponent} from '../nav/nav.component';
import {Router} from '@angular/router';
import {Box} from '../services/world/model/box';
import {Controls} from '../services/world/controls/controls';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  static initialized = false ;

  static lastUpdate = new Date().getTime();
  static resources = [] ;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }
  isInitialized(){
    return GameComponent.initialized;
  }

  getWorlds(){
    return Worlds.worlds;
  }
  getWorld(){
    return Area.world ;
  }
  getCharacters(){
    if ( this.getWorld() ){

      let charas = [] ;
      for ( let chara of Characters.characters ){
        if ( chara.world == this.getWorld().name ){
          charas.push(chara);
        }
      }
      return charas ;

    }else{
      return [];
    }
  }
  getCharacter(){
    return Area.character ;
  }

  updates(){
    if ( Box.lastUpdate !== GameComponent.lastUpdate) {


      while(GameComponent.resources.length > 0 ){
        GameComponent.resources.splice(0,1);
      }

      for (let i = 0; i < Object.keys(Area.character).length; i++) {

        let resource = Controls.getRessourceFromKey(Object.keys(Area.character)[i]);
        if ( resource !== null ){
           GameComponent.resources.push({
            key: Object.keys(Area.character)[i],
            nom : resource.nom,
            value: Object.values(Area.character)[i]
          });
        }
      }
      GameComponent.lastUpdate = Box.lastUpdate ;
    }
    return true ;
  }

  getResources(){
    return GameComponent.resources ;
  }

  enterInWorld(world){
    Worlds.enterIn(world, function(res) {

    });
  }
  chooseCharacter(character){

    Area.setCharacter(character);
    this.router.navigate(['u/jeu/carte'] );

  }
  isFocus(world){
    if ( Area.world !== null && world.name === Area.world.name ){
      return true ;
    }else{
      return false ;
    }
  }
  create(){

    const self = this ;

    let name = (document.getElementById("createName") as HTMLInputElement).value ;
    let sexe = null ;
    let race = null ;

    for ( let i = 0 ; i < 2 ; i ++ ){
      if ( document.forms.namedItem("sexe").checker[i].checked==true){
        sexe = document.forms.namedItem("sexe").checker[i].value ;
      }
    }
    for ( let i = 0 ; i < document.forms.namedItem("race").checker.length ; i ++ ){
      if ( document.forms.namedItem("race").checker[i].checked==true){
        race = document.forms.namedItem("race").checker[i].value ;
      }
    }

    if ( name.length > 2 ){
      Net.socket.emit('createUserCharacter', {
        key: "character",
        name: name,
        sexe: sexe,
        race : race
      }, function(createUserCharaRes) {

        Characters.add(createUserCharaRes);
        self.chooseCharacter(createUserCharaRes);

      });
    }else{
      alert('choisi un nom plus long.');
    }

  }

}
