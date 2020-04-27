import {Box} from '../../model/box';
import {Action} from '../actions/action';
import {Translator} from '../../model/translator/translator';
import {View} from '../../view/view';
import {Input} from '@angular/core';

export class Interaction{

  static ID_BUILDER = 0 ;

  static VALUE_KEYS = [
    'life', 'water', 'food', 'material', 'vitality'
  ];

  static getValue(key){
    let pattern = null ;
    for ( let val of Interaction.VALUE_KEYS ){
      if ( val == key ){
        pattern = val ;
        break ;
      }
    }
    return pattern ;
  }

  static init(){}
  static buildInteractionsFromView(user, views){

    let interactions = [] ;

    let fusions = [] ;
    let finalViews = [] ;

    for ( let view of views ){
      for ( let view2 of views ){
        if ( view !== view2 && view.fusionWith(view2) ){
          fusions.push([view, view2]);
          finalViews.push([view,view2]);
        }
      }
    }
    for ( let view of views ){
      let fusionned = false ;
      for ( let fus of fusions ){
        for ( let objsFu of fus ){
          if ( objsFu === view ){
            fusionned = true ;
            break ;
          }
        }
      }
      if ( !fusionned ){
        finalViews.push([view]);
      }
    }



    for ( let vs of finalViews ){

       let interaction = Interaction.buildInteraction(user, vs[0].box, vs);
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
  static buildInteraction(user, target : Box, views : View[]): Interaction {

    let interaction = new Interaction();
    let actions = [];

    for (let key of Object.keys(user)) {
      for (let keyTarget of Object.keys(target)) {
        let action = Action.getActionBetween(user, key, target, keyTarget);
        if (action) {
          let alreadyGot = false ;
          for ( let act of actions ){
            if ( act.readKey() == action.readKey() ){
              alreadyGot = true ;
              break ;
            }
          }
          if (!alreadyGot){
            actions.push(action);
          }
        }
      }
    }
    interaction.values = [];
    for (let key of Object.keys(target)) {
      let patternValue = Interaction.getValue(key);
      if (patternValue) {
        interaction.values.push({
          key: key,
          nom: Translator.translate(key, 'fr', 'value'),
          value: target[key]
        });
      }
    }
    if ( actions.length >= 0  ){
      interaction.id = Interaction.ID_BUILDER ++ ;
      interaction.views = views ;
      interaction.user = user;
      interaction.target = target;
      interaction.actions = actions;

    }else{
      interaction = null;
    }

    return interaction ;
  }

  id = 0 ;
  canvas = null ;
  views = null ;
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
      for ( let z = 0 ; z < 3 ; z ++ ){
        for ( let view of this.views){
          if ( view.getZ() == z ){
            view.draw(context, this.canvas.width);
          }
        }
      }


    }

    return true ;
  }


}
