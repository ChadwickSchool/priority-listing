import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first, map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User>;
  userID: string;
  email: string;
  displayName: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // if logged in
        if (user) {
          this.userID = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // if logged out
          return of(null);
        }
      })
    );
  }

  // google sign in
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.userID = credential.user.uid;
    this.email = credential.user.email;
    const userRef: AngularFirestoreDocument = this.afs.doc<User>(
      `users/${credential.user.uid}`
    );

    // get userID
    userRef.valueChanges().subscribe((user) => {
      this.userID = credential.user.uid;
      console.log('userID: ' + this.userID);
      console.log('email: ' + this.email);

      if (user) {
        return user; // if the user exists in the database
      } else {
        return this.createStudentUser(credential.user); // create new user
      }
    });

    // get email
    userRef.valueChanges().subscribe((user) => {
      this.email = credential.user.email;
      this.displayName = credential.user.displayName;
      if (user) {
        return user; // if the user exists in the database
      } else {
        return null; // dont want a new email, only already authorized-as-an-admin user
      }
    });
  }

  // get firebase user id
  getFirebaseUserID(): string {
    console.log('userID: ' + this.userID);
    return this.userID;
  }

  getFirebaseDisplayName(): string {
    return this.displayName;
  }

  // get firebase email
  getFirebaseEmail(): string {
    console.log('email: ' + this.email);
    return this.email;
  }

  // Firebase User
  getAuthenticatedUser(): Promise<firebase.User> {
    return this.afAuth.authState.pipe(take(1)).toPromise();
  }

  // create a user if not in database
  private createStudentUser(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    this.userID = user.uid;
    const data = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      isAdmin: false,
    };

    return userRef.set(data, { merge: true });
  }

  // user sign out
  async signOut() {
    this.userID = undefined;
    await this.afAuth.auth.signOut();
  }
}
