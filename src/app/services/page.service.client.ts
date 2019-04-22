import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class PageService {
  constructor(private _http: HttpClient) {
  }

  baseUrl = environment.baseUrl;

  createPage(websiteId: string, page: any) {
    return this._http.post<Page>(this.baseUrl + '/api/website/' + websiteId + '/course', page);
  }

  findPageByWebsiteId(websiteId: string) {
    return this._http.get<[Page]>(this.baseUrl + '/api/website/' + websiteId + '/course');
  }

  findPageById(pageId: string) {
    return this._http.get<Page>(this.baseUrl + '/api/course/' + pageId);
  }


  updatePage(pageId, page) {
    return this._http.put<Page>(this.baseUrl + '/api/course/' + pageId, page);
  }

  deletePage(pageId) {
    return this._http.delete<Page>(this.baseUrl + '/api/course/' + pageId);
  }
}
