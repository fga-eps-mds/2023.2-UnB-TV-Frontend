// Import
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

// Declaration
import { NgModule, isDevMode } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VideoComponent } from './pages/video/video.component';
import { VideoViewerComponent } from './pages/video-viewer/video-viewer.component';
import { BackgroundComponent } from './components/background/background.component';
import { LoginSocialComponent } from './pages/login-social/login-social.component';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserTokenInterceptor } from './interceptor/user-token-interceptor.service';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CheckCodeRestPasswordComponent } from './pages/check-code-rest-password/check-code-rest-password.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/auth.service';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { StreamViewComponent } from './pages/stream-view/stream-view.component';
import { UpdateRoleComponent } from './pages/update-role/update-role.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MenuModule } from 'primeng/menu';
import { VideoCommentComponent } from './components/video-comment/video-comment.component';
import { SuggestAgendaComponent } from './pages/suggest-agenda/suggest-agenda.component';
import { ParticipateComponent } from './pages/participate/participate.component';
import { GridComponent } from './pages/grid/grid.component';
import { GridDaysComponent } from './pages/grid-days/grid-days.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    OAuthModule.forRoot(),
    InputTextModule,
    DropdownModule,
    ButtonModule,
    ProgressSpinnerModule,
    MenuModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginSocialComponent,
    VideoComponent,
    VideoViewerComponent,
    BackgroundComponent,
    ActiveAccountComponent,
    ProfileComponent,
    ResetPasswordComponent,
    CheckCodeRestPasswordComponent,
    EditUserComponent,
    StreamViewComponent,
    UpdateRoleComponent,
    SuggestAgendaComponent,
    ParticipateComponent,
    GridComponent,
    GridDaysComponent,
    VideoCommentComponent
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
    ConfirmationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
