import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DocumentType } from "src/app/shared/enum/document-type.enum";
import { AccessUser } from 'src/app/shared/models/access-user.model';
declare let $: any;


@Component({
  selector: 'app-tu-dien-dich-vu-ky-thuat',
  templateUrl: './tu-dien-dich-vu-ky-thuat.component.html',
  styleUrls: ['./tu-dien-dich-vu-ky-thuat.component.scss']
})
export class TuDienDichVuKyThuatComponent implements OnInit {

  id: number = null;
  dataChon: any;
  timKiemModel: any = {};
  accessUser:AccessUser;
  documentType: DocumentType;
  dataSource:any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog,  private authService:AuthService,private router: Router) {
    this.id = this.route.snapshot.queryParams.id;
  }
//#region init
  ngOnInit() {
    this.accessUser=this.authService.getAccessUser();
    this.documentType = DocumentType.CdhaTdcnDanhMucTuDienDichVuKyThuat;
    
    this.getData();
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.id != null) {
      var self=this;
      setTimeout(function(){
        self.viewDetail(self.id);
      });
    }
  }
  getData(){
    this.dataSource= [
      {
        NodeId: 1, ParentNodeId: null, NodeName: "CHẨN ĐOÁN HÌNH ẢNH",  Disabled: true,   
        NodeChilds: [
          {          
            NodeId: 11, NodeName: " SIÊU ÂM", ParentNodeId: 1, Disabled: true,     
            NodeChilds:[
              {NodeId: 111, NodeName: "Siêu âm Doppler mạch cấp cứu tại giường", ParentNodeId: 11, Disabled: false,     NodeChilds: []},
              {NodeId: 112, NodeName: "Siêu âm dẫn đường đặt catheter tĩnh mạch cấp cứu", ParentNodeId: 11, Disabled: false,     NodeChilds: []},
              {NodeId: 113, NodeName: "Siêu âm Doppler xuyên sọ", ParentNodeId: 11, Disabled: false,     NodeChilds: []},
              {NodeId: 114, NodeName: "Siêu âm dẫn đường đặt catheter động mạch cấp cứu", ParentNodeId: 11, Disabled: false,     NodeChilds: []},
              {NodeId: 115, NodeName: "Siêu âm ổ bụng tại giường cấp cứu", ParentNodeId: 11, Disabled: false,     NodeChilds: []}
            ]
          },
          {          
            NodeId: 12, NodeName: "XQUANG THƯỜNG", ParentNodeId: 1, Disabled: true,     
            NodeChilds:[
              {NodeId: 121, NodeName: "Siêu âm Doppler mạch cấp cứu tại giường", ParentNodeId: 12, Disabled: false,     NodeChilds: []},
              {NodeId: 122, NodeName: "Siêu âm dẫn đường đặt catheter tĩnh mạch cấp cứu", ParentNodeId: 12, Disabled: false,     NodeChilds: []},
              {NodeId: 123, NodeName: "Siêu âm Doppler xuyên sọ", ParentNodeId: 12, Disabled: false,     NodeChilds: []},
              {NodeId: 124, NodeName: "Siêu âm dẫn đường đặt catheter động mạch cấp cứu", ParentNodeId: 12, Disabled: false,     NodeChilds: []},
              {NodeId: 125, NodeName: "Siêu âm ổ bụng tại giường cấp cứu", ParentNodeId: 12, Disabled: false,     NodeChilds: []}
            ]
          }
        ]
      },
      {
        NodeId: 2, ParentNodeId: null, NodeName: "THĂM DÒ CHỨC NĂNG", Disabled: true,  
        NodeChilds: [
          {          
            NodeId: 21, NodeName: " SIÊU ÂM", ParentNodeId: 2, Disabled: true,     
            NodeChilds:[
              {NodeId: 211, NodeName: "Siêu âm Doppler mạch cấp cứu tại giường", ParentNodeId: 21, Disabled: false,     NodeChilds: []},
              {NodeId: 212, NodeName: "Siêu âm dẫn đường đặt catheter tĩnh mạch cấp cứu", ParentNodeId: 21, Disabled: false,     NodeChilds: []},
              {NodeId: 213, NodeName: "Siêu âm Doppler xuyên sọ", ParentNodeId: 21, Disabled: false,     NodeChilds: []},
              {NodeId: 214, NodeName: "Siêu âm dẫn đường đặt catheter động mạch cấp cứu", ParentNodeId: 21, Disabled: false,     NodeChilds: []},
              {NodeId: 215, NodeName: "Siêu âm ổ bụng tại giường cấp cứu", ParentNodeId: 21, Disabled: false,     NodeChilds: []}
            ]
          },
          {          
            NodeId: 22, NodeName: "XQUANG THƯỜNG", ParentNodeId: 2, Disabled: true,     
            NodeChilds:[
              {NodeId: 221, NodeName: "Siêu âm Doppler mạch cấp cứu tại giường", ParentNodeId: 22, Disabled: false,     NodeChilds: []},
              {NodeId: 222, NodeName: "Siêu âm dẫn đường đặt catheter tĩnh mạch cấp cứu", ParentNodeId: 22, Disabled: false,     NodeChilds: []},
              {NodeId: 223, NodeName: "Siêu âm Doppler xuyên sọ", ParentNodeId: 22, Disabled: false,     NodeChilds: []},
              {NodeId: 224, NodeName: "Siêu âm dẫn đường đặt catheter động mạch cấp cứu", ParentNodeId: 22, Disabled: false,     NodeChilds: []},
              {NodeId: 225, NodeName: "Siêu âm ổ bụng tại giường cấp cứu", ParentNodeId: 22, Disabled: false,     NodeChilds: []}
            ]
          }
        ]
      },
    ];
  }
  //#endregion init 

//#region actions
  quayLaiChange() {
    this.dataChon = null;
    this.back();
  }
  dataChange(event) {
    if (event) {
    }
  }
  back() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        id: null
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // trigger navigation
    });
    if($(".panel").length>0)
    {
      $(".panel").removeClass("has-detail");
    }
  }
  viewDetail(id:number){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        id: id
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // trigger navigation
    });
    if($(".panel").length>0)
    {
      $(".panel").addClass("has-detail");
    }
    this.id =id;
  }
  chonTuDien(node:any){
    console.log(node);
    this.dataChon=node;
    this.viewDetail(node.nodeId);
  }
  //#endregion actions

}
