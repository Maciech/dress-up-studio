import { Routes } from '@angular/router';
import { HomeComponent } from './pages/landing-page/home.component';
import { UserComponent } from './components/user/user.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'basket',
    component: BasketComponent,
  },
  {
    path: ':name/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'admin',
    component: AdminPageComponent,
  }
];
