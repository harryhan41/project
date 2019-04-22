import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs/internal/Subject';
import {Course} from '../../../models/course.model.client';
import {SharedService} from '../../../services/shared.service';
import {CourseService} from '../../../services/course.service.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
})
export class CourseEditComponent implements OnInit {

  website: Course;
  userId: string;
  websites: Course[];
  websiteId: string;
  websiteChanged = new Subject<string>();
  updateMsg = 'Update web information!';

  constructor(private webService: CourseService, private router: Router, private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) {
    this.website = new Course('1', '2', '3', '4', 'o');
  }

  delete() {
    this.webService.deleteWebsite(this.websiteId)
      .subscribe(
        (websites: Course[]) => {
          this.websites = websites;
        }
      );
    this.update();
  }

  update() {
    this.webService.updateWebsite(this.websiteId, this.website)
      .subscribe(
        (website: Course) => {
          this.website = website;
          alert(this.updateMsg);
          this.router.navigateByUrl('/user/' + this.userId + '/course');
        }
      );
  }

  onChangeWebsite(id) {
    this.websiteChanged.next(id);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log('ngoninit is running');
      console.log(this.sharedService.user);
      this.userId = this.sharedService.user._id;
      this.websiteId = params['wid'];
    });

    this.webService.findWebsitesByUser(this.userId)
      .subscribe(websites => {
        console.log('find course by user is running');
        this.websites = websites;
      });

    this.webService.findWebsiteById(this.websiteId)
      .subscribe(website => {
        this.website = website;
        console.log('find course by id is running ');
      });
    this.websiteChanged
      .subscribe(
        (websiteId: string) => {
          this.websiteId = websiteId;
          this.webService.findWebsiteById(this.websiteId)
            .subscribe(
              (website: Course) => {
                this.website = website;
              }
            );
        }
      );
  }
}
