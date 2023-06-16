import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { DocumentType } from "src/app/shared/enum/document-type.enum";
declare let $: any;
@Component({
  selector: 'app-lich-su-tiep-nhan',
  templateUrl: './lich-su-tiep-nhan.component.html',
  styleUrls: ['./lich-su-tiep-nhan.component.scss']
})
export class LichSuTiepNhanComponent implements OnInit {

  id: number = null;
  dataChon: any;
  timKiemModel: any = {};
  accessUser:AccessUser;
  documentType: DocumentType;
  columns: TableColumn<any>[] = [];  
  dataSource:any; 
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor={field:'MaTiepNhan',dir:'asc'};
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  @ViewChild("tableLichSuTiepNhan", { static: true }) table:TableComponent;

  constructor(private route: ActivatedRoute, public dialog: MatDialog,  private authService:AuthService, private cdref: ChangeDetectorRef) {
    this.id = this.route.snapshot.queryParams.id;
  }
//#region init
  ngOnInit() {
    this.accessUser=this.authService.getAccessUser();
    this.documentType = DocumentType.TiepNhanNguoiBenhPhongKhamDaKhoaLichSuTiepNhan;
    this.columns=[
      { label: 'MÃ TN', property: 'MaTiepNhan', type: 'text',width:70, visible: true,isLink:true, disableFilter:false},
      { label: 'MÃ NB', property: 'MaNguoiBenh', type: 'text',width:60, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text',width:160, visible: true },
      { label: 'GT', property: 'GioiTinh', type: 'text',width:40, visible: true },
      { label: 'NS', property: 'NamSinh', type: 'text',width:40, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:90, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChi', type: 'text',minWidth:200, visible: true },
      { label: 'NGƯỜI TIẾP NHẬN', property: 'NguoiTiepNhan', type: 'text',width:110, visible: true },
      { label: 'TIẾP NHẬN LÚC', property: 'TiepNhanLuc', type: 'text',width:150, visible: true },
      { label: 'LÝ DO KHÁM', property: 'LyDoKham', type: 'text',width:120, visible: true },
      { label: 'ĐỐI TƯỢNG', property: 'DoiTuong', type: 'text',width:80, visible: true },
      { label: '', property: 'actions', type: 'button', visible: true,width:40, useActionDefault:true ,hideFilter:true,template:this.actionTemplate  }
    ];
    this.getData();
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
  getData(){

    this.dataSource ={      
      Data:[
        {"Id":1,"MaTiepNhan":"2207150199","MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"SoDienThoai":"0856781221","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"14/07/2022 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT"},
        {"Id":2,"MaTiepNhan":"2207150199","MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"SoDienThoai":"0856781221","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"14/07/2022 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT"},
        {"Id":3,"MaTiepNhan":"2207150199","MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"SoDienThoai":"0856781221","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"14/07/2022 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT"},
        {"Id":4,"MaTiepNhan":"2207150199","MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"SoDienThoai":"0856781221","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"14/07/2022 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT"},
        {"Id":5,"MaTiepNhan":"2207150199","MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"SoDienThoai":"0856781221","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"14/07/2022 05:25 AM","LyDoKham":"Đau bụng","DoiTuong":"BHYT"}
      ],
      TotalRowCount:49
    }
  }
  //#endregion init 

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


//#region tìm kiếm
  onKey(event:any){
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
  
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.timKiemModel;
    this.table.search();
    this.dangTimKiem=true;
  }
  huyTimKiem(){
    this.timKiemModel={};
    this.timKiem();
    this.dangTimKiem=false;
  }
  extOnSearch(){
    
    this.dataSource ={
      Data:[
        {"MaNguoiBenh":null,"HoTen":"ĐẶNG THỊ NGỌC BÍCH","NamSinh":1988,"GioiTinhOrigin":2,"GioiTinh":"Nữ","SoHoChieu":"","SoDienThoai":"0856781221","Email":"","SoNha":"Ngang Kim My, An Hưng","KhomAp":"Ấp An Hưng","PhuongXa":"Thị trấn An Phú","QuanHuyen":"Huyện An Phú","TinhThanh":"Tỉnh An Giang","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","TrungTamQuanLyHet":false,"DonViHanhChinhQuanLyTinhThanh":"Tỉnh An Giang","DonViHanhChinhQuanLyQuanHuyen":"Huyện An Phú","DonViHanhChinhQuanLyPhuongXa":"Thị trấn An Phú","DonViHanhChinhQuanLyKhomAp":"Ấp An Hưng","Id":70769},{"MaNguoiBenh":null,"HoTen":"ĐOÀN THỊ MINH NGUYỆT","NamSinh":2000,"GioiTinhOrigin":1,"GioiTinh":"Nam","SoHoChieu":null,"SoDienThoai":"0702853457","Email":null,"SoNha":"khu dân cư TTTM","KhomAp":"Ấp An Hưng","PhuongXa":"Thị trấn An Phú","QuanHuyen":"Huyện An Phú","TinhThanh":"Tỉnh An Giang","DiaChi":"khu dân cư TTTM, Ấp An Hưng, Thị trấn An Phú, Huyện An Phú, Tỉnh An Giang","TrungTamQuanLyHet":false,"DonViHanhChinhQuanLyTinhThanh":"Tỉnh An Giang","DonViHanhChinhQuanLyQuanHuyen":"Huyện An Phú","DonViHanhChinhQuanLyPhuongXa":"Thị trấn An Phú","DonViHanhChinhQuanLyKhomAp":"Ấp An Hưng","Id":44536}
      ],
      TotalRowCount:49
    }
    this.table.setDataSource(this.dataSource);
  }
  //#endregion tìm kiếm



}
