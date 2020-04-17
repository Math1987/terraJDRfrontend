import {Net} from './net';
import {environment} from '../../environments/environment';

export class Account{

  static user = null ;

  static init(){
    if ( localStorage.getItem("user")){
      Account.user = JSON.parse(localStorage.getItem("user"));
    }else{
      Account.user = null ;
    }

  }

  static create(email, password, pseudo, callBack){

    Net.http.get(`${environment.backURL}/createAccount?email=${email}&password=${password}&pseudo=${pseudo}`).subscribe((res)=>{

      console.log(res);
      if ( res !== null ){
        localStorage.setItem("user", JSON.stringify(res));
        Account.user = res ;
      }
      callBack(res) ;

    });

  }

  static login(email, password, callBack){

    Net.http.get(`${environment.backURL}/readAccount?email=${email}&password=${password}`).subscribe((res)=>{

      if ( res !== null ){
        localStorage.setItem("user", JSON.stringify(res));
        Account.user = res ;
      }
      callBack(res) ;

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
