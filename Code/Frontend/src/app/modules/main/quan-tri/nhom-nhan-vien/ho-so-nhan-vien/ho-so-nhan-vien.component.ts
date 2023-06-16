import { HoSoNhanVienDoiMatKhauComponent } from './ho-so-nhan-vien-doi-mat-khau/ho-so-nhan-vien-doi-mat-khau.component';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-ho-so-nhan-vien',
  templateUrl: './ho-so-nhan-vien.component.html',
  styleUrls: ['./ho-so-nhan-vien.component.scss']
})
export class HoSoNhanVienComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableHoSoNhanVien", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute,private dialog: MatDialog ){
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initHoSoNhanVien();
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
  hoSoNhanVienQueryInfo:any={};
  columnsHoSoNhanVien: TableColumn<any>[] = [];
  groupByColumnsHoSoNhanVien: string[] = [];
  sortByColumnHoSoNhanVien: SortDescriptor = { field: 'HoTen', dir: 'asc' };
  documentTypeHoSoNhanVien: DocumentType;
  dataItemHoSoNhanVienSelected:any;
  @ViewChild('tinhTrangTemplate', { static: true }) tinhTrangTemplate: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;

  initHoSoNhanVien() {
    this.documentTypeHoSoNhanVien = DocumentType.QuanTriNhomNhanVienHoSoNhanVien;
    this.columnsHoSoNhanVien = [
      // { label: 'MÃ TN', property: 'MaTiepNhan', type: 'text', width: 90, visible: true, disableFilter: false,isLink:true,sticky:true },
      // { label: 'MÃ NB', property: 'MaNguoiBenh', type: 'text', width: 70, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text', width: 160, visible: true,isLink:true,sticky:true },
      { label: 'GT', property: 'GioiTinhHienThi', type: 'text', width: 40, visible: true },
      { label: 'NGÀY SINH', property: 'NgaySinhHienThi', type: 'text', width: 100, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:90, visible: true },
      { label: 'EMAIL', property: 'Email', type: 'text',width:110, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChi', type: 'text',minWidth:200, visible: true },
      { label: 'TRẠNG THÁI', property: 'TrangThai', type: 'text', visible: true,width:130, hideFilter:true,template:this.tinhTrangTemplate  },
      { label: '', property: 'Action', type: 'text', visible: true,width:50,template:this.actionTemplate },
    ];
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.hoSoNhanVienQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
  }
  huyTimKiem(){
    this.hoSoNhanVienQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
  }
  chonNguoiBenhXemChiTiet(dataItem:any){
    this.dataItemHoSoNhanVienSelected=dataItem;
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
  doiMatKhau(dataItem:any){
    let dialogRef = this.dialog.open(HoSoNhanVienDoiMatKhauComponent, {
      width:"500px",
      data: {
        dataItem: dataItem
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
       
      }
    });
  }
  //#endregion actions

}
