import { ChangeDetectorRef, Component, OnInit,ViewChild,TemplateRef  } from '@angular/core';
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
  selector: 'app-duong-dung',
  templateUrl: './duong-dung.component.html',
  styleUrls: ['./duong-dung.component.scss']
})
export class DuongDungComponent implements OnInit {
  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableDuongDung", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute, private authService: AuthService,
    private dialog: MatDialog,private apiService: ApiService,private snackBar: MatSnackBar) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initDuongDung();
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
  duongDungQueryInfo:any={};
  duongDungSearching:boolean=false;
  columnsDuongDung: TableColumn<any>[] = [];
  groupByColumnsDuongDung: string[] = [];
  sortByColumnDuongDung: SortDescriptor = { field: 'Ma', dir: 'desc' };
  documentTypeDuongDung: DocumentType;

  initDuongDung() {
    this.documentTypeDuongDung = DocumentType.QuanTriNhomDuocPhamDuongDung;
    this.columnsDuongDung = [
      { label: 'Mã', property: 'Ma', type: 'text', width: 78, visible: true,isLink:true,sticky:true },
      { label: 'Tên', property: 'Ten', type: 'text', width: 300, visible: true,isLink:true,sticky:true },
      { label: 'Ghi chú', property: 'GhiChu', type: 'text', minWidth: 100, visible: true },
      { label: 'Hiệu lực', property: 'HieuLuc', type: 'text',width:150, visible: true ,template: this.trangThaiTemplate },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];

  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.duongDungQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.duongDungSearching=true;
  }
  huyTimKiem(){
    this.duongDungQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.duongDungSearching=false;
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
  updateDuongDung(id: number, hieuLuc: boolean) {
    hieuLuc 
    id
    let comfirm = "ngừng sử dụng";
    if (!hieuLuc) comfirm = "sử dụng";
    if (hieuLuc) comfirm = "ngừng sử dụng";
    var self = this;
   
    if (this.authService.hasPermission(this.documentTypeDuongDung, SecurityOperation.Update)) {

      this.dialog.open(ConfirmComponent, {
        disableClose: false,
        width: '400px',
        data: { message: CommonService.format(SystemMessage.MessLockTemplate, [comfirm, "đường dùng"]) }
      }).afterClosed().subscribe(result => {/* result is a string:Yes,No,No answer*/
        if (result == true) {
          self.apiService.post("QuanTriNhomDuocPhamDuongDung/KichHoatHieuLuc?id=" + id).subscribe(
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
