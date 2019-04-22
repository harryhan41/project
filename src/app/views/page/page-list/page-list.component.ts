import {Component, OnInit} from '@angular/core';
import {Course} from '../../../models/course.model.client';
import {CourseService} from '../../../services/course.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent implements OnInit {

  userId: string;
  websiteId: string;
  professor: string;
  courses: Course[];

  constructor(private courseService: CourseService, private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.professor = params['name'];
      },
    );

    this.courseService.findCourseByName(this.userId, this.professor)
      .subscribe(courses => {
        console.log('page list componnet is running');
        this.courses = courses;
        console.log(courses);
      });

  }

}
