import { CategoriesComponent } from './components/views/finance/categories/categories.component';
import { LoginComponent } from "./components/views/authentication/login/login.component";
import { SignupComponent } from "./components/views/authentication/signup/signup.component";
import { HomeComponent } from "./components/views/home/home.component";
import { ApplicationGuard } from "./services/security/applicationGuard";
import { LoginGuard } from "./services/security/loginGuard";

/**
 * routing configuration
 */
export const routing = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent },
  { path: 'home', component: HomeComponent, canActivate: [ApplicationGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]