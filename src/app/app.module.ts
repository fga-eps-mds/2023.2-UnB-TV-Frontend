import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VideoComponent } from './pages/video/video.component';
import { VideoViewerComponent } from './pages/video/video-viewer.component';
import { SafePipe } from './pipes/safe.pipe';
import { BackgroundComponent } from './components/background/background.component';
import { LoginSocialComponent } from './pages/login-social/login-social.component';

import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserTokenInterceptor } from './services/user-token-interceptor.service';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CheckCodeRestPasswordComponent } from './pages/check-code-rest-password/check-code-rest-password.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { UpdateRoleComponent } from './pages/update-role/update-role.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BackgroundComponent,
    LoginSocialComponent,
    VideoComponent,
    VideoViewerComponent,
    SafePipe,
    BackgroundComponent,
    ActiveAccountComponent,
    HomePageComponent,
    ProfileComponent,
    ResetPasswordComponent,
    CheckCodeRestPasswordComponent,
    EditUserComponent,
    UpdateRoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
