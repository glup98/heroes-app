import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const canActivateAuthGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return checkAuth();
};

export const canMatchAuthGuard: CanMatchFn = (
  _route: Route,
  _segments: UrlSegment[]
) => {
  return checkAuth();
};

const checkAuth = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuth().pipe(
    tap((isAuth) => {
      if (!isAuth) {
        router.navigate(['/auth/login']);
      }
    })
  );
};
