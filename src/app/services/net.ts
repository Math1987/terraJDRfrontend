import {HttpClient} from '@angular/common/http';
import * as io from "socket.io-client" ;
import {environment} from '../../environments/environment';

export class Net{

  static http ;
  static socket ;

  static headers: {
    'Access-Control-Allow-Origin' : '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  static init(http: HttpClient){
    Net.http = http ;
    Net.socket = io.connect(environment.backURL);


  }

}
