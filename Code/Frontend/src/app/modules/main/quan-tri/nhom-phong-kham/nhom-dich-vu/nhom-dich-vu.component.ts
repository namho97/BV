import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TreeComponent } from 'src/app/shared/components/tree/tree.component';
import { DocumentType } from "src/app/shared/enum/document-type.enum";
import { AccessUser } from 'src/app/shared/models/access-user.model';
declare let $: any;


@Component({
  selector: 'app-nhom-dich-vu',
  templateUrl: './nhom-dich-vu.component.html',
  styleUrls: ['./nhom-dich-vu.component.scss']
})
export class NhomDichVuComponent implements OnInit {

  id: number = null;
  dataChon: any;
  timKiemModel: any = {};
  accessUser: AccessUser;
  documentType: DocumentType;
  dataSource: any;
  @ViewChild("treeTrieuChung", { static: true }) tree:TreeComponent;
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private authService: AuthService, private router: Router) {
    this.id = this.route.snapshot.queryParams.id;
  }
  //#region init
  ngOnInit() {
    this.accessUser = this.authService.getAccessUser();
    this.documentType = DocumentType.QuanTriNhomPhongKhamDichVuKham;
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.id != null) {
      var self = this;
      setTimeout(function () {
        self.viewDetail(self.id);
      });
    }
  }
  gridTree() {
    this.viewDetail(0);
  }
  
  //#endregion init 

  //#region actions
  quayLaiChange() {
    this.dataChon = null;
    this.back();
  }
  dataChange(event) {
    if (event) {
      this.tree.tim();
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
    if ($(".panel").length > 0) {
      $(".panel").removeClass("has-detail");
    }
  }
  viewDetail(id: number) {
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
    if ($(".panel").length > 0) {
      $(".panel").addClass("has-detail");
    }
    this.id = id;
  }
  chonTuNhomDichVu(node: any) {
    this.dataChon = node;
    this.viewDetail(node.nodeId);
  }
  //#endregion actions

}
