import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services';
import { User } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pa-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.sass']
})
export class ProfileEditComponent implements OnInit {
  
  profileEditForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  url="http://placehold.jp/e9edf2/007bff/150x150.png";
  currentUser: User[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService) { }

  ngOnInit() {
    this.profileEditForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    
    if(localStorage.getItem('currentUser')){
      let startUser = JSON.parse(localStorage.getItem('currentUser'));
      
      let base64Url = startUser.token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      let token = JSON.parse(window.atob(base64));

      this.userService.getUserById(token.id).subscribe(
        user => { 
          this.currentUser = user;
          this.url=user['picture'];

        }
      );
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileEditForm.controls; }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
        console.log(this.url);
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.profileEditForm.invalid) {
        return;
    }

    this.loading = true;
    
    this.userService.putUpdateUser(this.currentUser['id'], this.currentUser['name'], this.currentUser['picture'])
        .subscribe(
            data => {
              this.loading = false;
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.error = error,
              this.loading = false;
            });
  
    
  }

}
