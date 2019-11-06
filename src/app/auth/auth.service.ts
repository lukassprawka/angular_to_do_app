import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public angularFire: AngularFireAuth, private router: Router) {
    angularFire.authState.subscribe(user => {
      this.user = user;
      this.router.navigate(['/todoTasks']);
    });
   }

  login(email: string, password: string){
    this.angularFire.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.router.navigate(['/todoTasks']);
    }).catch(err => {
      console.error(err);
    });
  }

  signup(email: string, password: string){
    this.angularFire.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.router.navigate(['/todoTasks']);
    }).catch(err => {
      console.error(err);
    });
  }

  logout(){
    this.angularFire.auth.signOut();
  }

}
