import {Injectable} from '@angular/core';
import {Course} from '../models/course.model.client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class CourseService {
  constructor(private _http: HttpClient) {
  }

  baseUrl = environment.baseUrl;

  createWebsite(userId: string, course: any) {
    return this._http.post(this.baseUrl + '/api/user/' + userId + '/course', course);
  }


  findWebsitesByUser(userId: string) {
    return this._http.get<[Course]>(this.baseUrl + '/api/user/' + userId + '/course');
  }

  findWebsiteById(websiteId: string) {
    return this._http.get<Course>(this.baseUrl + '/api/course/' + websiteId);
  }


  updateWebsite(websiteId: string, website: Course) {
    return this._http.put<Course>(this.baseUrl + '/api/course/' + websiteId, website);
  }

  deleteWebsite(websiteId: string) {
    return this._http.delete(this.baseUrl + '/api/course/' + websiteId);
  }

  findCourseByName(userId: string, name: string) {
    console.log('course service client is running');
    return this._http.get<[Course]>(this.baseUrl + '/api/user/' + userId + '/' + name + '/course');
  }
}
