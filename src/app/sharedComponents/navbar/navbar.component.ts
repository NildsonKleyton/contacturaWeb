import { Component, OnInit, OnChanges  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit , OnChanges  {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.putEventsMenu();
  }

  ngOnChanges(){
    this.putEventsMenu();
  }


  putEventsMenu(){
    const menuDesktop = document.getElementById('menu-desktop');
    const menuMobile = document.getElementById('menu-mobile');
    menuMobile.addEventListener('click', function(){ 
      menuDesktop.classList.toggle('active')
      console.log(" teste de menu Mobile")
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}