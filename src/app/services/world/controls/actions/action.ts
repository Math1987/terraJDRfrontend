import {Net} from '../../../net';
import {Translator} from '../../model/translator/translator';
import {View} from '../../view/view';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {Box} from '../../model/box';
import {Calculation} from '../../../calculation';
import {Area} from '../../area';

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

  static getSpells(){
    let spells = [] ;
    for ( let action of Action.ACTIONS ){
      if ( Box.isSpell(action.readKey()) ){
        spells.push(action);
      }
    }
    return spells ;
  }

  static getSpellsFrom(user, target){
    let spells = [] ;
    for ( let action of Action.ACTIONS ){
      if ( Box.isSpell(action.readKey() )
        && ( action.isCompatibleAsReligion(user, target)) ){
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
    let actions = [] ;
    for ( let action of Action.ACTIONS ){
      if ( action.matchInteraction(user, key1, target, key2, contextViews)){
        actions.push(action) ;
      }
    }
    return actions ;
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
  faithCost(): number {
    let val = 0 ;
    let calculs = Calculation.get(this.readKey());
    if ( calculs ){
      val = calculs.faith_cost + calculs.faith_adder* Area.character[this.readKey()] ;
    }
    return val;
  }
  isCompatibleAsReligion(user, target){
    const self = this ;


    if ( user.x == target.x && user.y == target.y && user.faith >= this.faithCost() ) {
      let json = {spellTargets: []};
      delete json['spellTargets'];
      if (self['spellTargets']) {
        json.spellTargets = self['spellTargets'];
      }
      for (let key of Object.keys(self)) {
        json[key] = self[key];
      }


      if ('religions' in self) {
        let bool = false;

        for (let i = 0; i < Object.keys(json).length; i++) {
          let key = Object.keys(json)[i];
          if (Array.isArray(json[key])) {
            for (let val of json[key]) {
              if (user.religion == val) {
                if ('spellTargets' in json && Array.isArray(json.spellTargets)) {

                  let sepllT = false;
                  for (let spellT of json.spellTargets) {
                    if (spellT == target.key) {
                      sepllT = true;
                    }
                  }
                  if (sepllT) {
                    bool = true;
                    break;
                  }

                } else {
                  bool = true;
                }

                break;
              }
            }
          }
        }

        return bool;
      } else {

        let bool = false;
        if (json.spellTargets) {

          let sepllT = false;
          for (let spellT of json.spellTargets) {
            if (spellT == target.key) {
              sepllT = true;
            }
          }
          if (sepllT) {
            bool = true;
          }

        } else {
          bool = true;
        }
        return bool;
      }
      return true;
    }else{
      return false ;
    }
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
