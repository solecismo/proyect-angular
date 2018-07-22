import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, AuthenticationService } from '../../_services';
import {User} from '../../_models';
import { first  } from 'rxjs/operators';

@Component({
  selector: 'pa-profile-edit-password',
  templateUrl: './profile-edit-password.component.html',
  styleUrls: ['./profile-edit-password.component.sass']
})
export class ProfileEditPasswordComponent implements OnInit {
  
  editPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  currentUser: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService,
    private authenticationService:AuthenticationService
  ) { }

  ngOnInit() {
    this.editPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      passwordNew: ['', Validators.required],
      confirmPasswordNew: ['', Validators.required]
    },{
      validator: ProfileEditPasswordComponent.MatchPassword // your validation method
    });

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

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';

    
  }

  // convenience getter for easy access to form fields
  get f() { return this.editPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.editPasswordForm.invalid) {
        return;
    }

    this.loading = true;

    this.userService.putUpdatePassword(this.currentUser.id,this.currentUser.email, this.f.password.value, this.f.passwordNew.value)
        .subscribe(
            data => {
              this.authenticationService.login(this.currentUser.email, this.f.passwordNew.value)
              .pipe(first())
              .subscribe(
                  data => {
                      this.router.navigate([this.returnUrl]);
                  },
                  error => {
                      this.error = 'Email or Contraseña es incorrecto',
                      this.loading = false;
                  });
            },
            error => {
              this.error = error,
              this.loading = false;
            });
    
    
  }

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('passwordNew').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPasswordNew').value; // to get value in input tag
     if(password != confirmPassword) {
         //console.log('false');
         AC.get('confirmPasswordNew').setErrors( {MatchPassword: true} )
     } else {
        // console.log('true');
         return null
     }
 }

}
