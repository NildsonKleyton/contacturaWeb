import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './login/login.component';
import { AuthAdminGuard, AuthGuard } from './service/auth.guard';
import { NotFoundComponent } from './sharedComponents/not-found/not-found.component';


const routes: Routes = [
{path: '', redirectTo: '/login', pathMatch:'full'},
{path: 'login', component: LoginComponent},
{path: 'lista-contatos', component: ListaContatosComponent, canActivate: [AuthGuard]},
{path: 'lista-usuarios', component: ListaUsuariosComponent, canActivate: [AuthGuard]},
{path: 'cadastro-contatos', component: ListaContatosComponent, canActivate: [AuthGuard]},
{path: 'cadastro-usuarios', component: ListaUsuariosComponent, canActivate: [AuthAdminGuard]},
{path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

