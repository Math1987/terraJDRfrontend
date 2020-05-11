export class Cession{

  static token = null ;

  static openCession(token){
    Cession.token = token ;
  }
  static closeCession(){
    Cession.token = null ;
  }
}
