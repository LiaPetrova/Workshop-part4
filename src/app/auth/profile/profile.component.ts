import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isInEditMode: boolean = false;
  currentUser: IUser;

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/user/login']);
      }
    })
  }

  enterEditMode(): void {
    this.isInEditMode = true;

    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        username: this.currentUser.username,
        email: this.currentUser.email,
        'select-tel': this.currentUser.tel && this.currentUser.tel.length > 5
        ? this.currentUser.tel.substring(0, 5) : '',
        tel: this.currentUser.tel && this.currentUser.tel.length > 5
        ? this.currentUser.tel.substring(5) : this.currentUser.tel
      });
    })
  }

  updateProfile(): void {
    console.log(this.editProfileForm.value);
    this.isInEditMode = false;
    
  }

}
