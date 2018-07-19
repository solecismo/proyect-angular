import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService,UserService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pa-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService : UserService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{
      validator: RegisterComponent.MatchPassword // your validation method
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.postCreateUser(this.f.email.value, this.f.password.value)
        .subscribe(
            data => {
              this.authenticationService.login(this.f.email.value, this.f.password.value)
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
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
     if(password != confirmPassword) {
         console.log('false');
         AC.get('confirmPassword').setErrors( {MatchPassword: true} )
     } else {
         console.log('true');
         return null
     }
 }

}
