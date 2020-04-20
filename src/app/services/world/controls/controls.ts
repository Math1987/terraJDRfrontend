export class Controls{

  static INTERACTIONS = [
    {
      key : "attack",
      nom : "attaquer",
      target : "life"
    },
    {
      key: "defense",
      nom : "soigner",
      target : "life"
    }
  ];

  static getInteractionsBetween(user, target){

    let interaction = {
      user : user,
      target : target,
      actions : []
    } ;
    for ( let key1 of Object.keys(user)){
      if ( Controls.isInteraction(key1) ) {

        for (let key2 of Object.keys(target)) {
          let action = Controls.getInteraction(key1, key2); ;
          if ( action ){
            interaction.actions.push(action);
          }
        }
      }
    }
    return interaction ;
  }
  static isInteraction(key){
    let interact = false ;
    for ( let interaction of Controls.INTERACTIONS ){
      if ( interaction.key == key ){
        interact = true ;
        break ;
      }
    }
    return interact ;
  }
  static getInteraction(key1, key2){

    let interaction = null ;
    for ( let interact of Controls.INTERACTIONS ){
      if ( interact.key === key1 && interact.target === key2 ){
        interaction = interact ;
        break ;
      }
    }
    return interaction ;
  }



}
