import {Net} from './net';
import {environment} from '../../environments/environment';
import {Account} from './account';
import {Area} from './world/area';
import {View} from './world/view/view';
import {Box} from './world/model/box';
import {V_ground} from './world/view/v_ground';
import {V_character} from './world/view/v_character';
import {V_neutral} from './world/view/v_neutral';
import {V_squeleton} from './world/view/v_squeleton';
import {Controls} from './world/controls/controls';
import {Model} from './world/model/model';
import {V_field} from './world/view/v_field';
import {V_well} from './world/view/v_well';
import {V_tree} from './world/view/v_tree';
import {V_temple} from './world/view/v_temple';
import {V_mine} from './world/view/v_mine';
import {V_trader} from './world/view/v_trader';
import {V_chest} from './world/view/v_chest';
import {V_fortification} from './world/view/v_fortification';

export class Worlds{


  static worlds = [] ;

  static init(callBack){

    Net.worldsStatus = false ;

    Model.init();
    View.init([
      new V_ground(),
      new V_neutral(),
      new V_character(),
      new V_squeleton(),
      new V_field(),
      new V_well(),
      new V_tree(),
      new V_temple(),
      new V_fortification(),
      new V_mine(),
      new V_chest(),
      new V_trader()
    ]);
    Controls.init();

    Worlds.worlds = [] ;

    setTimeout(function() {
      if ( Worlds.worlds.length <= 0 ){
        callBack(null);
      }
    },2000 );

    Net.http.get(`${environment.backURL}/readWorlds`, {responseType:"json", headers: Net.headers}).subscribe((res)=>{
      Worlds.worlds = res ;
      Area.init(Worlds.worlds, function(areaRes) {

        if ( Area.world !== null ){
          Worlds.enterIn( Area.world, function(enterInRes) {
            if ( res ){
              Net.worldsStatus = true ;
            }else{
              Net.worldsStatus = false ;
            }
            callBack(res);
          });
        }else{
          Worlds.enterIn(Worlds.worlds[0], function(enterInRes) {
            if ( res ){
              Net.worldsStatus = true ;
            }else{
              Net.worldsStatus = false ;
            }
            callBack(res);
          });
        }
      });


    });

    Net.socket.on('addWorld', function(worldJson) {
      if ( worldJson !== null ){
        Worlds.worlds.push(worldJson);
      }
    });
    Net.socket.on('pass', function(world) {
      for ( let w of Worlds.worlds ){
        if ( w.name == world.name ){
          w.pass = world.pass ;
          Area.updateWorld(world);
        }
      }
    });

    Net.socket.on('instructions', function (instructions){

      for ( let instruction of instructions ){
        if ( instruction.key === "add" ){
          Box.adds( instruction.boxes, function(boxes) {
            View.adds(boxes);
          });
        }else if ( instruction.key === "addItem" ){

          Area.addItem( instruction );
          Box.addItem( instruction );

        }else if ( instruction.key === "updateValues" ){

          Area.updateValues( instruction.array);
          Box.updateValues( instruction.array);

        }else if ( instruction.key === "updatePositions"){

          Area.updatePositions(instruction.array);
          Box.updatePositions( instruction.array, function(res) {
            View.updatePositions(res);
          });
        }else if ( instruction.key === "delete"){

          Box.removeByIds(instruction.array);
          View.removeByIds(instruction.array);

        }
      }
      Box.lastUpdate = new Date().getTime();



    });

  }

  static reset(){
    Box.reset();
    View.reset();
  }

  static enterIn(world, callBack){
    Net.emitEnterInWorld( world, Account.user.id, function(res) {
      if ( res ){
        Area.setWorld(world);
        View.reset();
        callBack(res);
      }else{
        callBack(null);
      }
    });

  }
  static getOut(callBack){

    Net.emitLeaveWorld(function(getOutRes) {

      Area.leaveWorld() ;
      callBack('done');

    });

  }



}
