import {Box} from '../../model/box';
import {Action} from '../actions/action';
import {Translator} from '../../model/translator/translator';
import {View} from '../../view/view';
import {Input} from '@angular/core';

export class Interaction{

  static ID_BUILDER = 0 ;

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
       let interaction = Interaction.buildInteraction(user, view);
       if ( interaction ){
         interactions.push(interaction);
       }
    }

    let tri = [] ;
    for ( let interaction of interactions ){
      if ( interaction.target.id === interaction.user.id ){
        tri.push(interaction);
        break ;
      }
    }
    for ( let interaction of interactions ){
      if ( interaction.target.id !== interaction.user.id ){
        tri.push(interaction);
      }
    }

    return tri ;

  }
  static buildInteraction(user, target : View): Interaction {
    let interaction = null;

    interaction = new Interaction();
    let actions = [];

    for (let key of Object.keys(user)) {
      for (let keyTarget of Object.keys(target.box)) {
        let action = Action.getActionBetween(user, key, target.box, keyTarget);
        if (action) {
          actions.push(action);
        }
      }
    }
    interaction.values = [];
    for (let key of Object.keys(target.box)) {
      let patternValue = Interaction.getValue(key);
      if (patternValue) {
        interaction.values.push({
          key: key,
          nom: patternValue.nom,
          value: target.box[key]
        });
      }
    }

    if ( actions.length >= 0  ){
      interaction.id = Interaction.ID_BUILDER ++ ;
      interaction.view = target ;
      interaction.user = user;
      interaction.target = target.box;
      interaction.actions = actions;
    }else{
      interaction = null;
    }


    return interaction ;
  }

  id = 0 ;
  canvas = null ;
  view = null ;
  user : any = null ;
  target : any = null ;
  actions = [] ;
  values = [] ;
  @Input() InteractionCanvas : HTMLCanvasElement ;

  constructor(){}
  title(){
    if ( 'name' in this.target ){
      return this.target.name ;
    }else{
      return Translator.translate(this.target.key, 'fr', "default") ;
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

  draw(){

    if ( !this.canvas ){
      this.canvas = document.getElementById("" + this.id ) as HTMLCanvasElement ;
    }

    if ( this.canvas ){
      this.canvas.width = 256 ;
      this.canvas.height = 256 ;
      let context = this.canvas.getContext('2d');
      context.translate(this.canvas.width/2, this.canvas.height/2 );
      this.view.draw(context, this.canvas.width);
    }

    return true ;
  }


}
