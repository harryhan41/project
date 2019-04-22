import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {QuillModule} from 'ngx-quill';
import {routing} from './app.routing';

import {AppComponent} from './app.component';
import {PageService} from './services/page.service.client';
import {LoginComponent} from './views/user/login/login.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {RegisterComponent} from './views/user/register/register.component';
import {CourseEditComponent} from './views/course/course-edit/course-edit.component';
import {CourseListComponent} from './views/course/course-list/course-list.component';
import {CourseNewComponent} from './views/course/course-new/course-new.component';
import {PageEditComponent} from './views/page/page-edit/page-edit.component';
import {PageListComponent} from './views/page/page-list/page-list.component';
import {PageNewComponent} from './views/page/page-new/page-new.component';


// client services
import {UserService} from './services/user.service.client';
import {CourseService} from './services/course.service.client';
import {SharedService} from './services/shared.service';
import {FlickrService} from './services/flickr.service';
import {SortableDirective} from '../../assignment/directives/sortable.directive';
import {AuthGuard} from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    CourseNewComponent,
    CourseEditComponent,
    CourseListComponent,
    SortableDirective,
    PageNewComponent,
    PageEditComponent,
    PageListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    QuillModule,
  ],
  providers: [UserService, CourseService, PageService, SharedService, FlickrService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
}
