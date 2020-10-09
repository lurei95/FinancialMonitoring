import { CategoryEditComponent } from './components/views/finance/category-edit/category-edit.component';
import { CategoriesComponent } from './components/views/finance/categories/categories.component';
import { LoginComponent } from "./components/views/authentication/login/login.component";
import { SignupComponent } from "./components/views/authentication/signup/signup.component";
import { HomeComponent } from "./components/views/home/home.component";
import { ApplicationGuard } from "./services/security/applicationGuard";
import { LoginGuard } from "./services/security/loginGuard";
import { FinancialItemEditComponent } from './components/views/finance/financial-item-edit/financial-item-edit.component';

/**
 * routing configuration
 */
export const routing = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CategoryEditComponent },
  { path: 'categories/:categoryId/Items/:itemId', component: FinancialItemEditComponent },
  { path: 'home', component: HomeComponent, canActivate: [ApplicationGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]