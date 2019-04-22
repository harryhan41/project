import {Component, OnInit, ViewChild} from '@angular/core';
import {Course} from '../../../models/course.model.client';
import {SharedService} from '../../../services/shared.service';
import {CourseService} from '../../../services/course.service.client';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './course-new.component.html',
  styleUrls: ['./course-new.component.css'],
})
export class CourseNewComponent implements OnInit {

  @ViewChild('f') webForm: NgForm;

  userId: string;
  courses: Course[];
  name: string;
  grade: string;
  professor: string;
  newCourse;
  show: boolean;

  constructor(private courseService: CourseService, private userService: UserService, private router: Router,
              private activatedRoute: ActivatedRoute, private sharedService: SharedService) {
  }

  create() {
    this.name = this.webForm.value.name;
    this.grade = this.webForm.value.grade;
    this.professor = this.webForm.value.professor;
    this.newCourse = {studentId: this.userId, name: this.name, grade: this.grade, professor: this.professor};

    this.courseService.createWebsite(this.userId, this.newCourse)
      .subscribe(
        (websites: Course[]) => {
          this.courses = websites;
          this.router.navigateByUrl('/user/' + this.userId + '/course');
        });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = this.sharedService.user._id;

    });
    this.courseService.findWebsitesByUser(this.userId)
      .subscribe(courses => {
        this.courses = courses;
      });
    this.userService.findUserById(this.userId)
      .subscribe(user => {
        this.show = user.role === 'teacher';
      });
  }

}
