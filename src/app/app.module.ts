import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatSidenavModule,
  MatDialogModule, MatCheckboxModule, MatRadioModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GameComponent } from './game/game.component';
import { NavComponent } from './nav/nav.component';
import { AdminComponent } from './admin/admin.component';
import { MapComponent } from './game/map/map.component';
import { CharacterComponent } from './game/character/character.component';
import { WorldsComponent } from './game/worlds/worlds.component';
import { UpdateBoxControlComponent } from './admin/update-box-control/update-box-control.component';
import { AdminMapComponent } from './admin/admin-map/admin-map.component';
import { PatternsComponent } from './admin/patterns/patterns.component';
import { CalculationComponent } from './admin/calculation/calculation.component';
import { RankingComponent } from './game/ranking/ranking.component';
import { MartyrComponent } from './game/ranking/martyr/martyr.component';
import { MessageComponent } from './game/message/message.component';
import { GiveResourceComponent } from './game/dialogs/give-resource/give-resource.component';
import { GetResourceComponent } from './game/dialogs/get-resource/get-resource.component';
import { EditorAddComponent } from './admin/dialogs/editor-add/editor-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    NavComponent,
    AdminComponent,
    MapComponent,
    CharacterComponent,
    WorldsComponent,
    UpdateBoxControlComponent,
    AdminMapComponent,
    PatternsComponent,
    CalculationComponent,
    RankingComponent,
    MartyrComponent,
    MessageComponent,
    GiveResourceComponent,
    GetResourceComponent,
    EditorAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSidenavModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    GiveResourceComponent,
    GetResourceComponent,

    EditorAddComponent
  ]
})
export class AppModule { }
