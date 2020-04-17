import {Net} from './net';
import {environment} from '../../environments/environment';
import {Account} from './account';
import {Area} from './world/area';

export class Worlds{

  static worlds = [] ;

  static init(callBack){

    Net.http.get(`${environment.backURL}/readWorlds`, {responseType:"json", headers: Net.headers}).subscribe((res)=>{

      Worlds.worlds = res ;
      callBack(res);

    });

    Net.socket.on('addWorld', function(worldJson) {
      if ( worldJson !== null ){
        Worlds.worlds.push(worldJson);
      }
    });

  }


  static enterIn(world, callBack){

    if ( Area.world !== null && Area.world.name !== world.name ){

      Worlds.getOut( function(res) {
        Worlds.enterIn(world, callBack);
      });

    }else if (  Area.world === null || world.name !== Area.world.name ){
      Net.socket.emit('enterInWorld',  world, Account.user.id, function(res) {
        if ( res ){
          Area.world = world ;

          callBack(res);
        }
      });
    }

  }
  static getOut(callBack){

    Net.socket.emit('getOutOfWorld', function(getOutRes) {

      Area.world = null ;
      callBack('done');

    });

  }



}
