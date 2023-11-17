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
import { AuthGuard } from './guard/auth.guard';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { SuggestAgendaComponent } from './pages/suggest-agenda/suggest-agenda.component';
import { ParticipateComponent } from './pages/participate/participate.component';
import { GridDaysComponent } from './pages/grid-days/grid-days.component'; 
import { GridComponent } from './pages/grid/grid.component'; 

import { WithTokenGuard } from './guard/with-token.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [WithTokenGuard], },
  { path: 'register', component: RegisterComponent, canActivate: [WithTokenGuard], },
  { path: 'loginsocial', component: LoginSocialComponent, canActivate: [WithTokenGuard], },
  { path: 'sendCodeResetPassword', component: CheckCodeRestPasswordComponent, canActivate: [WithTokenGuard], },
  { path: 'changePassword', component: ResetPasswordComponent, canActivate: [WithTokenGuard], },
  { path: 'videos', component: VideoComponent },
  { path: 'video/:idVideo', component: VideoViewerComponent },
  { path: 'activeAccount', component: ActiveAccountComponent },
  { path: 'suggestAgenda', component: SuggestAgendaComponent },
  { path: 'participate', component: ParticipateComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], },
  { path: 'editUser/:id', component: EditUserComponent, canActivate: [AuthGuard], },
  { path: '', component: HomePageComponent, canActivate: [AuthGuard], },
  { path: 'grid-days', component: GridDaysComponent },
  { path: 'grid-days/:day', component: GridComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
