
export class B_mover  {

  canvas = null ;

  mouseDownEvent ;

  left = 0 ;
  top = 0 ;
  width = 0 ;
  height = 0 ;
  angle = 0 ;

  functionTouch ;

  constructor( angle, functionTouch) {
    this.angle = angle ;
    const self = this ;
    this.functionTouch = function(event) {

      if ( self.canvas !== null ) {

        let px = (event.clientX - self.canvas.getBoundingClientRect().left) * ( self.canvas.width/self.canvas.clientWidth) ;
        let py = (event.clientY - self.canvas.getBoundingClientRect().top) * ( self.canvas.width/self.canvas.clientWidth) ;

        if (Math.sqrt(Math.pow(px - (self.left + self.width), 2) + Math.pow(py - (self.top + self.width), 2)) <= self.width) {
          functionTouch();
        }
      }
    };
    document.addEventListener('mousedown', this.functionTouch);
  }

  drawPathCircle(context, x, y, rayon) {
    context.beginPath();
    context.arc(x, y, rayon, 0, Math.PI * 2);
  }
  drawArrowPath(context, x: number, y: number, size: number) {

    context.beginPath();
    context.moveTo(x - size / 4, y + size / 2 );
    context.lineTo(x - size / 4, y );
    context.lineTo(x - size / 2, y ) ;
    context.lineTo( x, y - size / 2 ) ;
    context.lineTo( x + size / 2, y );
    context.lineTo( x + size / 4, y ) ;
    context.lineTo( x + size / 4, y + size / 2);
    context.lineTo(x - size / 4, y + size / 2);
    context.closePath();

  }

  destroy() {
    document.removeEventListener('mousedown', this.mouseDownEvent );
  }
  draw(canvas, left: number, top: number, width: number, height: number, params ) {

    this.canvas = canvas ;
    let context = this.canvas.getContext('2d');

    this.left = left ;
    this.top = top ;
    this.width = width ;
    this.height = height ;

    context.fillStyle = params.style ;
    this.drawPathCircle(context, left + width, top + width, width );
    context.fill();
    context.fillStyle = "gray" ;
    context.stroke();
    context.fillStyle = 'gray' ;


    context.translate(left + width, top + width);
    context.rotate(this.angle) ;
    this.drawArrowPath(context, 0, 0, width );
    context.rotate(-this.angle);
    context.translate(-(left + width), -(top + width));

    context.fill();

  }
  mouseDown(px: number, py: number): any {
    if ( Math.sqrt( Math.pow(px - (this.left + this.width), 2) + Math.pow( py - (this.top + this.width), 2)) <= this.width ) {
      return this ;
    } else {
      return null ;
    }
  }

}
