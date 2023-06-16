import { ChangeDetectorRef, Component, OnInit,ViewChild ,TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { SecurityOperation } from 'src/app/shared/enum/security-operation.enum\'';

@Component({
  selector: 'app-icd',
  templateUrl: './icd.component.html',
  styleUrls: ['./icd.component.scss']
})
export class IcdComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableICD", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute, private authService: AuthService,
    private dialog: MatDialog,private apiService: ApiService,private snackBar: MatSnackBar) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initICD();
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
  @ViewChild('trangThaiTemplate', { static: true }) trangThaiTemplate: TemplateRef<any>;
  iCDQueryInfo:any={};
  iCDSearching:boolean=false;
  columnsICD: TableColumn<any>[] = [];
  groupByColumnsICD: string[] = [];
  sortByColumnICD: SortDescriptor = { field: 'Ma', dir: 'desc' };
  documentTypeICD: DocumentType;

  initICD() {
    this.documentTypeICD = DocumentType.QuanTriNhomPhongKhamIcd;
    this.columnsICD = [
      { label: 'Mã', property: 'Ma', type: 'text', width: 70, visible: true, isLink: true, sortable: true },
      { label: 'Tên tiếng việt', property: 'TenTiengViet', type: 'text', minWidth: 200, visible: true },
      { label: 'Tên tiếng anh', property: 'TenTiengAnh', type: 'text', width: 100, visible: true },
      { label: 'Giới tính', property: 'GioiTinhDisplay', type: 'text', width: 100, visible: true },
      { label: 'Mãn tính', property: 'ManTinh', type: 'text', width: 100, visible: true },
      { label: 'Bệnh thường gặp', property: 'BenhThuongGap', type: 'text', width: 100, visible: true },
      { label: 'Bệnh năm', property: 'BenhNam', type: 'text', width: 100, visible: true },
      { label: 'Không bảo hiểm', property: 'KhongBaoHiem', type: 'text', width: 100, visible: true },
      { label: 'Ngoài định suất', property: 'NgoaiDinhSuat', type: 'text', width: 100, visible: true },
      { label: 'Hiệu lực', property: 'HieuLuc', type: 'text', width: 150, visible: true,template: this.trangThaiTemplate },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];

  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.iCDQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.iCDSearching=true;
  }
  huyTimKiem(){
    this.iCDQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.iCDSearching=false;
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

  updateICD(id: number, hieuLuc: boolean) {
    hieuLuc 
    id
    let comfirm = "ngừng sử dụng";
    if (!hieuLuc) comfirm = "sử dụng";
    if (hieuLuc) comfirm = "ngừng sử dụng";
    var self = this;
   
    if (this.authService.hasPermission(this.documentTypeICD, SecurityOperation.Update)) {

      this.dialog.open(ConfirmComponent, {
        disableClose: false,
        width: '400px',
        data: { message: CommonService.format(SystemMessage.MessLockTemplate, [comfirm, "ICD"]) }
      }).afterClosed().subscribe(result => {/* result is a string:Yes,No,No answer*/
        if (result == true) {
          self.apiService.post("QuanTriNhomPhongKhamIcd/KichHoatHieuLuc?id=" + id).subscribe(
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
