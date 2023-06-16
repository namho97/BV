import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-thu-vien-phi',
  templateUrl: './thu-vien-phi.component.html',
  styleUrls: ['./thu-vien-phi.component.scss']
})
export class ThuVienPhiComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableThuVienPhi", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute){
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initThuVienPhi();
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
  thuVienPhiQueryInfo:any={};
  columnsThuVienPhi: TableColumn<any>[] = [];
  groupByColumnsThuVienPhi: string[] = [];
  sortByColumnThuVienPhi: SortDescriptor = { field: 'SoTien', dir: 'desc' };
  documentTypeThuVienPhi: DocumentType;
  dataItemThuVienPhiSelected:any;
  @ViewChild('soTienTemplate', { static: true }) soTienTemplate: TemplateRef<any>;

  initThuVienPhi() {
    this.documentTypeThuVienPhi = DocumentType.ThuNganBacSiGiaDinhThuVienPhi;
    this.columnsThuVienPhi = [
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text',width:160, visible: true,sticky:true,isLink:true},
      { label: 'GT', property: 'GioiTinhHienThi', type: 'text',width:50, visible: true },
      { label: 'NS', property: 'NgayThangNamSinh', type: 'text',width:80, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:100, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChiDayDu', type: 'text',minWidth:200, visible: true },
      { label: 'TIẾP NHẬN LÚC', property: 'NgayTiepNhanHienThi', type: 'text',width:140, visible: true },
      { label: 'SỐ TIỀN', property: 'SoTien', type: 'text',width:100, visible: true,template:this.soTienTemplate }
    ];
    var now=new Date();
    this.thuVienPhiQueryInfo.NgayTiepNhanTu=new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
    this.thuVienPhiQueryInfo.NgayTiepNhanDen=new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);
    this.table.additionalSearchObject = this.thuVienPhiQueryInfo;
    this.dangTimKiem=true;
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.thuVienPhiQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
  }
  huyTimKiem(){
    this.thuVienPhiQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
  }
  chonNguoiBenhXemChiTiet(dataItem:any){
    this.dataItemThuVienPhiSelected=dataItem;
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
