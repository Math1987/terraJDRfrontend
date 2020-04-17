import {Net} from './net';

export class Worlds{


  static init(){

    console.log('init worlds');

    Net.socket.on('addWorld', function(worldJson) {
      console.log('a word is added');
    });

  }


}
