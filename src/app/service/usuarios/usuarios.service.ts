import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication, StorageInfo, User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  api_url = environment.api_url;
  
  private dataEdit =new BehaviorSubject<User>(null);
  botaoEdit = this.dataEdit.asObservable();
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');

  constructor(private http: HttpClient) {
      console.log ('Teste front_end serviço');
  }

  getUsersList(usuarios:User){
    this.dataEdit.next(usuarios);
  }

  authentication(authentication: Authentication){
    const headers = new HttpHeaders ({ Authorization: 'Basic ' 
    + btoa(authentication.username + ':' + authentication.password)});
    return this.http.get(this.api_url + 'user/login', {headers}).pipe(
      map(
        authData => {

          let storageInformation: StorageInfo = {
            admin: authData[0],
            token: authData[1]
          }

          console.log(storageInformation);
          return storageInformation;
        }       
      ) 
    );
  }

  getUsuarios(){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.get<User[]>(this.api_url + 'user', {headers}).pipe(
      map(
        userData => {
          if (userData){
            return userData;
          }else{
            return [];
          }
        }
      )
    )
  }

  createUsuario(usuarios: User){
    const headers = new HttpHeaders({Authentication:'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.post<User>(this.api_url + 'user',usuarios, {headers}).pipe(
      map(
        userData => {
          if (userData){
            return userData;
          }else{
            return [];
          }
        }
      )
    );
  }

  deleteUsuario(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.delete(this.api_url + 'user/' + id, {headers, responseType: 'text' as 'text'}).pipe(
      map(
        contactData => {
          return contactData;
        }
      )
    );
  }

  updateUsuario(usuarios: User){
    const id = usuarios.id;
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.put<User>(this.api_url + 'user/' + id, usuarios, {headers}).pipe(
      map(
        userData => {
          if (userData){
            return userData;
          }else{
            return [];
          }
        }
      )
    );
  }

  findContactById(){
    console.log('desafio para vocês');
  }
}