import {Net} from '../../../net';

export class Action{

  static ACTIONS = [];

  static init(actions){
    Action.ACTIONS = actions;
  }

  static getActiveFromKey(key){
    let res = null ;
    for ( let action of Action.ACTIONS ){
      if ( action.readKey() == key && action.isActive() ){
        res = action;
        break ;
      }
    }
    return res ;
  }
  static getActionsFromObj(obj){
    let actions = [] ;
    for ( let key of Object.keys(obj) ){
      let action = Action.getActiveFromKey( key );
      if ( action && action.matchActive(obj)){
        actions.push(action);
      }
    }
    return actions ;
  }


  static getActionBetween(user, key1, target, key2){
    let actionFound = null ;
    for ( let action of Action.ACTIONS ){
      if ( action.matchInteraction(user, key1, target, key2)){
        actionFound = action ;
      }
    }
    return actionFound ;
  }

  constructor(){}
  readKey(){
    return "action";
  }
  getNom(){
    return 'action';
  }
  getActiveNom(){
    return this.getNom();
  }
  matchActive(user){
    return true ;
  }
  matchInteraction(user, key1, target, key2){
    return false ;
  }
  isActive(){
    return false ;
  }
  getCosts(){
    return [] ;
  }

  use(user, target){

    let canMakeAction = true ;
    for ( let cost of this.getCosts() ){
      for ( let key of Object.keys(user) ){
        if ( cost.key == key && user[key] < cost.value ){
          canMakeAction = false ;
          alert(`il vous faut au moins ${cost.value} ${cost.nom} pour ${this.getNom()}`);
        }
      }
    }

    if ( canMakeAction ) {
      Net.socket.emit('action', this.readKey(), {
        user: user,
        target: target
      }, function(res) {

      });
    }

  }

}
