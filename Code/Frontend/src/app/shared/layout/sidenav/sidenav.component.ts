import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AccessUser } from '../../models/access-user.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  currentAccessUser:AccessUser=null;
  urlActive:string="";
  @Input() navigationitems:any=[];
  @Output() sidenavClose = new EventEmitter();
  constructor(private router:Router,private authService:AuthService,public dialog: MatDialog) { 
    this.currentAccessUser=this.authService.getAccessUser();
    //this.navigationitems =  this.authService.getAccessRoute();
  }

  ngOnInit() { 
    this.urlActive=this.router!=null && this.router.routerState!=null && this.router.routerState.snapshot!=null ? this.router.routerState.snapshot.url:"";
    this.router.events.subscribe((val:any) => {
      // see also 
      if(val.url!=undefined)
      {
        this.urlActive=val.url;
      }
    });
    this.openParentMenu(this.navigationitems);
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
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
  showPopup(item:any){
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
  isActive(route:string){
    return this.urlActive.indexOf(route)>=0 ;
  }
  openParentMenu(navigationitems:any){
    navigationitems.forEach(item => {
      if(this.urlActive.indexOf(item.route)>=0)
      {
        item.Show=true;
      }
      if(item.children!=null && item.children.length>0)
      {
        this.openParentMenu(item.children)
      }
    });
  }
}
