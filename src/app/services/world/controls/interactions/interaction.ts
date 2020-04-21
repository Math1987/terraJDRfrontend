import {Box} from '../../model/box';
import {Action} from '../actions/action';
import {Translator} from '../../model/translator';

export class Interaction{

  static INTERACTIONS = [];

  static VALUE_KEYS = [
    {
      key: 'life',
      nom : "vie"
    }
  ];

  static getValue(key){
    let pattern = null ;
    for ( let patternValue of Interaction.VALUE_KEYS ){
      if ( patternValue.key == key ){
        pattern = patternValue ;
        break ;
      }
    }
    return pattern ;
  }

  static init(){}
  static buildInteractionsFromView(user, views){

    let interactions = [] ;
    for ( let view of views ){
       let interaction = Interaction.buildInteraction(user, view.box);
       if ( interaction ){
         interactions.push(interaction);
       }
    }
    return interactions ;

  }
  static buildInteraction(user, target): Interaction {
    let interaction = null;

    if ( user.id !== target.id ) {
      interaction = new Interaction();
      let actions = [];

      for (let key of Object.keys(user)) {
        for (let keyTarget of Object.keys(target)) {
          let action = Action.getActionBetween(user, key, target, keyTarget);
          if (action) {
            actions.push(action);
          }
        }
      }
      interaction.values = [];
      for (let key of Object.keys(target)) {
        let patternValue = Interaction.getValue(key);
        if (patternValue) {
          interaction.values.push({
            key: key,
            nom: patternValue.nom,
            value: target[key]
          });
        }
      }

      if ( actions.length >= 0  ){
        interaction.user = user;
        interaction.target = target;
        interaction.actions = actions;
      }else{
        interaction = null;
      }


    }

    return interaction ;
  }


  user : any = null ;
  target : any = null ;
  actions = [] ;
  values = [] ;

  constructor(){}
  title(){
    if ( 'name' in this.target ){
      return this.target.name ;
    }else{
      return this.target.key ;
    }
  }
  subTitle(){
    if ( 'race' in this.target ){
      return Translator.translate(this.target.race, 'fr', 'default' ) ;
    }else{
      return null ;
    }
  }
  useAction(action){
    action.use(this.user, this.target);
  }


}
