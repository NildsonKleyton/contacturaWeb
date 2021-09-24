//import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  exibirMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') != null) {
      console.log("logado")
      this.exibirMenuEmitter.emit(true);
      return true;

    } else {
      localStorage.removeItem('token');
      console.log("nao logado")
      this.exibirMenuEmitter.emit(false);
      this.router.navigate(['/login']);
    }

  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  exibirMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('token') != null && localStorage.getItem('admin') == 'true') {
      this.exibirMenuEmitter.emit(true);
      return true;

    } else {
      localStorage.removeItem('token');
      console.log("nao logado")
      this.exibirMenuEmitter.emit(false);
      this.router.navigate(['/login']);
    }
  }
}