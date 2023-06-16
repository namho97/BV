import { ChangeDetectorRef, Component, OnInit,ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { SecurityOperation } from 'src/app/shared/enum/security-operation.enum\'';

@Component({
  selector: 'app-khoa-phong-nhan-vien',
  templateUrl: './khoa-phong-nhan-vien.component.html',
  styleUrls: ['./khoa-phong-nhan-vien.component.scss']
})
export class KhoaPhongNhanVienComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableKhoaPhongNhanVien", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute, private authService: AuthService,
    private dialog: MatDialog,private apiService: ApiService,private snackBar: MatSnackBar) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initKhoaPhongNhanVien();
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.id != null) {
      var self=this;
      setTimeout(function(){
        self.table.view(self.id);
      });
    }
  }
  khoaPhongNhanVienQueryInfo:any={};
  khoaPhongNhanVienSearching:boolean=false;
  columnsKhoaPhongNhanVien: TableColumn<any>[] = [];
  groupByColumnsKhoaPhongNhanVien: string[] = ['TenKhoaPhong'];
  sortByColumnKhoaPhongNhanVien: SortDescriptor = { field: 'TenNhanVien', dir: 'desc' };
  documentTypeKhoaPhongNhanVien: DocumentType;

  initKhoaPhongNhanVien() {
    this.documentTypeKhoaPhongNhanVien = DocumentType.QuanTriNhomKhoaPhongKhoaPhongNhanVien;
    this.columnsKhoaPhongNhanVien = [
      { label: 'Tên khoa phòng', property: 'TenKhoaPhong', type: 'text', width: 150, visible: true,isLink:true,sticky:true },
      { label: 'Tên phòng khám', property: 'TenPhongKham', type: 'text', minWidth : 100, visible: true },
      { label: 'Tên nhân viên', property: 'TenNhanVien', type: 'text', width: 100, visible: true },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];

  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.khoaPhongNhanVienQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.khoaPhongNhanVienSearching=true;
  }
  huyTimKiem(){
    this.khoaPhongNhanVienQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.khoaPhongNhanVienSearching=false;
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
  //#region actions
  extDataItemSelected(event)
  {
    this.dataChon = event;
    this.cdref.detectChanges();

  }
  quayLaiChange() {
    this.dataChon = null;
    this.table.back();
  }
  quayLaiVaTaiLaiChange(){
    this.dataChon = null;
    this.table.back();
    this.table.refresh();
  }
  dataChange(event) {
    if (event) {
      this.table.search();
    }
  }
  updateKhoaPhongNhanVien(id: number, hieuLuc: boolean) {
    hieuLuc 
    id
    let comfirm = "ngừng sử dụng";
    if (!hieuLuc) comfirm = "sử dụng";
    if (hieuLuc) comfirm = "ngừng sử dụng";
    var self = this;
   
    if (this.authService.hasPermission(this.documentTypeKhoaPhongNhanVien, SecurityOperation.Update)) {

      this.dialog.open(ConfirmComponent, {
        disableClose: false,
        width: '400px',
        data: { message: CommonService.format(SystemMessage.MessLockTemplate, [comfirm, "khoa phòng - nhân viên"]) }
      }).afterClosed().subscribe(result => {/* result is a string:Yes,No,No answer*/
        if (result == true) {
          self.apiService.post("QuanTriNhomKhoaPhongKhoaPhongNhanVien/KichHoatHieuLuc?id=" + id).subscribe(
            () => {
              self.table.search();
              if (hieuLuc)
              CommonService.openSnackBar(this.snackBar, CommonService.format(SystemMessage.ActionSuccessfully, ["Ngừng sử dụng"]));
              else
              CommonService.openSnackBar(this.snackBar, CommonService.format(SystemMessage.ActionSuccessfully, ["Sử dụng"]));
            },
            (err: any) => {
              CommonService.openSnackBar(this.snackBar, err.Message, "error");
            });
        }
      });
    }
    else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }
  }
  //#endregion actions
}
