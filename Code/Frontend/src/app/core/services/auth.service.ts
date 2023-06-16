import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { AccessToken } from 'src/app/shared/models/access-token.model';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { LocalStorageHelper } from '../utilities/local-storage.helper';
import { sidebarConfig } from 'src/app/shared/configdata/sidebar.config';
import { Router } from '@angular/router';
import { BroadcastService } from './broadcast.service';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { Login } from 'src/app/modules/auth/login/login.model';
import { MessagingService } from './messaging.service';
import { DoiMatKhau } from 'src/app/modules/auth/doi-mat-khau/doi-mat-khau.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AccessUserKey = 'AccessUserKey'
  currentAccessUser: AccessUser
  constructor(private apiService: ApiService, private router: Router, private broadcastService: BroadcastService,private messagingService: MessagingService) {
    this.currentAccessUser = this.getAccessUser()
  }

  getToken(): AccessToken {
    const accessUser = this.getAccessUser();
    if (accessUser != null) {
      return accessUser.AccessToken;
    }
    return null;
    //return this.currentAccessUser == null ? null : this.currentAccessUser.AccessToken
  }

  getAccessUser(): AccessUser {
    return LocalStorageHelper.getItem<AccessUser>(this.AccessUserKey)
  }

  saveAccessUser(accessUser: AccessUser) {
    LocalStorageHelper.setItem(this.AccessUserKey, accessUser);
  }

  destroyAccessUser() {
    LocalStorageHelper.removeItem(this.AccessUserKey);
  }

  login(loginObj: Login) {
    return this.apiService.post<AccessUser>('auth/Login', loginObj)
      .pipe(map(
        data => {
          this.setAuth(data);
          return data;
        }
      ));
  }
  //-----------Khoa--Phong--hoatdonglichsunhanvien-----

  verifyUsername(loginObj: Login) {
    return this.apiService.post<AccessUser>('auth/VerifyUsername', loginObj)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }
  verifyPassCode(loginObj: Login) {
    return this.apiService.post<AccessUser>('auth/VerifyPassCode', loginObj)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }
  setPassword(doiMatKhauObj: DoiMatKhau) {
    return this.apiService.post<AccessUser>('auth/SetPassword', doiMatKhauObj)
      .pipe(map(
        data => {
          //this.setAuth(data);
          return data;
        }
      ));
  }
  sendPassCode(loginObj: Login) {
    return this.apiService.post<AccessUser>('auth/SendPassCode', loginObj)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }
  forgetPassword(loginObj: Login) {
    return this.apiService.post<AccessUser>('auth/ForgetPassword', loginObj)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }
  expiredSection() {
    this.broadcastService.broadcast({
      name: "ExpiredSection",
      message: null
    });
  }

  logout() {
    this.currentAccessUser = null;
    this.destroyAccessUser();
    this.messagingService.stopReceiveMessage();
    this.router.navigate(['dang-nhap']);
  }

  setAuth(accessUser: AccessUser) {
    this.currentAccessUser = accessUser
    this.saveAccessUser(accessUser);
  }

  isAuthenticated() {
    return this.currentAccessUser != null;
  }
  getMenuInfo() {
    return this.currentAccessUser == null ? {} : this.currentAccessUser.MenuInfo
  }
  getAccessRoute() {
    if (this.currentAccessUser == null || this.currentAccessUser.MenuInfo == null) {
      return []
    }
    this.processRoute(sidebarConfig);
    this.processRouteHideParent(sidebarConfig);
    return sidebarConfig;
    // return sidebarConfig.filter(menuItem => (menuItem.canViewType == null && (menuItem.children == null || menuItem.children.length == 0)) ||
    //   (menuItem.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[menuItem.canViewType]] === true) ||
    //   (menuItem.canViewType == null && menuItem.children != null && menuItem.children.length > 0
    //     && menuItem.children.filter(childrenItem => (childrenItem.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[childrenItem.canViewType]] === true) ||
    //       (childrenItem.children != null && childrenItem.children.length > 0 && childrenItem.children.filter(childrenItem1 => (childrenItem1.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[childrenItem1.canViewType]] === true) ||
    //         (childrenItem1.children != null && childrenItem1.children.length > 0 && childrenItem1.children.filter(childrenItem2 => (childrenItem2.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[childrenItem2.canViewType]] === true) ||
    //           (childrenItem2.children != null && childrenItem2.children.length > 0 && childrenItem2.children.filter(childrenItem3 => (childrenItem3.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[childrenItem3.canViewType]] === true) ||
    //             (childrenItem3.children != null && childrenItem3.children.length > 0 && childrenItem3.children.filter(childrenItem4 => (childrenItem4.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[childrenItem4.canViewType]] === true)).length > 0)).length > 0)).length > 0)).length > 0)).length > 0));
  }
  processRoute(childrens:any[]){
    childrens.forEach(item=>{
      item.Hide=null;
      if(item.children!=null && item.children.length>0)
      {
        this.processRoute(item.children);
      }
      else{
        if(item.canViewType!=null)
        {
          if(this.currentAccessUser.MenuInfo['CanView' + DocumentType[item.canViewType]] !== true || item.siteType.indexOf(this.currentAccessUser.UserType)<0)
          {
            item.Hide=true;
          }
        }
      }
    });
  }
  
  processRouteHideParent(childrens:any[]){
    childrens.forEach(item=>{
      if(item.children!=null && item.children.length>0)
      {
        if(item.children.every(child=>child.Hide==true))
        {
          item.Hide=true;
        }
        else{
          item.Hide=null;
          this.processRouteHideParent(item.children);
          if(item.children.every(child=>child.Hide==true))
          {
            item.Hide=true;
          }
        }
      }
    })
  }
  isChildrenPermission(item: any): boolean {
    if (this.currentAccessUser == null || this.currentAccessUser.MenuInfo == null) {
      return false;
    }
    return (item != null && item.children != null && item.children.length > 0 && item.children.filter(childrenItem => (childrenItem.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[childrenItem.canViewType]] == true) ||
      (childrenItem.children != null && childrenItem.children.length > 0 && childrenItem.children.filter(childrenItem1 => (childrenItem1.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[childrenItem1.canViewType]] === true) ||
        (childrenItem1.children != null && childrenItem1.children.length > 0 && childrenItem1.children.filter(childrenItem2 => (childrenItem2.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[childrenItem2.canViewType]] === true) ||
          (childrenItem2.children != null && childrenItem2.children.length > 0 && childrenItem2.children.filter(childrenItem3 => (childrenItem3.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[childrenItem3.canViewType]] === true) ||
            (childrenItem3.children != null && childrenItem3.children.length > 0 && childrenItem3.children.filter(childrenItem4 => (childrenItem4.canViewType != null && this.currentAccessUser.MenuInfo['CanView' + DocumentType[childrenItem4.canViewType]] === true)).length > 0)).length > 0)).length > 0)).length > 0)).length > 0);
  }
  getChilds(item:any){
    if(item!=null && item.children!=null && item.children.length>0)
    {
      var arr=[];
      item.children.forEach(element => {
        if(this.currentAccessUser.MenuInfo['CanView' + DocumentType[element.canViewType]] == true)
        {
          arr.push(element);
        }
      });
      return arr;      
    }
    else{
      return [];
    }
  }
  findObjectByMultiKey(array: any, keys: any[], values: any[]): any {
    for (var i = 0; i < array.length; i++) {
      var c = 0;
      for (var j = 0; j < keys.length; j++) {
        if (array[i][keys[j]] === values[j]) {
          c++;
        }
      }
      if (c == keys.length) {
        return array[i];
      }
    }
    return null;
  }
  hasPermission(documentType: any, securityOperation: any) {
    if (this.currentAccessUser == null) {
      return false
    }
    return this.findObjectByMultiKey(this.currentAccessUser.Permissions, ["SecurityOperation", "DocumentType"], [securityOperation, documentType]) != null;
  }
}
