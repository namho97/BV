import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-lich-su-thu-vien-phi',
  templateUrl: './lich-su-thu-vien-phi.component.html',
  styleUrls: ['./lich-su-thu-vien-phi.component.scss']
})
export class LichSuThuVienPhiComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableLichSuThuVienPhi", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initLichSuThuVienPhi();
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
  lichSuThuVienPhiQueryInfo:any={};
  bacSiKhamLichSuThuVienPhiSearching:boolean=false;
  columnsLichSuThuVienPhi: TableColumn<any>[] = [];
  groupByColumnsLichSuThuVienPhi: string[] = [];
  sortByColumnLichSuThuVienPhi: SortDescriptor = { field: 'NgayTiepNhan', dir: 'desc' };
  documentTypeLichSuThuVienPhi: DocumentType;
  dataItemLichSuThuVienPhiSelected:any;
  @ViewChild('soTienTemplate', { static: true }) soTienTemplate: TemplateRef<any>;

  initLichSuThuVienPhi() {
    this.documentTypeLichSuThuVienPhi = DocumentType.ThuNganBacSiGiaDinhLichSuThuVienPhi;
    this.columnsLichSuThuVienPhi = [
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text',width:160, visible: true,sticky:true,isLink:true},
      { label: 'GT', property: 'GioiTinhHienThi', type: 'text',width:50, visible: true },
      { label: 'NS', property: 'NgayThangNamSinh', type: 'text',width:80, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:100, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChiDayDu', type: 'text',minWidth:200, visible: true },
      { label: 'TIẾP NHẬN LÚC', property: 'NgayTiepNhanHienThi', type: 'text',width:140, visible: true },
      { label: 'SỐ TIỀN', property: 'SoTien', type: 'text',width:100, visible: true,template:this.soTienTemplate }
    ];
    var now=new Date();
    this.lichSuThuVienPhiQueryInfo.NgayTiepNhanTu=new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
    this.lichSuThuVienPhiQueryInfo.NgayTiepNhanDen=new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);
    this.table.additionalSearchObject = this.lichSuThuVienPhiQueryInfo;
    this.dangTimKiem=true;
  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.lichSuThuVienPhiQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.bacSiKhamLichSuThuVienPhiSearching=true;
  }
  huyTimKiem(){
    this.lichSuThuVienPhiQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.bacSiKhamLichSuThuVienPhiSearching=false;
  }
  chonNguoiBenhXemChiTiet(dataItem:any){
    this.dataItemLichSuThuVienPhiSelected=dataItem;
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
