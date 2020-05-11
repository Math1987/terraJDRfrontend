import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Net} from '../services/net';
import {Account} from '../services/account';
import {Area} from '../services/world/area';

import * as EmailValidator from 'email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {

    if (Account.user !== null) {
      this.router.navigate(['/u/jeu']);
    }else{
      Area.reset();
    }

  }


  formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  formCreate: FormGroup = new FormGroup({
    pseudo: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  submitLogin() {
    if (this.formLogin.valid ) {
      const self = this;

      if ( EmailValidator.validate(this.formLogin.value.email) ){
        Account.login( this.formLogin.value.email, this.formLogin.value.password, function(res) {
          console.log(res);
          if ( res !== null ){
            self.router.navigate(['/u/jeu']);
          }else{
            alert('erreur de connexion.');
          }

        });
      }else{
        alert(`Ton email n'est pas valide.`);
      }

    }
  }

  submitCreate() {
    if (this.formCreate.valid) {
      if ( EmailValidator.validate(this.formCreate.value.email) ) {
        if (this.formCreate.value.password === this.formCreate.value.confirmPassword) {


          Account.create(this.formCreate.value.email, this.formCreate.value.password, this.formCreate.value.pseudo, function(res) {
            if (res !== null) {
              self.router.navigate(['/u/jeu']);
            } else {
              alert('erreur de connexion.');
            }
          });

          const self = this;


        } else {
          alert('tes mots de passe ne correspondent pas.')
        }
        this.submitEM.emit(this.formLogin.value);
      }else{
        alert(`Ton email n'est pas valide.`);
      }

    }
  }


  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();
}
