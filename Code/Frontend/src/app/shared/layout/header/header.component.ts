import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { EnumCloudMessagingType } from 'src/app/shared/enum/cloud-messaging-type.enum';
import { AccessUser } from '../../models/access-user.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { SystemMessage } from '../../configdata/system-message';
import { SecurityOperation } from '../../enum/security-operation.enum\'';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaiKhoanComponent } from 'src/app/modules/main/thong-tin-tai-khoan/tai-khoan/tai-khoan.component';
import { DoiMatKhauComponent } from 'src/app/modules/main/thong-tin-tai-khoan/doi-mat-khau/doi-mat-khau.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private subs: Subscription[] = [];
  urlActive: string = "";
  currentAccessUser: AccessUser = null;
  navigationitems: any = [];
  @Input() showMenu: boolean = false;
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, 
    private messagingService: MessagingService, private snackBar: MatSnackBar,
    private ren: Renderer2) {

  }

  ngOnInit() {
    this.currentAccessUser = this.authService.getAccessUser();
    this.navigationitems = this.authService.getAccessRoute();
    this.urlActive = this.router != null && this.router.routerState != null && this.router.routerState.snapshot != null ? this.router.routerState.snapshot.url : "";
    this.router.events.subscribe((val: any) => {
      // see also 
      if (val.url != undefined) {
        this.urlActive = val.url;
      }
    });
    this.messagingService.receiveMessage();
    const sub = this.messagingService.currentMessage.subscribe(payload => {
      if (payload != null && payload.data != null) {
        if (payload.data.CloudMessagingType == EnumCloudMessagingType.Chat) {
          //
        }
        else if (payload.data.CloudMessagingType == EnumCloudMessagingType.Notification) {
          //
        }
      }
    });
    this.subs.push(sub);
  }
  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }
  getChilds(item: any) {
    if (item != null && item.children != null && item.children.length > 0) {
      var arr = [];
      item.children.forEach(element => {
        if (this.currentAccessUser.MenuInfo['CanView' + DocumentType[element.canViewType]] == true || (element.children != null && element.children.length > 0)) {
          arr.push(element);
        }
      });
      return arr;
    }
    else {
      return [];
    }
  }
  isActive(route: string) {
    return this.urlActive.indexOf(route) >= 0;
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  account() {

    if (this.authService.hasPermission(DocumentType.QuanTriNhomNhanVienTaiKhoanNguoiDung, SecurityOperation.View)) {
      let dialogRef = this.dialog.open(TaiKhoanComponent, {
        data: {
        },
        width: '500px',
        maxHeight: '95%',
        maxWidth: '95%'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.authService.logout();
        }
      });
    } else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }
    //this.router.navigate(["/tai-khoan"]);
  }

  dangXuat() {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn thoát khỏi chương trình?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.authService.logout();
      }
    });
  }
  doiMatKhau() {
    if (this.authService.hasPermission(DocumentType.QuanTriNhomNhanVienTaiKhoanNguoiDung, SecurityOperation.Update)) {
      let dialogRef = this.dialog.open(DoiMatKhauComponent, {
        data: {
        },
        width: '300px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.authService.logout();
        }
      });
    } else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }
  }
  showPopup(item: any) {
    let dialogRef = this.dialog.open(item.data.component, {
      disableClose: false,
      width: item.data.width,
      data: {
        created: true,
        dataItem: item.data.dataItem
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != undefined && result != "") {
      }
    });
  }
  //#region Xử lý hover

  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;
  menuenter() {
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger, button) {
    setTimeout(() => {
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80)
  }

  menu2enter() {
    this.isMatMenu2Open = true;
  }

  menu2Leave(trigger1, trigger2, button) {
    setTimeout(() => {
      if (this.isMatMenu2Open) {
        trigger1.closeMenu();
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        this.enteredButton = false;
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenu2Open = false;
        trigger2.closeMenu();
      }
    }, 100)
  }

  buttonEnter(trigger) {
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger != trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        trigger.openMenu();
        this.ren.removeClass(trigger.menu._allItems.first['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(trigger.menu._allItems.first['_elementRef'].nativeElement, 'cdk-program-focused');
      }
      else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger
        trigger.openMenu();
        this.ren.removeClass(trigger.menu._allItems.first['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(trigger.menu._allItems.first['_elementRef'].nativeElement, 'cdk-program-focused');
      }
      else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger
      }
    }, 100)
  }

  buttonLeave(trigger, button) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } if (!this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.enteredButton = false;
      }
    }, 100)
  }
  //#endregion Xử lý hover

  onKey(event: any) {
    if (event.key == 'Enter') {
      this.search();
    }
  }
  search() {

  }
  view(url: string,queryParams:any) {
    var navigationExtras = {
      queryParams: queryParams,
      replaceUrl: true, // optional
    };
    this.router.navigate([url], navigationExtras);
  }
}
