import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { UsuariosService } from '../service/usuarios/usuarios.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent implements OnInit {

  formUsuario = new FormGroup({
    id: new FormControl(''),
    email: new FormControl ('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    admin: new FormControl('',[Validators.required])
  });

  constructor(private router: Router, public usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.botaoEdit.subscribe(edit =>{
      if (edit !== null) {
        console.log(edit, 'valor do edit');
        this.formUsuario.get('email').setValue(edit.email);
        // this.formUsuario.get('password').setValue(edit.password);
        // this.formUsuario.get('username').setValue(edit.username);
        // this.formUsuario.get('admin').setValue(edit.admin);
      }
    });
  }
  save(){
    if(this.formUsuario.valid){
      Swal.fire({
        icon: 'success',
        title: 'Eeeeeba...',
        text: 'Contato criada com sucesso!'
      });
      this.router.navigate(['/lista-usuarios']);
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Cadastro não realizado, preencher corretamente todos os campos'
      })
    }
  }
  edit(usuario: User){
    usuario.username =  this.formUsuario.get('username').value;
    usuario.email = this.formUsuario.get('email').value;
    usuario.password =  this.formUsuario.get('password').value;

    this.usuariosService.updateUsuario(usuario).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Eeeeeba..',
          text: 'Contato editado com sucesso!'
        });
        this.router.navigate(['/lista-contatos']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: 'Erro ao editar contato!'
          });
        }
    );
  }

  create(){
    this.usuariosService.createUsuario(this.formUsuario.value).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Eeeeeba..',
          text: 'Contato criado com sucesso!'
        });
        this.router.navigate(['/lista-contatos']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: 'Erro ao criar contato!'
          });
        }
    );
  }
}
