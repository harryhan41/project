import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Course} from '../../../models/course.model.client';
import {CourseService} from '../../../services/course.service.client';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-website-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {

  // properties
  userId: string;
  name: string;
  courses: Course[];
  students: User[];
  show: boolean;

  constructor(private courseService: CourseService, private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      },
    );
    this.courseService.findWebsitesByUser(this.userId)
      .subscribe(courses => {
        this.courses = courses;
      });

    this.userService.findUserById(this.userId)
      .subscribe(user => {
        this.show = user.role === 'teacher';
        this.name = user.username;
      });
  }

}
