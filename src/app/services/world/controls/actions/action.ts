import {Net} from '../../../net';
import {Translator} from '../../model/translator/translator';
import {View} from '../../view/view';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {Box} from '../../model/box';

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

  static getSpellsFromReligion(religion){
    let spells = [] ;
    for ( let action of Action.ACTIONS ){
      if ( Box.isSpell(action.readKey())
        && ( !('religion' in action) || action['religion'] == religion) ){
        spells.push(action);
      }
    }
    return spells ;
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


  static getActionBetween(user, key1, target, key2, contextViews: View[]){
    let actionFound = null ;
    for ( let action of Action.ACTIONS ){
      if ( action.matchInteraction(user, key1, target, key2, contextViews)){
        actionFound = action ;
        break ;
      }
    }
    return actionFound ;
  }

  constructor(){}
  readKey(){
    return "action";
  }
  getNom(user, target){
    if ( user.id == target.id ){
      return Translator.translate(this.readKey(),"fr", "selfAction" );
    }else{
      return Translator.translate(this.readKey(),"fr", "action" );
    }
  }
  getDefaultName(language){
    return Translator.translate(this.readKey(),language, 'default');
  }
  matchActive(user){
    return true ;
  }
  matchInteraction(user, key1, target, key2, contextViews : View[]){
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
          alert(`il vous faut au moins ${cost.value} ${cost.nom} pour ${this.getNom(user, target)}`);
        }
      }
    }

    if ( canMakeAction ) {
      Net.emitAction(  this.readKey(), {
        user: user,
        target: target
      }, function(res) {

      });
    }

  }

}
