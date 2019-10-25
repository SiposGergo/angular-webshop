import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BASE_URL_TOKEN } from '../injection-tokens/base-url.token';
import { environment } from '../environments/environment';
import { VALIDATION_MESSAGES } from './modules/validation/validation.token';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ValidationModule } from './modules/validation/validation.module';
import { validationMessages } from './modules/validation/model/validation-messages';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorHandlingInterceptor } from '../utils/class/error-handling-interceptor';
import { NavigationModule } from './modules/navigation/navigation.module';
import { AuthService } from './modules/auth/auth.service';
import { NgxsModule } from '@ngxs/store';
import { AuthModule } from './modules/auth/auth.module';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    ValidationModule,
    NavigationModule,
    AuthModule,
    NgxsModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ key: ['auth', 'navigation'] }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    HttpClient,
    AuthService,
    { provide: BASE_URL_TOKEN, useValue: environment.apiUrl },
    {
      provide: VALIDATION_MESSAGES,
      useValue: validationMessages
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
