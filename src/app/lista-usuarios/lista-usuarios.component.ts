import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { UsuariosService } from '../service/usuarios/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosList: User[];
  // collection = {count: 10, data: []};
  constructor(public usuariosService: UsuariosService, private router: Router ) { }

  ngOnInit(): void {
    // this.populateUser();
    this.getUsuarios();
  }
  
  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      data => {
        this.usuariosList = data;
        console.log(data);
      },
      error => {
        this.usuariosList = [];
        console.log(error);
      }
    );
  }
  
  //metodo para preencher os usuário com dados mocados
  // populateUser(){
  //   for (var i = 0; i < this.collection.count; i++) {
  //     this.collection.data.push({
  //       id: i,
  //       email: 'email' + i + '@contactura.com',
  //       password: 'teste'+ i +"@",
  //       name: 'teste' + i,
  //       admin: true
  //     });
  //   }
  //   this.usuariosList = this.collection.data;
  //   console.log(this.usuariosList);//para ver no console
  // }

  editUsuarios(usuario: User){
    console.log('edit esta funcionando', usuario);
    this.usuariosService.getUsersList(usuario);
    this.router.navigate(['/cadastro-usuarios']);
  }

  deleteUsuarios(usuario: User){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja mesmo deletar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result)=>{
      if (result.isConfirmed){
        Swal.fire(
          'Deletado com sucesso!',
        );
      }
    });
  }
}
