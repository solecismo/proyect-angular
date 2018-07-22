import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';

import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxPermissionsModule } from 'ngx-permissions';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { routing }        from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component'
import { RegisterComponent } from './register/register.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileEditPasswordComponent } from './profile/profile-edit-password/profile-edit-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    ProfileComponent,
    ProfileEditComponent,
    ProfileEditPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
