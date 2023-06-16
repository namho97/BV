import { ChangeDetectorRef, Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
  selector: 'app-chuc-danh',
  templateUrl: './chuc-danh.component.html',
  styleUrls: ['./chuc-danh.component.scss']
})
export class ChucDanhComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now: Date = new Date();
  @ViewChild("tableChucDanh", { static: true }) table: TableComponent;
  constructor(private cdref: ChangeDetectorRef, private route: ActivatedRoute, private authService: AuthService,
    private dialog: MatDialog, private apiService: ApiService, private snackBar: MatSnackBar) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initChucDanh();
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.id != null) {
      var self = this;
      setTimeout(function () {
        self.table.view(self.id);
      });
    }
  }
  @ViewChild('trangThaiTemplate', { static: true }) trangThaiTemplate: TemplateRef<any>;
  chucDanhQueryInfo: any = {};
  chucDanhSearching: boolean = false;
  columnsChucDanh: TableColumn<any>[] = [];
  groupByColumnsChucDanh: string[] = [];
  sortByColumnChucDanh: SortDescriptor = { field: 'Ma', dir: 'desc' };
  documentTypeChucDanh: DocumentType;
  @ViewChild('groupTemplate', { static: true }) groupTemplate: TemplateRef<any>;

  initChucDanh() {
    this.documentTypeChucDanh = DocumentType.QuanTriNhomHanhChinhChucDanh;
    this.columnsChucDanh = [
      { label: 'Mã', property: 'Ma', type: 'text', width: 78, visible: true, isLink: true, sticky: true },
      { label: 'Tên', property: 'Ten', type: 'text', minWidth: 300, visible: true, isLink: true, sticky: true },
      // { label: 'Tên nhóm chức danh', property: 'TenNhom', type: 'text', width: 150, visible: true, isLink: true, sticky: true },
      { label: 'Hiệu lực', property: 'HieuLuc', type: 'text', width: 150, visible: true, template: this.trangThaiTemplate },
      { label: '', property: 'action', type: 'button', visible: true, width: 50, template: this.groupTemplate}
    ];

  }
  dangTimKiem: boolean = false;
  timKiem() {
    this.table.additionalSearchObject = this.chucDanhQueryInfo;
    this.table.search();
    this.dangTimKiem = true;
    this.chucDanhSearching = true;
  }
  huyTimKiem() {
    this.chucDanhQueryInfo = {};
    this.timKiem();
    this.dangTimKiem = false;
    this.chucDanhSearching = false;
  }
  //#region actions
  extDataItemSelected(event) {
    this.dataChon = event;
    this.cdref.detectChanges();

  }
  quayLaiChange() {
    this.dataChon = null;
    this.table.back();
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
  quayLaiVaTaiLaiChange() {
    this.dataChon = null;
    this.table.back();
    this.table.refresh();
  }
  dataChange(event) {
    if (event) {
      this.table.search();
      this.table.refresh();
    }
  }
  updateChucDanh(id: number, hieuLuc: boolean) {
    hieuLuc
    id
    let comfirm = "ngừng sử dụng";
    if (!hieuLuc) comfirm = "sử dụng";
    if (hieuLuc) comfirm = "ngừng sử dụng";
    var self = this;

    if (this.authService.hasPermission(this.documentTypeChucDanh, SecurityOperation.Update)) {

      this.dialog.open(ConfirmComponent, {
        disableClose: false,
        width: '400px',
        data: { message: CommonService.format(SystemMessage.MessLockTemplate, [comfirm, "chức danh"]) }
      }).afterClosed().subscribe(result => {/* result is a string:Yes,No,No answer*/
        if (result == true) {
          self.apiService.post("QuanTriNhomHanhChinhChucDanh/KichHoatHieuLuc?id=" + id).subscribe(
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
