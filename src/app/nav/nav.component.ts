import { Component, OnInit } from '@angular/core';
import { first  } from 'rxjs/operators';
import { UserService } from '../_services';
import { User } from '../_models';


@Component({
  selector: 'pa-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  currentUser: User[] = [];
 
  constructor(private userService: UserService) {}

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
