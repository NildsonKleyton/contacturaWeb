import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
      this.router.navigate(['/lista-contatos']);
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Cadastro não realizado, preencher corretamente todos os campos'
      })
    }
  }

}
