import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'pa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
 
  constructor(private userService: UserService) {}

  ngOnInit() {
    /*this.userService.getAll().pipe(first()).subscribe(
      users => { 
        this.users = users; 
      }
    );*/
  }
}