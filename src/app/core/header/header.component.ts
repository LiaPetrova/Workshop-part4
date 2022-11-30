import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from '../interfaces';
import { MessageBusService, MessageType } from '../message-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  private isLoggingOut: boolean = false;

  private subscription: Subscription;

  message: string;

  isMessageError: boolean;

  constructor(public authService: AuthService, private router: Router, private messageBus: MessageBusService) {

  }

  ngOnInit(): void {
    this.subscription = this.messageBus.onNewMessage$.subscribe(newMessage => {
      this.message = newMessage?.text || '';
      this.isMessageError = newMessage?.type === MessageType.Error;

      if(this.message) {
        setTimeout(() => {
        this.messageBus.clear()
      }, 5000); 
      }
      
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logoutHandler(): void {

    if(this.isLoggingOut) {
      return;
    } 

    this.isLoggingOut = true;

    this.authService.logout$().subscribe({
      next: args => {
        console.log(args);        
      },
      complete: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.isLoggingOut = false;
      }
    });
  }
}
