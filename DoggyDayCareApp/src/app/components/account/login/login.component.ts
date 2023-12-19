import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/auth/account.service';
import { AlertService } from 'app/auth/alert.service';
import { User } from 'app/auth/user';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  @Output() loggedInUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(
      private formBuilder: FormBuilder,
      private accountService: AccountService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    
      this.submitted = true;
      
      

      // reset alerts on submit
      this.alertService.clear();
      

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      
      this.accountService.logIn(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe({
              next: (user) => {
                  this.loggedInUser.emit(user); 
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
}