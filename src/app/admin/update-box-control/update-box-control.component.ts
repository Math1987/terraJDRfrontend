import {Component, Input, OnInit} from '@angular/core';
import {View} from '../../services/world/view/view';
import {Box} from '../../services/world/model/box';
import {Net} from '../../services/net';

@Component({
  selector: 'app-update-box-control',
  templateUrl: './update-box-control.component.html',
  styleUrls: ['./update-box-control.component.scss']
})
export class UpdateBoxControlComponent implements OnInit {

  @Input() updateBox: UpdateBoxControlComponent ;

  views : any ;
  targets : any ;

  constructor() { }

  ngOnInit() {
  }
  setViews(views){
    this.views = views ;
    this.targets = [] ;
    for ( let view of views ){

      let values = [] ;

      for ( let i = 0 ; i < Object.keys(view.box).length ; i ++ ){
        if ( !Box.isProtectedKey(Object.keys(view.box)[i]) && ( typeof Object.values(view.box)[i] == "number") ){
          values.push(
            {
              key: Object.keys(view.box)[i],
              value: Object.values(view.box)[i]
            }
          );
        }
      }

      this.targets.push({
        view : view,
        values : values
      });
    }
  }
  updateValue(view, key, value){

    Net.socket.emit('updateValue', view.box.id, key, parseInt(value), function(res) {
      alert('value updated');
    });

  }

}
