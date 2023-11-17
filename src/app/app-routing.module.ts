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
import { AuthGuard } from './guard/auth.guard';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { SuggestAgendaComponent } from './pages/suggest-agenda/suggest-agenda.component';
import { ParticipateComponent } from './pages/participate/participate.component';
import { WithTokenGuard } from './guard/with-token.guard';

const routes: Routes = [
  { path: '', component: VideoComponent, canActivate: [AuthGuard], }, // Default route - Showd be stream component
  { path: 'login', component: LoginComponent, canActivate: [WithTokenGuard], },
  { path: 'register', component: RegisterComponent, canActivate: [WithTokenGuard], },
  { path: 'loginsocial', component: LoginSocialComponent, canActivate: [WithTokenGuard], },
  { path: 'sendCodeResetPassword', component: CheckCodeRestPasswordComponent, canActivate: [WithTokenGuard], },
  { path: 'changePassword', component: ResetPasswordComponent, canActivate: [WithTokenGuard], },
  { path: 'videos', component: VideoComponent, canActivate: [AuthGuard], },
  { path: 'video/:idVideo', component: VideoViewerComponent, canActivate: [AuthGuard], },
  { path: 'activeAccount', component: ActiveAccountComponent, canActivate: [AuthGuard], },
  { path: 'suggestAgenda', component: SuggestAgendaComponent, canActivate: [AuthGuard], },
  { path: 'participate', component: ParticipateComponent, canActivate: [AuthGuard], },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], },
  { path: 'editUser/:id', component: EditUserComponent, canActivate: [AuthGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
