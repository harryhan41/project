import {RouterModule, Routes} from '@angular/router';
import {PageEditComponent} from './views/page/page-edit/page-edit.component';
import {PageListComponent} from './views/page/page-list/page-list.component';
import {PageNewComponent} from './views/page/page-new/page-new.component';
import {LoginComponent} from './views/user/login/login.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {RegisterComponent} from './views/user/register/register.component';
import {CourseEditComponent} from './views/course/course-edit/course-edit.component';
import {CourseListComponent} from './views/course/course-list/course-list.component';
import {CourseNewComponent} from './views/course/course-new/course-new.component';
import {AuthGuard} from './services/auth-guard.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/:uid', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid/course', component: CourseListComponent},
  {path: 'user/:uid/course/new', component: CourseNewComponent},
  {path: 'user/:uid/course/:wid/edit', component: CourseEditComponent},
  {path: 'user/:uid/course/:wid/:name/page', component: PageListComponent},
  {path: 'user/:uid/course/:wid/page/new', component: PageNewComponent},
  {path: 'user/:uid/course/:wid/page/:pid', component: PageEditComponent},
  {path: '**', redirectTo: 'login'},
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});
