import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Net} from '../services/net';
import {Account} from '../services/account';
import {Area} from '../services/world/area';

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

     console.log('init login');

    if (Account.user !== null) {
      this.router.navigate(['/u']);
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
    if (this.formLogin.valid) {
      const self = this;

      Account.login( this.formLogin.value.email, this.formLogin.value.password, function(res) {
        if ( res !== null ){
          self.router.navigate(['/u/jeu']);
        }else{
          alert('erreur de connexion.');
        }

      });

    }
  }

  submitCreate() {
    if (this.formCreate.valid) {

      if (this.formCreate.value.password === this.formCreate.value.confirmPassword) {


        Account.create( this.formCreate.value.email, this.formCreate.value.password, this.formCreate.value.pseudo, function(res) {
          if ( res !== null ){
            self.router.navigate(['/u']);
          }else{
            alert('erreur de connexion.');
          }
        });

        const self = this;


      } else {
        alert('tes mots de passe ne correspondent pas.')
      }
      this.submitEM.emit(this.formLogin.value);
    }
  }


  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();
}
