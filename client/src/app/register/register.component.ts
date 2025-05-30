import { Component, inject, OnInit, output} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from '../_forms/text-input/text-input.component';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInputComponent, NgFor, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountsService);
  private router = inject(Router);
  cancelRegister = output<boolean>();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  ngOnInit(): void {
    this.initializeForm();
  }

  //Another (more appropreate approach):
  //this.registerForm = this.fr.group({
  //  username: ['', Validators.required]
  //});

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
    
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register() {
    console.log(this.registerForm.value)
    this.accountService.register(this.registerForm.value).subscribe({
      next: response => this.router.navigateByUrl('/members'),
      error: error => this.validationErrors = error
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
