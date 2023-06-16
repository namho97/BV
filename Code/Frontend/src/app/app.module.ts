import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './modules/main/main.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './core/guards/auth-guard.service';
import { PermisssionGuard } from './core/guards/permission-guard.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeVi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
import 'hammerjs';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';
import { GlobalErrorHandler } from './core/error/global-error-handler';
import { ServerErrorInterceptor } from './core/interceptors/server-error.interceptor';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MessagingService } from './core/services/messaging.service';
import { HttpModule } from '@angular/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './core/custom/mat-paginatorintl-cro';
import { NgChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { CanDeactivateGuard } from './core/guards/can-deactivate-guard.service';

registerLocaleData(localeVi, 'vi');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    AuthModule,
    HttpClientModule,
    HttpModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDl-ppEagnAK_z63XuPUlxglW83wm5MZEE'
    })
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'vi-VN' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    AuthGuard, MessagingService,
    PermisssionGuard,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
