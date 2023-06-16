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
  lichSuKhamQueryInfo:any={"HoanThanhKhamTu":new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate(),0,0,0),"HoanThanhKhamDen":new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate(),23,59,59)};
  bacSiKhamLichSuKhamSearching:boolean=false;
  columnsLichSuKham: TableColumn<any>[] = [];
  dataSourceLichSuKham: any;
  groupByColumnsLichSuKham: string[] = [];
  sortByColumnLichSuKham: SortDescriptor = { field: 'Id', dir: 'desc' };
  documentTypeLichSuKham: DocumentType;
  dataItemLichSuKhamSelected:any;
  @ViewChild('maTiepNhanTemplate', { static: true }) maTiepNhanTemplate: TemplateRef<any>;

  initLichSuKham() {
    this.documentTypeLichSuKham = DocumentType.KhamBenhPhongKhamDaKhoaLichSuKham;
    this.columnsLichSuKham = [
      { label: 'MÃ TN', property: 'MaTiepNhan', type: 'text', width: 90, visible: true, disableFilter: false,isLink:true,sticky:true },
      { label: 'MÃ NB', property: 'MaNguoiBenh', type: 'text', width: 70, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text', width: 200, visible: true,sticky:true },
      { label: 'GT', property: 'GioiTinh', type: 'text', width: 50, visible: true },
      { label: 'NS', property: 'NamSinh', type: 'text', width: 50, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:120, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChi', type: 'text',minWidth:300, visible: true },
      { label: 'NGƯỜI TIẾP NHẬN', property: 'NguoiTiepNhan', type: 'text',width:120, visible: true },
      { label: 'TIẾP NHẬN LÚC', property: 'TiepNhanLuc', type: 'text',width:150, visible: true },
      { label: 'LÝ DO KHÁM', property: 'LyDoKham', type: 'text',width:120, visible: true },
      { label: 'ĐỐI TƯỢNG', property: 'DoiTuong', type: 'text',width:120, visible: true },
      { label: 'NGÀY HOÀN THÀNH', property: 'NgayHoanThanh', type: 'text', width: 150, visible: true },
    ];
    this.getDataLichSuKham();
  }
  getDataLichSuKham() {
    this.dataSourceLichSuKham = {
      Data: [
        { "Id": 1, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 2, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 3, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 4, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 5, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 6, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 7, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 8, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 9, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 10, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 11, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 12, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 13, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 14, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 15, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 16, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 17, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 18, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 19, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 20, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"25/12/2020 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT",  "NgayHoanThanh": "25/12/2020 05:25 AM" },
      ],
      TotalRowCount: 20
    }
  }
  timKiemLichSuKham(){
    this.bacSiKhamLichSuKhamSearching=true;
  }
  huyTimKiemLichSuKham(){
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
  dataChange(event) {
    if (event) {
      this.table.search();
    }
  }
  //#endregion actions

}
