import {Box} from '../../model/box';
import {Action} from '../actions/action';
import {Translator} from '../../model/translator/translator';
import {View} from '../../view/view';
import {Input} from '@angular/core';
import {A_bewitch} from '../actions/a_bewitch';
import {Area} from '../../area';

export class Interaction{

  static ID_BUILDER = 0 ;

  static VALUE_KEYS = [
    'life', 'water', 'food', 'material', 'gold','faith', 'vitality', "search", 'religion', 'flame', 'protection', 'blesstree', 'luck'
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
  static buildInteractionsFromView(actualInteractions, user, views){

    /**
     * check all the interactions between the user and the selected view.
     * create a container with all params of eatch objects,
     * then compare new container to actual container and remove, or push objects.
     */

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

       let interaction = Interaction.buildInteraction(user, vs[0].box, vs, finalViews);
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

    function isSameInteraction(interaction1, interaction2){
      if ( interaction1.user.id == interaction2.user.id && interaction1.target.id == interaction2.target.id ){
        return true ;
      }else{
        return false ;
      }
    }

    for ( let i = actualInteractions.length-1 ; i >= 0 ; i -- ){
      let actu = actualInteractions[i] ;
      let mustRemove = true ;
      for ( let newInteraction of tri ){
        if ( isSameInteraction(actu, newInteraction) ){
          mustRemove = false ;
          break ;
        }
      }
      if ( mustRemove ){
        actualInteractions.splice(i,1);
      }
    }

    for ( let newInteraction of tri ){
      let got = false ;
      for ( let actu of actualInteractions ){
        if ( isSameInteraction(actu, newInteraction)){
          got = true ;
        }
      }
      if ( !got ){
        actualInteractions.push(newInteraction);
      }
    }

    return actualInteractions ;

  }
  static buildInteraction(user, target : Box, views : View[], contextViews : View[] ): Interaction {

    let interaction = new Interaction();
    let actions = [];

    for (let key of Object.keys(user)) {
      for (let keyTarget of Object.keys(target)) {
        let newActions = Action.getActionBetween( user, key, target, keyTarget, contextViews);
        if (newActions.length > 0 ) {
          for ( let na of newActions ) {
            let alreadyGot = false;
            for (let act of actions) {
              if (act.readKey() == na.readKey()) {
                alreadyGot = true;
                break;
              }
            }
            if (!alreadyGot) {
              actions.push(na);
            }
          }
        }
      }
    }

    //actions.push(new A_bewitch());

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
      if ( target['items'] ) {
        interaction.items = target['items'] ;
      }

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
  items = [] ;
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
    if (this.target.key == "tree" && "builder" in this.target ){
      return`planté par ${this.target.builder}` ;
    }else if ( "builder" in this.target ){
      return this.target.builder ;
    }else if ( 'race' in this.target ){
      return Translator.translate(this.target.race, 'fr', 'default' ) ;
    }else if ( this.target.key == "trader" ){
      return Translator.translate(this.target.skill, 'fr', "skill") ;
    }else{
      return null ;
    }
  }
  useAction(action){
    action.use(this.user, this.target);
  }
  getPosition(){
    if ( this.target && Area.world ){
      let px = this.target.x- Math.floor(Area.world.width/2);// pos.x - Math.floor(Area.world.width/2);
      let py = -this.target.y+ Math.floor(Area.world.height/2) ;//- pos.y+ Math.floor(Area.world.height/2);

      return {x : py, y: px};
    }else{
      return null ;
    }
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
