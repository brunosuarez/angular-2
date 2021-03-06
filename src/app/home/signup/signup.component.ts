import { PlatformDetectorService } from './../../core/platform-detector/platform-detector.service';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validators.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validators';
import { NewUser } from './new-user';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  providers: [ UserNotTakenValidatorService]
})

export class SignUpComponent implements OnInit{

  signupForm: FormGroup;
  @ViewChild('inputEmail') inputEmail: ElementRef<HTMLInputElement>

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService){}

  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      userName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      password: ['',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
    })

    this.platformDetectorService.isPlatformBrowser() &&
    this.inputEmail.nativeElement.focus();
  }

  signup(){
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signUpService
      .signup(newUser)
      .subscribe(() => this.router.navigate(['']))
  }
}
