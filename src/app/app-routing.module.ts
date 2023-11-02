import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginSocialComponent } from './pages/login-social/login-social.component';
import { VideoComponent } from './pages/video/video.component';
import { VideoViewerComponent } from './pages/video-viewer/video-viewer.component';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CheckCodeRestPasswordComponent } from './pages/check-code-rest-password/check-code-rest-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthGuard } from './services/auth.guard';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { SuggestAgendaComponent } from './pages/suggest-agenda/suggest-agenda.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'loginsocial', component: LoginSocialComponent },
  { path: 'videos', component: VideoComponent },
  { path: 'video/:idVideo', component: VideoViewerComponent },
  { path: 'activeAccount', component: ActiveAccountComponent },
  { path: 'sendCodeResetPassword', component: CheckCodeRestPasswordComponent },
  { path: 'changePassword', component: ResetPasswordComponent },
  { path: 'suggestAgenda', component: SuggestAgendaComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], },
  { path: 'editUser/:id', component: EditUserComponent, canActivate: [AuthGuard], },
  { path: '', component: HomePageComponent, canActivate: [AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
