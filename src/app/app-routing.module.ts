import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { ClientComponent } from './modules/client/client.component';
import { adminGuard } from './core/guard/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren : ()=> import('./modules/admin/admin.module').then(t=> t.AdminModule),
    // canActivate: [adminGuard]
  },
  {
    path: 'public',
    component: ClientComponent,
    loadChildren: ()=> import('./modules/client/client.module').then(t => t.ClientModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'public'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
