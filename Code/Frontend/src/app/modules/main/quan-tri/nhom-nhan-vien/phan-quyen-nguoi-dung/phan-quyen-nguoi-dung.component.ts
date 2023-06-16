import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-phan-quyen-nguoi-dung',
  templateUrl: './phan-quyen-nguoi-dung.component.html',
  styleUrls: ['./phan-quyen-nguoi-dung.component.scss']
})
export class PhanQuyenNguoiDungComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tablePhanQuyenNguoiDung", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute ){
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initPhanQuyenNguoiDung();
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
  phanQuyenNguoiDungQueryInfo:any={};
  columnsPhanQuyenNguoiDung: TableColumn<any>[] = [];
  groupByColumnsPhanQuyenNguoiDung: string[] = [];
  sortByColumnPhanQuyenNguoiDung: SortDescriptor = { field: 'Ten', dir: 'asc' };
  documentTypePhanQuyenNguoiDung: DocumentType;
  dataItemPhanQuyenNguoiDungSelected:any;
  @ViewChild('trangThaiTemplate', { static: true }) trangThaiTemplate: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;

  initPhanQuyenNguoiDung() {
    this.documentTypePhanQuyenNguoiDung = DocumentType.QuanTriNhomNhanVienPhanQuyenNguoiDung;
    this.columnsPhanQuyenNguoiDung = [
      { label: 'TÊN NHÓM QUYỀN', property: 'Ten', type: 'text', minWidth: 180, visible: true, isLink: true, disableFilter: false },
      { label: 'QUYỀN MẶC ĐỊNH', property: 'IsDefault', type: 'text', width: 100, visible: true, template: this.trangThaiTemplate },
      { label: '', property: 'actions', type: 'button', visible: true, width: 30,  hideFilter: true,template:this.actionTemplate }
    ];
  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.phanQuyenNguoiDungQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
  }
  huyTimKiem(){
    this.phanQuyenNguoiDungQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
  }
  chonNguoiBenhXemChiTiet(dataItem:any){
    this.dataItemPhanQuyenNguoiDungSelected=dataItem;
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
  //#endregion actions
}
