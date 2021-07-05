import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  displayName!: string;
  userSubs!: Subscription;

  constructor(private authSvc: AuthService,
              private router: Router,
              private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter(({ user }) => user !== null)
    )
    .subscribe(({ user }) => this.displayName = user?.name);
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logout(): void {
    Swal.fire({
      title: 'Cerrando sesión...',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    this.authSvc.logout().then(() => {
      Swal.close();
      this.router.navigate(['/login']);
    });
  }
}
