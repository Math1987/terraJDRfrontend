export class Controls{

  static RESOURCES = [
    {
      key : "life",
      nom : "vie"
    },
    {
      key : "water",
      nom :  "eau"
    },
    {
      key : "food",
      nom :  "nourriture"
    },
    {
      key : "material",
      nom :  "materiel"
    },
    {
      key : "faith",
      nom :  "foi"
    },
    {
      key : "actions",
      nom :  "actions"
    },
    {
      key : "xp",
      nom :  "xp"
    }
  ];
  static INTERACTIONS = [
    {
      key : "attack",
      nom : "attaquer",
      target : "life",
      raceConstraint : "different",
      actions_cost : 1,
      cost : { actions : 1 }
    },
    {
      key: "defense",
      nom : "soigner",
      target : "life",
      raceConstraint : "same",
      cost : { food : 20 }
    }
  ];

  static getResourcesFromObj(obj){
    let resources = [] ;
    for ( let key of Object.keys(obj)){
      let resource = Controls.getRessourceFromKey(key);
      if ( resource ){
        resource.value = obj[key] ;
        resources.push(resource);
      }
    }
    return resources ;
  }
  static getRessourceFromKey(key){
    let res = null ;
    for ( let resource of Controls.RESOURCES ){
      if ( resource.key == key ){
        res = resource;
        break ;
      }
    }
    return res ;
  }

  static getInteractionsBetween(user, target){

    let interaction = {
      user : user,
      target : target,
      resources : Controls.getResourcesFromObj(target),
      actions : []
    } ;
    if ( user.x == target.x && user.y == target.y ) {
      for (let key1 of Object.keys(user)) {
        if (Controls.isInteraction(key1)) {

          for (let key2 of Object.keys(target)) {
            let action = Controls.getInteraction(user, key1, target, key2);
            if (action) {
              interaction.actions.push(action);
            }
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
  static getInteraction(user1, key1, target2, key2){

    let interaction = null ;
    for ( let interact of Controls.INTERACTIONS ){
      if ( interact.key === key1 && interact.target === key2
        && (
          (
            !('raceConstraint' in interact )
            || ((interact.raceConstraint == "same" && user1.race == target2.race)
                || (interact.raceConstraint == "different" && user1.race !== target2.race ))
            )
        )
      ){
        interaction = interact ;
        break ;
      }
    }
    return interaction ;
  }



}
