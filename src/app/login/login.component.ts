import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Authentication } from 'src/app/models/user'
import { UsuariosService } from '../service/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFrom = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  });
  authentication: Authentication;

  constructor(private router: Router, public usuariosService: UsuariosService) { }

  ngOnInit(): void {
    console.log ('Teste front_end login');
  }
  
  login(){
    if(this.loginFrom.valid){
      this.authentication = this.loginFrom.value;
      this.usuariosService.authentication(this.authentication).subscribe(
        data => {
          console.log (data);
          localStorage.setItem('admin ', data.admin);
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', this.authentication.username);
          localStorage.setItem('password', this.authentication.password);
          this.router.navigate(['/lista-contatos'])
        }
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Login ou senha inválidos'
      })
    }  
  }
}
