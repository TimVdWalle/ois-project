import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import { Storage } from '@ionic/storage';
 
export class User {
  name: string;
  email: string;
  
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: User;
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (
          (credentials.password === "t" && credentials.email === "t") || (credentials.password === "test" && credentials.email === "tim@vandewalle.mobi")
          ||(credentials.password === "a" && credentials.email === "a") || (credentials.password === "test" && credentials.email === "astrid.sierens@vub.be")
          ||(credentials.password === "r" && credentials.email === "r") || (credentials.password === "test" && credentials.email === "ronald.irenus.michiels@vub.be")
          );
        
        if(credentials.email === "t" || credentials.email === "tim@vandewalle.mobi"){
          this.currentUser = new User('test', 'tim@vandewalle.mobi');
        } else if(credentials.email === "a" || credentials.email === "astrid.sierens@vub.be"){
          this.currentUser = new User('test', 'astrid.sierens@vub.be');
        } else if(credentials.email === "r" || credentials.email === "ronald.irenus.michiels@vub.be"){
            this.currentUser = new User('test', 'ronald.irenus.michiels@vub.be');
        }
          

        //this.storage.set('userName', "test");

        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}