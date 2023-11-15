// Import
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

// Declaration
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VideoComponent } from './pages/video/video.component';
import { VideoViewerComponent } from './pages/video-viewer/video-viewer.component';
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
import { VideoCommentComponent } from './components/video-comment/video-comment.component';
import { SuggestAgendaComponent } from './pages/suggest-agenda/suggest-agenda.component';
import { ParticipateComponent } from './pages/participate/participate.component';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    InputTextModule,
    DropdownModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
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
    VideoCommentComponent,
    SuggestAgendaComponent,
    ParticipateComponent
  ],
  providers: [
    { provide: 'authGuard', useClass: AuthGuard },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserTokenInterceptor,
      multi: true,
    },
    { provide: OAuthStorage, useValue: localStorage },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
