import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import * as auth from '../auth/auth.actions';
import { AppState } from '../app.reducer';

import { User } from '../models/user.model';
import * as incomesEgressActions from '../income-egress/income-egress.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription!: Subscription;
  private _user!: User;

  get user(): User {
    return { ...this._user };
  }

  constructor(private auth: AngularFireAuth,
              public firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener(): void {
    this.auth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        this.userSubscription = this.firestore.doc(`${ firebaseUser.uid}/user`).valueChanges()
                                .subscribe((firestoreUser: any) => {
                                  const user = User.fromFirestore(firestoreUser);
                                  this._user = user;
                                  this.store.dispatch(auth.setUser({ user }));
                                });
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(auth.unsetUser());
        this.store.dispatch(incomesEgressActions.unsetItems());
      }
    });
  }

  createUser(name: string, email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
              const newUser = new User(user!.uid, name, email);

              return this.firestore.doc(`${ user!.uid }/user`).set({ ...newUser });
            });
  }

  login(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  isLogged(): Observable<boolean> {
    return this.auth.authState.pipe(
      map((firebaseUser) => firebaseUser !== null)
    );
  }
}
