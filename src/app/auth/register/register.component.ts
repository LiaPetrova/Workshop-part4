import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CreateUserDto, UserService } from 'src/app/core/user.service';
import { emailValidator, passwordsMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls.passwords as FormGroup;
  }

  passwordControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl('', [Validators.required, Validators.minLength(5)]),
    'email': new FormControl('', [Validators.required, emailValidator]),
    'tel': new FormControl(''),
    'telRegion': new FormControl(''),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'repassword': new FormControl('', [passwordsMatch(this.passwordControl)])
    })
  });

  constructor(
    private formBuilder: FormBuilder,
     private authService: AuthService,
     private router: Router) { }

  ngOnInit(): void {
  }

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  handleRegister(): void {
    const { username, email, passwords, telRegion, tel } = this.registerFormGroup.value;
    const body: CreateUserDto = {
      username: username,
      email: email,
      password: passwords.password,
      // ...(!!tel && {tel: telRegion + tel})
    }

    if(!!tel) {
      body.tel = telRegion + tel;
    }

    this.authService.register$(body).subscribe(() => {
      this.registerFormGroup.reset(); 
      this.router.navigate(['/home']);
    });
    
  }

 
}
