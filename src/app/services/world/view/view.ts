import {Area} from '../area';

export class View{

  static canvasWorld = null ;
  static canvasFocus = null ;
  static moveControls = null ;
  static selectFunction = null ;

  static init(){
    View.initRounds();
    View.initDrawer();
  }
  static reset(){}
  static setRayon(rayon){

    if ( View.ROUND_MATRIX !== null ) {

      if (View.ROUNDS !== null) {
        for (let round of View.ROUNDS) {
          while (round.length > 0) {
            round.splice(0, 1);
          }
        }
      }
      if (View.VIEWS !== null) {
        for (let round of View.VIEWS) {
          while (round.length > 0) {
            round.splice(0, 1);
          }
        }
      }

      View.rayon = rayon;
      View.ROUNDS = [];
      View.VIEWS = [];

      for (let rounds of View.ROUND_MATRIX[View.rayon + 1]) {
        View.ROUNDS.push([]);
      }

      for (let view of View.VIEW_MATRIX[View.rayon]) {
        View.VIEWS.push(null);
      }

      for (let r = 0; r < View.ROUND_MATRIX[View.rayon + 1].length; r++) {
        let round = View.ROUND_MATRIX[View.rayon + 1][r];
        for (let v = 0; v < View.VIEW_MATRIX[View.rayon].length; v++) {
          let view = View.VIEW_MATRIX[View.rayon][v];
          if (round.x == view.x && round.y == view.y) {
            View.VIEWS[v] = View.ROUNDS[r];
            break;
          }
        }
      }
    }

  }


  static TIME = {last:0, elapsed:0, animator:0} ;
  private static SRC_IMAGE = './../../../../assets/images';
  static ROUND_MATRIX = null ;
  private static VIEW_MATRIX = null ;
  private static VBOX_MODELS = null ;
  static ROUNDS = null ;
  private static VIEWS = null ;
  private static PATTERNS = null ;
  private static RATIOY = 0.59 ;

  private static x = 0 ;
  private static y = 0 ;
  private static rayon = 5 ;
  private static focused = null ;
  private static draw = null ;


  private static initRounds(){
    View.ROUND_MATRIX = [] ;
    View.VIEW_MATRIX = [] ;

    const RAYON = 20 ;

    const SQUARE_RAYONS  = [] ;

    for ( let r = 0 ; r < RAYON ; r ++ ){
      const SQUARE_RAYON  = [] ;
      for ( let x = - r ; x <= r ; x ++ ){
        let y = - r ;
        SQUARE_RAYON.push({x:x, y:y});
      }
      for ( let y = - r +1 ; y <= r ; y ++ ){
        let x = r ;
        SQUARE_RAYON.push({x:x, y:y});
      }
      for ( let x = r -1 ; x >= -r ; x -- ){
        let y = r ;
        SQUARE_RAYON.push({x:x, y:y});
      }
      for ( let y = r -1 ; y > -r ; y -- ){
        let x = -r ;
        SQUARE_RAYON.push({x:x, y:y});
      }
      SQUARE_RAYONS.push(SQUARE_RAYON);
    }
    View.ROUND_MATRIX = [] ;

    for ( let r = 0 ; r < RAYON ; r ++ ){
      let fullRounds = [] ;
      for ( let rayon = 0 ; rayon < r ; rayon ++ ){
        for ( let round of SQUARE_RAYONS[rayon] ){
          fullRounds.push(round);
        }
      }
      View.ROUND_MATRIX.push(fullRounds);
    }


    View.VIEW_MATRIX = [] ;

    for ( let r = 0 ; r < RAYON ; r ++ ){
      let rounds = [] ;
      for ( let clone of View.ROUND_MATRIX[r]){
        rounds.push(clone);
      }
      let view = [] ;
      while ( rounds.length > 0 ){
        let max = -100000 ;
        let focus = 0 ;
        for ( let i =0 ; i < rounds.length ; i ++ ){
          if ( (-rounds[i].x+r) * (-(rounds[i].y+r)) > max ){
            max = (-rounds[i].x+r) * (-(rounds[i].y+r)) ;
            focus = i ;
          }
        }
        view.push({
          x: rounds[focus].x,
          y: rounds[focus].y
        });
        rounds.splice(focus,1);
      }
      View.VIEW_MATRIX.push(view);
    }
    View.setRayon(View.rayon);

  }
  private static initDrawer(){

    View.TIME.last = new Date().getTime();

    View.draw = function() {
      let actual = new Date().getTime();
      View.TIME.elapsed = (actual-View.TIME.last)/1000 ;
      View.TIME.last = actual ;
      View.TIME.animator += View.TIME.elapsed ;

      if ( View.canvasWorld !== null ){
        View.drawWorld();
        View.drawFocus();
      }

    };

    setInterval(View.draw, 50);
  }
  static move(x:number,y:number){

    View.x += x ;
    View.y += y ;

    let newRounds = [] ;
    for ( let r of View.ROUNDS ){
      newRounds.push(null);
    }

    for ( let r = 0 ; r < View.ROUNDS.length ; r ++ ){
      let round = View.ROUND_MATRIX[View.rayon+1][r] ;
      for ( let nr = 0 ; nr < View.ROUNDS.length ; nr ++ ){
        let newRound = View.ROUND_MATRIX[View.rayon+1][nr] ;
        if (  round.x == newRound.x + x && round.y == newRound.y + y ){
          let newArray = [] ;
          for ( let ar of View.ROUNDS[r] ){
            newArray.push(ar);
          }
          if ( newArray.length > 0 ){
            newRounds[nr] = newArray ;
          }
          break;
        }
      }
    }

    if ( Area.world !== null ) {

      let askPositions = [] ;

      for (let r = 0; r < View.ROUNDS.length; r++) {
        let round = View.ROUND_MATRIX[View.rayon+1][r];
        while (View.ROUNDS[r].length > 0) {
          View.ROUNDS[r].splice(0, 1);
        }
        if (newRounds[r] !== null) {
          for ( let vb of newRounds[r]){
            View.ROUNDS[r].push(vb);
          }
        } else {
          if (round.x + View.x >= 0
            && round.y + View.y >= 0 ){

            askPositions.push({
              x: round.x + View.x,
              y: round.y + View.y
            });

          }
        }
      }
      View.focused = View.ROUNDS[0];
      //Net.socket.emit('readByPositions', Area.world.name, askPositions, function(res) {});
    }

  }
  private static drawWorld(){
    const context = this.canvasWorld.getContext("2d");
    context.clearRect(0,0,this.canvasWorld.width, this.canvasWorld.height );


    context.save();
    context.translate(View.canvasWorld.width/2, View.canvasWorld.height/2);

    let size = View.canvasWorld.width/View.rayon/2 ;

    for ( let z = 0 ; z < 3 ; z ++ ) {
      for (let i = 0; i < View.VIEW_MATRIX[View.rayon].length; i++) {
        let round = View.VIEW_MATRIX[View.rayon][i];
        let vBoxes = View.VIEWS[i];

        let x = round.x * size / 2 + round.y * size * 0.5;
        let y = round.y * size * View.RATIOY / 2 - round.x * size * View.RATIOY / 2;
        context.translate(x, y);

        if (vBoxes !== null) {
          for (let vBox of vBoxes) {

            if ( vBoxes === View.focused && z == 1){
              context.beginPath();
              context.moveTo(size/2,size*0.25*View.RATIOY);
              context.lineTo(0, -size*0.25*View.RATIOY);
              context.lineTo(-size/2,size*0.25*View.RATIOY);
              context.lineTo(0, size*0.75*View.RATIOY);
              context.lineTo(size/2,size*0.25*View.RATIOY);
              context.strokeStyle = "black";
              context.stroke();
            }

            if (vBox !== null && vBox.getZ() == z ) {

              vBox.draw(context, size);

            }
          }
        }
        context.translate(-x, -y);
      }
    }
    context.restore();


  }
  private static drawFocus(){}

  constructor(){}
  draw(context, size){}




}
