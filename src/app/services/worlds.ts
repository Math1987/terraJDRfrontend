import {Net} from './net';
import {environment} from '../../environments/environment';
import {Account} from './account';
import {Area} from './world/area';
import {View} from './world/view/view';
import {Box} from './world/model/box';
import {V_ground} from './world/view/v_ground';
import {V_character} from './world/view/v_character';

export class Worlds{

  static worlds = [] ;

  static init(callBack){

    View.init([
      new V_ground(),
      new V_character()
    ]);

    Net.http.get(`${environment.backURL}/readWorlds`, {responseType:"json", headers: Net.headers}).subscribe((res)=>{

      Worlds.worlds = res ;
      Area.init();
      if ( Area.world !== null ){
        Worlds.enterIn( Area.world, function(enterInRes) {
          callBack(res);
        });
      }else{
        Worlds.enterIn(Worlds.worlds[0], function(enterInRes) {
          callBack(res);
        });
      }

    });

    Net.socket.on('addWorld', function(worldJson) {
      if ( worldJson !== null ){
        Worlds.worlds.push(worldJson);
      }
    });

    Net.socket.on('instructions', function (instructions){

      for ( let instruction of instructions ){
        if ( instruction.key === "add" ){
          Box.adds( instruction.boxes, function(boxes) {
            View.adds(boxes);
          });
        }
      }

    });

  }



  static enterIn(world, callBack){

    console.log('enterIn world');

    if ( Area.world !== null ){

      Worlds.getOut( function(res) {
        Worlds.enterIn(world, callBack);
      });

    }else if (  Area.world === null || world.name !== Area.world.name ){
      Net.socket.emit('enterInWorld',  world, Account.user.id, function(res) {
        if ( res ){
          Area.setWorld(world);
          View.reset();
          callBack(res);
        }
      });

    }

  }
  static getOut(callBack){

    Net.socket.emit('getOutOfWorld', function(getOutRes) {

      Area.leaveWorld() ;
      callBack('done');

    });

  }



}
