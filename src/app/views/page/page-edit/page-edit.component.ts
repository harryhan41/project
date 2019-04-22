import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../../models/course.model.client';
import {CourseService} from '../../../services/course.service.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css'],
})
export class PageEditComponent implements OnInit {

  user_id: string;
  page_id: string;
  web_id: string;
  course: Course;


  // tslint:disable-next-line:max-line-length
  constructor(private courseService: CourseService, private userService: UserService, private  router: Router, private activeRouter: ActivatedRoute) {
    this.course = new Course('1', 'abc', '123', 'o', 'o');
  }

  updatePage() {
    console.log('page update');
    this.userService.updateUserGrade(this.course.studentId, this.course).subscribe(user => {
      alert('user update score');
    });
    this.courseService.updateWebsite(this.course._id, this.course).subscribe(page => {
      alert('update score');
    });
  }

  ngOnInit() {
    this.activeRouter.params.subscribe(
      (params: any) => {
        this.user_id = params['uid'];
        this.page_id = params['pid'];
        this.web_id = params['wid'];
        console.log('course id: ' + this.course._id);
      },
    );
    this.courseService.findWebsiteById(this.page_id)
      .subscribe(course => {
        this.course = course;
      });
  }
}
