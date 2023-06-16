import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-lich-su-kham',
  templateUrl: './lich-su-kham.component.html',
  styleUrls: ['./lich-su-kham.component.scss']
})
export class LichSuKhamComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableLichSuKham", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initLichSuKham();
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
  lichSuKhamQueryInfo:any={};
  bacSiKhamLichSuKhamSearching:boolean=false;
  columnsLichSuKham: TableColumn<any>[] = [];
  groupByColumnsLichSuKham: string[] = [];
  sortByColumnLichSuKham: SortDescriptor = { field: 'NgayHoanThanh', dir: 'desc' };
  documentTypeLichSuKham: DocumentType;
  dataItemLichSuKhamSelected:any;
  @ViewChild('maTiepNhanTemplate', { static: true }) maTiepNhanTemplate: TemplateRef<any>;
  @ViewChild('tinhTrangTemplate', { static: true }) tinhTrangTemplate: TemplateRef<any>;

  initLichSuKham() {
    this.documentTypeLichSuKham = DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham;
    this.columnsLichSuKham = [
      // { label: 'MÃ TN', property: 'MaTiepNhan', type: 'text', width: 90, visible: true, disableFilter: false,isLink:true,sticky:true },
      // { label: 'MÃ NB', property: 'MaNguoiBenh', type: 'text', width: 70, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text', width: 160, visible: true,isLink:true,sticky:true },
      { label: 'GT', property: 'GioiTinhHienThi', type: 'text', width: 50, visible: true },
      { label: 'NS', property: 'NgayThangNamSinh', type: 'text', width: 80, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:90, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChiDayDu', type: 'text',minWidth:200, visible: true },
      { label: 'NGƯỜI TIẾP NHẬN', property: 'NguoiTiepNhan', type: 'text',width:110, visible: true },
      { label: 'TIẾP NHẬN LÚC', property: 'NgayTiepNhanHienThi', type: 'text',width:140, visible: true },
      { label: 'LÝ DO KHÁM', property: 'LyDoTiepNhan', type: 'text',width:120, visible: true },
      { label: 'NGÀY HOÀN THÀNH', property: 'NgayHoanThanhHienThi', type: 'text', width: 150, visible: true },
      { label: 'TRẠNG THÁI', property: 'TrangThai', type: 'text', visible: true,width:100, hideFilter:true,template:this.tinhTrangTemplate  },
    ];
    var now=new Date();
    this.lichSuKhamQueryInfo.NgayHoanThanhTu=new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
    this.lichSuKhamQueryInfo.NgayHoanThanhDen=new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);
    this.table.additionalSearchObject = this.lichSuKhamQueryInfo;
    this.dangTimKiem=true;
    this.bacSiKhamLichSuKhamSearching=true;
  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.lichSuKhamQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.bacSiKhamLichSuKhamSearching=true;
  }
  huyTimKiem(){
    this.lichSuKhamQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.bacSiKhamLichSuKhamSearching=false;
  }
  chonNguoiBenhXemChiTiet(dataItem:any){
    this.dataItemLichSuKhamSelected=dataItem;
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
