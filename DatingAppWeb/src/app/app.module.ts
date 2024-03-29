import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NavComponent} from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./_services/auth.service";
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ErrorInterceptorProvider} from "./_services/error.interceptor";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {MemberListComponent} from './members/member-list/member-list.component';
import {ListsComponent} from './lists/lists.component';
import {MessagesComponent} from './messages/messages.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";
import {MemberCardComponent} from './members/member-card/member-card.component';
import {JwtModule} from "@auth0/angular-jwt";
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import {MemberDetailResolver} from "./_resolvers/member-detail.resolver";
import {MemberListResolver} from "./_resolvers/member-list.resolver";
import {NgxGalleryModule} from "ngx-gallery-9";
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import {MemberEditResolver} from "./_resolvers/member-edit.resolver";
import {PreventUnsavedChanges} from "./_guards/prevent-unsaved-changes-guard";
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import {FileUploadModule} from "ng2-file-upload";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {MomentModule} from "ngx-moment";

export function tokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    }),
    MomentModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
