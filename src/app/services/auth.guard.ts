import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
              private router: Router) {}
              
    canLoad(): Observable<boolean> {
      return this.authService.isLogged().pipe(
        tap((logged) => {
          if (!logged) {
            this.router.navigate(['/login']);
          }
        }),
        take(1)
      );
    }
    canActivate(): Observable<boolean> {
      return this.authService.isLogged().pipe(
        tap((logged) => {
          if (!logged) {
            this.router.navigate(['/login']);
          }
        })
      );
    }
}
