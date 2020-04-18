import {Net} from './net';
import {environment} from '../../environments/environment';

export class Account{

  static user = null ;

  static init(){
    if ( localStorage.getItem("user")){
      Account.user = JSON.parse(localStorage.getItem("user"));
      Account.connectAccount(function(res) {});
    }else{
      Account.user = null ;
    }

  }
  static connectAccount(callBack){
    localStorage.setItem("user", JSON.stringify(Account.user));
    Net.socket.emit('initAccount', Account.user, callBack);
  }

  static create(email, password, pseudo, callBack){

    Net.http.get(`${environment.backURL}/createAccount?email=${email}&password=${password}&pseudo=${pseudo}`).subscribe((res)=>{

      if ( res !== null ){
        Account.user = res ;
        Account.connectAccount(function(connexionRes) {
          callBack(res) ;
        });
      }else{
        callBack(null);
      }


    });

  }

  static login(email, password, callBack){

    Net.http.get(`${environment.backURL}/readAccount?email=${email}&password=${password}`).subscribe((res)=>{

      if ( res !== null ){
        Account.user = res ;
        Account.connectAccount(function(connexionRes) {
          callBack(res) ;
        });
      }else{
        callBack(null);
      }

    });

  }

  static deconnexion(){
    localStorage.removeItem("user");
    Account.user = null ;
  }


  static isAdmin(){
    if ( Account.user !== null && Account.user.admin ){
      return true ;
    }else{
      return false ;
    }
  }

}
