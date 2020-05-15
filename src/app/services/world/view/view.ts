import {Area} from '../area';
import {Net} from '../../net' ;
import {B_mover} from './view_mover';
import {Box} from './../model/box';
import {DialogueService} from '../../../game/dialogs/dialogue.service';

export class View{

  private static canvasWorld = null ;
  static canvasFocus = null ;
  static moveControls = null ;
  static canMove = null ;
  static selectFunction = null ;
  static focused = null ;

  static init(patterns){
    if ( View.PATTERNS === null || View.PATTERNS.length <= 0 ){
      View.PATTERNS = patterns ;
      View.initRounds();
      View.initDrawer();
      View.initControls();
      View.initSelection();
    }

    for ( let pattern of View.PATTERNS ){
      pattern.init_();
    }
  }
  static reset(){
    View.canvasWorld = null ;
    View.x = 0 ;
    View.y = 0 ;
    View.setRayon(View.rayon);
  }
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
  static setCanvasWorld(canvas){
    View.canvasWorld = canvas ;
  }
  static hasCanvasFocused(){
    if ( View.canvasWorld ){
      return true ;
    }else{
      return false ;
    }
  }
  static goOn(x,y){
    if ( Area.world !== null ) {
      let newX = Math.max(0, Math.min(Area.world.width - 1, x));
      let newY = Math.max(0, Math.min(Area.world.height - 1, y));
      View.move(newX - View.x, newY - View.y);
    }
  }
  static isIn(x,y){
    let got = false ;
    for ( let round of View.ROUND_MATRIX[View.rayon+1] ){
      if ( round.x + View.x == x && round.y + View.y == y ){
        got = true ;
      }
    }
    return got ;
  }
  static adds(boxes){

    let delet = [] ;
    for ( let b of Box.BOXES){
      delet.push(b);
    }
    for ( let r = 0 ; r < View.ROUND_MATRIX[View.rayon+1].length ; r ++ ) {
      let round = View.ROUND_MATRIX[View.rayon+1][r] ;
      for (let box of boxes) {
        if ('x' in box && 'y' in box
          &&  box.x - View.x == round.x && box.y - View.y === round.y ) {

          let vBox = View.build(box);
          if ( vBox !== null ){
            View.ROUNDS[r].push(vBox);
          }

        }
      }
      for ( let i = delet.length-1 ; i >= 0 ; i -- ){
        let delBox = delet[i];
        if ( 'x' in delBox && 'y' in delBox && delBox.x == (View.x + round.x) && delBox.y == (View.y + round.y)){
          delet.splice(i,1);
        }
      }
    }

    View.focusBox(View.ROUNDS[0]);
    for ( let delBox of delet ){
      Box.removeByPosition(delBox.x, delBox.y);
    }
    View.checkCanMove();

  }
  static updatePositions(boxes){

    for ( let target of boxes ) {

      if ( 'state' in target && target.state == "notfound" ){
        if ( View.isIn(target.x, target.y) ) {
          Net.emitReadById( target.id, function(obj) {
            if (obj !== null) {
              Box.adds([obj], function(viewAdds) {
                View.adds(viewAdds);
              });
            }
          });
        }

      }else {

        let view = View.getById(target.id);
        View.removeById(target.id);

        if ( !View.isIn(target.x,target.y) ){
          if (Area.character !== null && target.id == Area.character.id) {
            View.move(Area.character.x - View.x, Area.character.y - View.y);
          }else{
            Box.removeById(target.id);
          }
        }else {

          if (view !== null) {

            if (Area.character !== null && target.id == Area.character.id) {
              View.move(Area.character.x - View.x, Area.character.y - View.y);
              View.ROUNDS[0].push(view);
            } else {
              let found = false;
              for (let r = 0; r < View.ROUND_MATRIX[View.rayon + 1].length; r++) {
                let round = View.ROUND_MATRIX[View.rayon + 1][r];
                let px = View.x + round.x;
                let py = View.y + round.y;
                if (px == view.box.x && py == view.box.y) {
                  View.ROUNDS[r].push(view);
                  found = true;
                }
              }
              if (!found) {
                View.removeById(target.id);
              }
            }
          }
        }
      }
    }

  }
  static updateValues(updates){
    for ( let update of updates ) {
      for (let round of View.ROUNDS) {
        for (let view of round) {
          if (view.box.id == update.id) {
            view.box = Box.readById(update.id);
          }
        }
      }
    }
  }
  static build(box){
    let pattern = null ;
    for ( let pat of View.PATTERNS ){
      if ( pat.readKey() === box.key ){
        pattern = pat.createInstance(box) ;
      }
    }
    return pattern ;
  }

  static getById(id){
    let vBoxReturn = null ;
    for ( let rounds of View.ROUNDS ){
      let view = View.getByIdFromArray(id, rounds) ;
      if ( view !== null ){
        vBoxReturn = view ;
        break ;
      }
    }
    return vBoxReturn ;
  }
  static getByIdFromArray(id, array){
    let vBoxReturn = null ;
    for ( let view of array ){
      if ( view !== null ) {
        if (view.box.id == id) {
          vBoxReturn = view;
          break ;
        } else {
          vBoxReturn = null ;// View.getByIdFromArray(id, view.vBoxes);
          if (vBoxReturn !== null) {
            break;
          }
        }
      }
    }
    return vBoxReturn ;
  }
  static getFocusedPosition(){
    let position = {
      x : 0,
      y : 0
    };
    if ( View.focused ){
      for ( let obj of View.focused ){
        if ( 'x' in obj.box ){
          position.x = obj.box.x ;
          position.y = obj.box.y ;
        }
      }
    }
    return position ;
  }
  static removeById(id){

    for ( let rounds of View.ROUNDS  ){
      for ( let i = rounds.length-1 ; i >= 0 ; i -- ){
        if ( rounds[i].box.id == id ){
          rounds.splice(i,1);
        }
      }
    }

  }
  static removeByIds(ids){
    for ( let id of ids  ){
      View.removeById(id);
    }
  }

  static TIME = {last:0, elapsed:0, animator:0} ;
  protected static SRC_IMAGE = './../../../../assets/images';
  static ROUND_MATRIX = null ;
  static VIEW_MATRIX = null ;
  static ROUNDS = null ;
  protected static VIEWS = null ;
  protected static PATTERNS = null ;
  protected static RATIOY = 0.59 ;

  private static moverTopLeft: B_mover = null;
  private static moverToRight: B_mover = null ;
  private static moverBottomRight: B_mover = null ;
  private static moverBottomLeft: B_mover = null ;
  private static selectPosition = null ;

  protected static x = 0 ;
  protected static y = 0 ;
  protected static rayon = 5 ;
  private static draw = null ;
  private static canMoveTopLeft = true ;
  private static canMoveTopRight = true ;
  private static canMoveBottomRight = true ;
  private static canMoveBootomLeft = true ;

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
  private static initControls(){

    const self = this ;

    function moveHere(x,y){
      if ( self.moveControls !== null ){
        self.moveControls(x,y, function(res) {
          if ( res !== null ){
            self.move(x,y);
          }
        });
      }else{
        self.move(x,y);
      }
    }
    View.moverTopLeft = new B_mover("+1x",-Math.PI / 4, function() {
      moveHere(0,-1);
    }) ;
    View.moverToRight = new B_mover("+1y",Math.PI / 4, function() {
      moveHere(1,0);
    }) ;
    View.moverBottomRight  = new B_mover("-1x",Math.PI * 0.75, function() {
      moveHere(0,1);
    }) ;
    View.moverBottomLeft  = new B_mover("-1y",-Math.PI * 0.75, function() {
      moveHere(-1,0);
    }) ;

  }
  private static initSelection(){

    const self = this ;

    View.selectPosition = function(event) {


      if ( self.canvasWorld !== null &&  !DialogueService.open ){
        let px = event.clientX - self.canvasWorld.getBoundingClientRect().left ;
        let py = event.clientY - self.canvasWorld.getBoundingClientRect().top ;


        if ( px >= 0 && px <= self.canvasWorld.clientWidth + 10000
          && py >= 0 && py <= self.canvasWorld.clientHeight + 10000 ) {

          let size = View.canvasWorld.clientWidth / View.rayon / 2;

          let caseX = Math.floor(((px - View.canvasWorld.clientWidth / 2) / size + 0.5) - (py - View.canvasWorld.clientHeight / 2) / size / View.RATIOY);
          let caseY = Math.floor((py - View.canvasWorld.clientHeight / 2) / size / View.RATIOY + ((px - View.canvasWorld.clientWidth / 2) / size + 0.5));

          for (let i = 0; i < View.VIEWS.length; i++) {
            let view = View.VIEW_MATRIX[View.rayon][i];
            if (view.x == caseX && view.y == caseY) {
              View.focusBox(View.VIEWS[i]);
              break ;
            }
          }

        }
      }
    };
    document.addEventListener('mousedown', View.selectPosition);

  }
  private static move(x:number,y:number){

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
      View.focusBox(View.ROUNDS[0]);
      if ( askPositions.length > 0 ){
        Net.emitReadPositions(askPositions, function(res) {});
      }
      View.checkCanMove();
    }

  }
  private static focusBox(focused){
    View.focused = focused ;
    if ( this.selectFunction !== null ){
      this.selectFunction(focused);
    }
    Box.lastUpdate = new Date().getTime();
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

    if ( Area.world && View.focused ){
      let pos = View.getFocusedPosition();
      context.fillStyle = "gray";
      context.textAlign = "left" ;
      context.font = `${size*0.5}px Arial`;

      let px = View.x- Math.floor(Area.world.width/2);// pos.x - Math.floor(Area.world.width/2);
      let py = -View.y+ Math.floor(Area.world.height/2) ;//- pos.y+ Math.floor(Area.world.height/2);

      context.fillText(`${py}x,${px}y`, size*1.8,size*0.5);
    }


    size*=0.75;

    if ( View.canMoveTopLeft ){
      View.moverTopLeft.draw(View.canvasWorld, 0, 0, size, size, {style:"white"});
    }
    if ( View.canMoveTopRight ) {
      View.moverToRight.draw(View.canvasWorld, View.canvasWorld.width - size * 2, 0, size, size, {style: "white"});
    }
    if ( View.canMoveBootomLeft ) {
      View.moverBottomLeft.draw(View.canvasWorld, 0, View.canvasWorld.height - size * 2, size, size, {style: "white"});
    }
    if ( View.canMoveBottomRight ) {
      View.moverBottomRight.draw(View.canvasWorld, View.canvasWorld.width - size * 2, View.canvasWorld.height - size * 2, size, size, {style: "white"});
    }


  }
  private static drawFocus(){}
  static checkCanMove(){
    if ( View.canMove === null || View.canMove(0,-1) ){
      View.canMoveTopLeft = true ;
    }else{
      View.canMoveTopLeft = false ;
    }
    if ( View.canMove === null || View.canMove(1, 0) ) {
      View.canMoveTopRight = true ;
    }else{
      View.canMoveTopRight = false ;
    }
    if ( View.canMove === null || View.canMove(-1,0) ) {
      View.canMoveBootomLeft = true ;
    }else{
      View.canMoveBootomLeft = false ;
    }
    if ( View.canMove === null || View.canMove(0,1) ) {
      View.canMoveBottomRight = true ;
    }else{
      View.canMoveBottomRight = false ;
    }
  }


  box ;

  constructor(){}
  createInstance(box:Box){
    let instance = new View();
    instance.box = box ;
    return instance ;
  }
  init_(){}
  fusionWith(view: View){
    return false ;
  }
  draw(context, size){
    if ( this.getImage() !== null ){
      context.drawImage(this.getImage(),-size/2, -size/2, size, size);
    }
  }
  getImage(){
    return null ;
  }
  getZ(){
    return 0 ;
  }




}
