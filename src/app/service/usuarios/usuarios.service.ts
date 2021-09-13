import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Authentication, StorageInfo, User } from 'src/app/models/user'
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import{map} from 'rxjs/operators';
// import { Contacts } from 'src/app/models/contacts';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private dataEdit =new BehaviorSubject<User>(null);
  botaoEdit = this.dataEdit.asObservable();

  constructor(private http: HttpClient) {
      console.log ('Teste front_end serviço');
  }

  // getContactsList(contatos: Contacts){
  //   this.dataEdit.next(contatos);
  // }
  getUsersList(usuarios:User){
    this.dataEdit.next(usuarios);
  }
  
  api_url = environment.api_url;

  authentication(authentication: Authentication){
    const headers = new HttpHeaders({Authentication: 'Basic '
    + btoa(authentication.username + ':' +authentication.password)});
    return this.http.post(this.api_url + 'user/login', {headers}).pipe(
      map(
        authData => {

          let storageInformation: StorageInfo = {
            admin: authData[0],
            token: authData[1]
          }

          console.log (storageInformation);
          return storageInformation;
        }       
      ) 
    )
  }

}