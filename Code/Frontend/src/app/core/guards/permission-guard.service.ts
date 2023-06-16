import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';



@Injectable()
export class PermisssionGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot) {
      // this will be passed from the route config
      // on the data property
      const documentType = route.data.DocumentType;
      const securityOperation = route.data.SecurityOperation;

      if (this.authService.hasPermission(documentType, securityOperation) != true) {
        this.router.navigate(['/khong-co-quyen']);
        return false;
      }
      return true;
    }
}