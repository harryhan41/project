import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css'],
})
export class PageNewComponent implements OnInit {

  @ViewChild('f') pageForm: NgForm;

  userId: string;
  websiteId: string;
  pages = [{}];

  constructor(private pageService: PageService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  create() {
    const name = this.pageForm.value.name;
    const title = this.pageForm.value.title;
    const page = {name: name, description: title};

    this.pageService.createPage(this.websiteId, page)
      .subscribe(site => {
        this.router.navigateByUrl('/user/' + this.userId + '/website/' + this.websiteId + '/course');
      });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.websiteId = params['wid'];
      this.userId = params['uid'];

    });
    this.pageService.findPageByWebsiteId(this.websiteId)
      .subscribe(pages => {
        this.pages = pages;
      });
  }

}
