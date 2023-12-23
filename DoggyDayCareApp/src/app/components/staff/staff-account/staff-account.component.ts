import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/auth/account.service';
import { AlertService } from 'app/auth/alert.service';
import { Staff } from 'app/models/staff';
import { first } from 'rxjs';

@Component({
  selector: 'app-staff-account',
  templateUrl: './staff-account.component.html',
  styleUrls: ['./staff-account.component.css']
})
export class StaffAccountComponent implements OnInit {
    @Input() staff!: Staff;
    form!: FormGroup;
    loading = false;
    submitted = false;
  
    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService
    ) {}
  
    ngOnInit() {
      this.form = this.formBuilder.group({
        firstName: this.staff.forename,
        lastName: this.staff.surname,
        email: this.staff.email,
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
  
    // convenience getter for easy access to form fields
    get f() {
      return this.form.controls;
    }
  
    onSubmit() {
      this.submitted = true;
  
      // reset alerts on submit
      this.alertService.clear();
  
      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }
  
      this.loading = true;
      this.accountService
        .register(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success('Registration successful', {
              keepAfterRouteChange: true,
            });
            this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error: (error) => {
            this.alertService.error(error);
            this.loading = false;
          },
        });
    }
  }
  