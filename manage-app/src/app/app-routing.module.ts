import { AuthGuard } from './services/auth-guard.service';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    component: MainComponent,
  },
  { 
    path: 'signin',
    loadComponent: () => import('./components/login/login.component').then(map => map.LoginComponent),
  },
  { 
    path: 'signup',
    loadComponent: () => import('./components/login/login.component').then(map => map.LoginComponent),
  },
  { 
    path: 'profile',
    loadComponent: () => import('./components/profile/profile.component').then(map => map.ProfileComponent),
    canActivate: [ AuthGuard ]
  },
  { 
    path: 'boards',
    loadComponent: () => import('./components/boards/boards.component').then(map => map.BoardsComponent),
    canActivate: [ AuthGuard ]
  },
  { 
    path: 'boards/:id',
    loadComponent: () => import('./components/columns/columns.component').then(map => map.ColumnsComponent),
    canActivate: [ AuthGuard ]
  },
  {
    path: '**',
    redirectTo: '',
    component: MainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
