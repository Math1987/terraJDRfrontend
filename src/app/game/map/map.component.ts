import { Component, OnInit } from '@angular/core';
import {View} from '../../services/world/view/view';
import {Area} from '../../services/world/area';
import {Router} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';
import {Net} from '../../services/net';
import {Box} from '../../services/world/model/box';
import {Controls} from '../../services/world/controls/controls';
import {Interaction} from '../../services/world/controls/interactions/interaction';
import {Action} from '../../services/world/controls/actions/action';
import {Worlds} from '../../services/worlds';
import {Translator} from '../../services/world/model/translator/translator';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';
import {MessageComponent} from '../message/message.component';
import {Model} from '../../services/world/model/model';
import {Historic} from '../../services/historic';
import {DialogueService} from '../dialogs/dialogue.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lastUpdate = 0 ;
  interactions: any = [] ;
  caseFocused = null ;
  interactionObjs = [] ;

  updateInterval = null ;

  static viewUpdated = false ;

  constructor(
    private router: Router
  ) {

    View.reset();
    MapComponent.viewUpdated = false ;
    const self = this ;
    NavComponent.setInitCallBack(function(worlds) {

      MessageComponent.init();
    });
  }

  ngOnInit() {

    const self = this ;
    this.updateInterval = setInterval(function() {
      self.update();
    },10);

  }
  static reload(){
    Box.reset();
    View.reset();
    MapComponent.viewUpdated = false ;
  }

  getMove(){
    if ( Area.character && 'mover' in Area.character ){
      return Area.character.mover;
    }else{
      return 0 ;
    }
  }

  updateViewer(){


    const self = this;
    let canvas = document.getElementById("worldViewGame") as HTMLCanvasElement ;
    if ( canvas ) {
      canvas.width = 780;
      canvas.height = 780 * 0.59;
      this.lastUpdate = 0;
      if (Area.world !== null && Area.character !== null) {

        Box.reset();
        View.setCanvasWorld(canvas);
        View.setRayon(5);
        View.canMove = function(x,y){

          let canMove = false ;
          let gotConstraint = false;
          let canGoOut = true ;

          let actuals = View.ROUNDS[0] ;
          for ( let view of actuals ){
            if ( view.box.key == "fortification"
              && view.box.race !== Area.character.race
              && !(Area.character.last_x == Area.character.x + x && Area.character.last_y == Area.character.y + y) ){
              canGoOut = false ;
              break ;
            }
          }
          if ( canGoOut ) {

            let nexts = null;
            for (let i = 0; i < View.ROUND_MATRIX[2].length; i++) {
              if (View.ROUND_MATRIX[2][i].x == x && View.ROUND_MATRIX[2][i].y == y) {
                nexts = View.ROUNDS[i];
                break;
              }
            }

            for (let view of nexts) {
              let obj = view.box;
              if (obj.key == "neutral") {
                canMove = true;
                break;
              } else if (obj.key == 'tree') {
                gotConstraint = true;
                if (Area.character.mover > 1) {
                  canMove = true;
                }
                break;
              } else if (obj.key == 'fortification') {
                gotConstraint = true;
                if ((Area.character.mover > 1 || obj.race == Area.character.race)) {
                  canMove = true;
                }
                break;
              }
            }
            if (!gotConstraint && !canMove && Area.character && Area.character.mover > 0) {
              canMove = true;
            }
          }

          return canMove ;

        }
        View.moveControls = function(x, y, callBack) {
          if ( !DialogueService.open && View.canMove(x,y) ) {



            Net.emitAction('move', {
              user: Area.character,
              x: x,
              y: y
            }, function(action) {
              if (action) {
                callBack(null);
              } else {
                callBack(null);
              }
            });
          } else {
            callBack(null);
          }
        };
        View.goOn(Area.character.x, Area.character.y);
        self.lastUpdate = 0;
        self.update();
      } else {
        self.router.navigate(['u/jeu/mondes']);
      }
    }
  }

  getMoveCost(x,y){
    let cost = 1 ;
    let objs = Box.getByPosition(x,y);
    let gotConstraint = false ;
    for ( let obj of objs ){
      if (obj.key == "neutral") {
        cost = 0;
        break;
      } else if (obj.key == 'tree') {
        gotConstraint = true;
        cost = 2;
        break;
      } else if (obj.key == 'fortification') {
        gotConstraint = true;
        if (( obj.race == Area.character.race)) {
          cost = 0 ;
        }else{
          cost = 2 ;
        }
        break;
      }
    }
    return cost  ;
  }

  update(){

    Historic.check();
    MessageComponent.check();

    if (Area.world && Area.character ) {

      if ( !View.hasCanvasFocused() && Net.socket.connected && Net.worldsStatus && !MapComponent.viewUpdated ){
        MapComponent.viewUpdated = true ;
        this.updateViewer();
      }

      if ( Box.lastUpdate !== this.lastUpdate ){
        this.updateSelection();
        this.lastUpdate = Box.lastUpdate ;
      }
      return true;
    }else{
      return false ;
    }

  }
  updateSelection(){

    if (View.focused) {

      this.interactionObjs = [] ;
      let interactions = Interaction.buildInteractionsFromView(this.interactions, Area.character, View.focused) ;
      for ( let interaction of interactions ){
        if ( Box.isGround(interaction.target.key) ){
          this.caseFocused = interaction;
        }else{
          this.interactionObjs.push(interaction);
        }
      }
      this.interactions = interactions ;

    }
  }
  translate(item, language, type){
    return Translator.translate(item.key, language, type);
  }
  getCharacter(){
    return Area.character ;
  }
  getItemInfos(item){
    let key = "" ;
    for ( let k of Object.keys(item)){
      if ( Box.isResource(k)){
        key = k ;
        break ;
      }
    }
    return Translator.translate(key,'fr', 'default') + ': ' + item[key];
  }

  getActions(){
    if ( Area.character && "actions" in Area.character ){
      return Area.character.actions ;
    }else{
      return 0 ;
    }
  }
  useActive(action){

    action.use(Area.character, Area.character);

  }
  useInteraction(interaction, action){

    interaction.useAction(action);

  }



}
