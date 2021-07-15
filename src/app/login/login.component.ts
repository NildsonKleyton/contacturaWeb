import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  login(){
    if(this.loginFrom.valid){
      localStorage.setItem('token', 'coxinhanovaiorkina');
      this.router.navigate(['/lista-contatos'])
    }
  }
}
