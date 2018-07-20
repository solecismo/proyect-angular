import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services';
import {User} from '../_models';

@Component({
  selector: 'pa-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  currentUser: User[] = [];
  constructor(private userService:UserService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      let startUser = JSON.parse(localStorage.getItem('currentUser'));
      
      let base64Url = startUser.token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      let token = JSON.parse(window.atob(base64));

      this.userService.getUserById(token.id).subscribe(
        user => { 
          this.currentUser = user; 
        }
      );

    }
  }

}
