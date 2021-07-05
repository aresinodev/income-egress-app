import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IncomeEgress } from '../models/income-egress.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeEgressService {

  constructor(private firestore: AngularFirestore,
              private authSvc: AuthService) { }

  createIncomeOrEgress(incomeEgress: IncomeEgress): Promise<any> {
    const { uid } = this.authSvc.user;

    delete incomeEgress.uid;

    return this.firestore.doc(`${ uid }/incomes-egresses`)
        .collection('items')
        .add({ ...incomeEgress });
  }

  incomesEgressesListener(uid: string): Observable<IncomeEgress[]> {
    return this.firestore.collection(`${ uid }/incomes-egresses/items`)
    .snapshotChanges()
    .pipe(
      map(
        snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        }))
      )
    );
  }

  deleteIncomeEgress(uidItem: string): Promise<void> {
    const uidUser = this.authSvc.user.uid;

    return this.firestore.doc(`${ uidUser }/incomes-egresses/items/${ uidItem }`).delete();
  }
}
