import {HttpClient} from '@angular/common/http';
import * as io from "socket.io-client" ;
import {environment} from '../../environments/environment';
import {Characters} from './characters';
import {Box} from './world/model/box';
import {Account} from './account';
import {Area} from './world/area';
import {View} from './world/view/view';
import {Worlds} from './worlds';

export class Net{

  static http ;
  static socket ;

  static worldsStatus = false ;

  static headers: {
    'Access-Control-Allow-Origin' : '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  static init(http: HttpClient){
    Net.http = http ;
    Net.socket = io.connect(environment.backURL);
  }
  static deconnection(){
    Net.socket.disconnect();
  }

  static reset(){
    Net.socket.disconnect();
    Net.socket = io.connect(environment.backURL);
  }

  static emitDeconnection(callBack){
    Net.socket.emit('deconnexion', callBack);
  }

  static emitInitAccount(user, callBack){
      Net.socket.emit('initAccount', user, callBack);
  }
  static emitCreateCharacter(json, callBack){
    Net.socket.emit('createUserCharacter', json, callBack);
  }
  static emitReadAccountCharacters(callBack){
    Net.socket.emit('readAccountCharacters', callBack);
  }

  static emitEnterInWorld(world, id, callBack){
    Net.socket.emit('enterInWorld',  world, id, callBack);
  }
  static emitLeaveWorld(callBack){
    Net.socket.emit('getOutOfWorld',callBack);
  }


  static emitReadById(id, callBack){
    if ( Net.socket.connected && Net.worldsStatus ) {
      Net.socket.emit('readById', id, callBack);
    }
  }
  static emitReadByIds(ids, callBack){
    if ( Net.socket.connected && Net.worldsStatus ) {
      Net.socket.emit('readByIds', ids, callBack);
    }
  }
  static emitUpdatePattern(pattern_key, key, value, type, callBack){
    if ( Net.socket.connected && Net.worldsStatus ){
      Net.socket.emit('updatePattern', pattern_key, key, value, type, callBack);
    }
  }
  static emitCreate(json, callBack){
    if ( Net.socket.connected && Net.worldsStatus ) {
      Net.socket.emit('create', json, callBack);
    }
  }
  static emitUpdateValue(id, key, value, callBack){
    if ( Net.socket.connected && Net.worldsStatus ){
      Net.socket.emit('updateValue', id, key, value, callBack);
    }
  }
  static emitUpdateCalculation(name, attribute, value, callBack){
    if ( Net.socket.connected && Net.worldsStatus ) {
      Net.socket.emit('updateCalculation', name, attribute, value, callBack);
    }
  }
  static emitDeleteById(id, callBack){
    if ( Net.socket.connected && Net.worldsStatus ) {
      Net.socket.emit('deleteById', id, callBack);
    }
  }


  static test(key, json, callBack) {
    console.log(key);
    console.log(json);
    Net.socket.emit('action', key, json, callBack);
  }

  static emitAction(key, json, callBack){
    if ( Net.socket.connected && Net.worldsStatus ){
      Net.socket.emit('action', key ,json ,callBack );
    }
  }
  static emitReadPositions(positions, callBack){
    if ( Net.socket.connected && Net.worldsStatus ) {
      Net.socket.emit('readPositions', positions, callBack);
    }
  }
  static emitPass(callBack){
    if ( Net.socket.connected && Net.worldsStatus ) {
      Net.socket.emit('pass', callBack);
    }
  }

}
