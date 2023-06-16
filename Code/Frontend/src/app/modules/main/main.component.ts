
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
declare let $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  tabActive:number=1;
  linkPre:string=null;
  componentAddOrEdit:any;
  componentremove:any;
  showMenu:boolean=true;
  searchString:string;
  navigationitems:any=[];
  constructor(public dialog: MatDialog,private authService:AuthService) {

    this.navigationitems =  this.authService.getAccessRoute();
  }

  ngOnInit() {
    // $("main").css({"height":$(window).height()-65});
    // $(window).resize(function(){
    //   $("main").css({"height":$(window).height()-65});
    // });
  }
  componentAddOrEdited(event:any){
    this.componentAddOrEdit=event;
    this.formatContent();
  }
  componentRemoved(event:any){
    this.componentremove=event;
    this.linkPre=null;
  }

  formatContent() {
    if ($(".grid-content") != null && $(".grid-content").length > 0) {
      $(".grid-content").css({ "height": $(window).height() - 94 });
    }
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
        this.search();
    }
  }
  search(){
    this.resetSearch(this.navigationitems);
    if(this.searchString!=null && this.searchString!="")
    {
      this.searchFunction(this.navigationitems,null,this.searchString);
    }
  }
  resetSearch(navigationitems:any){
    navigationitems.forEach(item => {
      item.Hide=null;
      if(item.children!=null && item.children.length>0)
      {
        this.resetSearch(item.children)
      }
    });
  }
  searchFunction(navigationitems:any,parent:any,str:string){
    navigationitems.forEach(item => {
      if(CommonService.removeVietnamese(item.label).toLowerCase().indexOf(CommonService.removeVietnamese(str).toLowerCase())<0)
      {
        item.Hide=true;
      }
      else{
        if(parent!=null && !parent.children.every(child=>child.Hide==true))
        {
          parent.Hide=null;
        }
      }
      if(item.children!=null && item.children.length>0)
      {
        this.searchFunction(item.children,item,str)
      }
    });
  }
}
