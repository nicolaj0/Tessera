import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* import AmplifyUIAngularModule  */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
/* Add Amplify imports */
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './jwt.interceptor';
import { ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule, ChipListModule } from '@syncfusion/ej2-angular-buttons';
Amplify.configure(awsconfig);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    /* configure app with AmplifyUIAngularModule */
    AmplifyUIAngularModule,
    ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule, ChipListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
