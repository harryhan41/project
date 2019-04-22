import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  // properties
  user: User = {_id: '', username: '', password: '', firstName: '', lastName: '', email: '', role: ''};
  userId: string;
  username: string;
  updateMsg = 'update your information!';
  show: boolean;

  constructor(private userService: UserService, private acRouter: ActivatedRoute, private router: Router,
              private sharedService: SharedService) {
  }

  UpdateUser() {
    console.log(this.user.username);
    this.acRouter.params
      .subscribe(
        (params => {
          return this.userService.updateUser(this.user)
            .subscribe(
              (user: User) => {
                this.user = user;
                this.sharedService.user = user;
                console.log(this.user.username);
                alert(this.updateMsg);
              }
            );
        })
      );
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.sharedService.user._id;
    this.show = this.user.role === 'teacher';

    console.log('in profile ts');
    console.log(this.sharedService.user);

    this.acRouter.params.subscribe(params => {
      this.username = this.user['username'];
    });
  }

  logout() {
    this.userService.logout().subscribe((data: any) => this.router.navigate(['/login']));
  }

  DeleteUser() {
    console.log('delete user');
    this.acRouter.params
      .subscribe(params => {
        return this.userService.deleteUser(this.user._id)
          .subscribe((res: any) => {
            console.log('delete user' + this.user._id);
            this.sharedService.user = null;
          });
      });
  }

}
