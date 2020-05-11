import {Net} from './net';
import {environment} from '../../environments/environment';

export class Account{

  static user = null ;
  static callBackInit = null ;
  static initialisez = false ;

  static init(callBack){
    Account.initialisez = false ;
    if ( localStorage.getItem("user")){
      Account.user = JSON.parse(localStorage.getItem("user"));
      Account.connectAccount(JSON.parse(localStorage.getItem("user")),function(res) {

        if ( Account.callBackInit ){
          Account.callBackInit(res);
          Account.initialisez = true ;
        }
        callBack('done');

      });
    }else{
      Account.user = null ;
      if ( Account.callBackInit ){
        Account.callBackInit(null);
        Account.initialisez = true ;
      }
    }

  }
  static connectAccount(user, callBack){
    Account.user = user ;
    Net.emitInitAccount(Account.user, function(connectionRes) {
      if ( connectionRes ){
        localStorage.setItem("user", JSON.stringify(Account.user));
      }else{
        Account.deconnexion();
      }
      callBack(connectionRes);
    });
  }
  static setCallBackInit(callBack){
    if ( Account.initialisez ){
      callBack('done');
    }else{
      Account.callBackInit = callBack ;
    }
  }

  static create(email, password, pseudo, callBack){

    Net.http.get(`${environment.backURL}/createAccount?email=${email}&password=${password}&pseudo=${pseudo}`).subscribe((res)=>{

      if ( res !== null ){
        Account.connectAccount(res, function(connexionRes) {
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
        Account.connectAccount(res,function(connexionRes) {
          callBack(res) ;
        });
      }else{
        callBack(null);
      }

    });

  }

  static deconnexion(){
    localStorage.removeItem("user");
    localStorage.removeItem("world");
    localStorage.removeItem("character");
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
