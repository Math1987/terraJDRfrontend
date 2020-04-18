import {Net} from './net';
import {environment} from '../../environments/environment';
import {Box} from './world/model/box';
import {View} from './world/view/view';
import {Account} from './account';

export class Characters{

  static characters = [] ;

  static init(callBack){

    Net.socket.emit('readAccountCharacters', function(res) {
      Characters.characters = res ;
      callBack(res);
    });

  }
  static add(jsonCharacter){
    Characters.characters.push(jsonCharacter);
  }

}
