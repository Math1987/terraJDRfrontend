import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Translator} from '../../../services/world/model/translator/translator';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {

  static skill = "getWater" ;


  constructor(
    private dialogRef: MatDialogRef<TradeComponent>
  ) {}

  ngOnInit() {}
  getTradeResource(){
    return  Translator.translate(TradeComponent.skill, "fr", "skill") ;
  }
  validate() {
    this.dialogRef.close(``);
  }
}
