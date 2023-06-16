import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { DocumentType } from "src/app/shared/enum/document-type.enum";

@Component({
  selector: 'app-lich-su-dang-ky-kham',
  templateUrl: './lich-su-dang-ky-kham.component.html',
  styleUrls: ['./lich-su-dang-ky-kham.component.scss']
})
export class LichSuDangKyKhamComponent implements OnInit {

  id: number = null;
  dataChon: any;
  timKiemModel: any = {};
  accessUser:AccessUser;
  documentType: DocumentType;
  columns: TableColumn<any>[] = [];
  dataSource:any;
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor={field:'NgayTiepNhan',dir:'desc'};
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  @ViewChild('laDangKyHenTruocTemplate', { static: true }) laDangKyHenTruocTemplate: TemplateRef<any>;
  @ViewChild('tinhTrangTemplate', { static: true }) tinhTrangTemplate: TemplateRef<any>;
  @ViewChild("tableLichSuDangKyKham", { static: true }) table:TableComponent;

  constructor(private route: ActivatedRoute, public dialog: MatDialog,  private authService:AuthService, private cdref: ChangeDetectorRef) {
    this.id = this.route.snapshot.queryParams.id;
  }
//#region init
  ngOnInit() {
    this.accessUser=this.authService.getAccessUser();
    this.documentType = DocumentType.TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham;
    this.columns=[
      { label: 'STT', property: 'SoThuTu', type: 'text',width:30, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text',width:160, visible: true,sticky:true,isLink:true},
      // { label: 'TRẠNG THÁI ĐẾN', property: 'TinhTrangDen', type: 'text',width:110, visible: true,template:this.tinhTrangDenTemplate },
      { label: 'G.TÍNH', property: 'GioiTinhHienThi', type: 'text',width:50, visible: true },
      { label: 'NGÀY SINH', property: 'NgayThangNamSinh', type: 'text',width:80, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:90, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChiDayDu', type: 'text',minWidth:300, visible: true },
      { label: 'NGƯỜI TIẾP NHẬN', property: 'NguoiTiepNhan', type: 'text',width:110, visible: true },
      { label: 'TIẾP NHẬN LÚC', property: 'NgayTiepNhanHienThi', type: 'text',width:140, visible: true },
      { label: 'LÝ DO KHÁM', property: 'LyDoTiepNhan', type: 'text',width:120, visible: true },
      { label: 'HOÀN THÀNH LÚC', property: 'NgayHoanThanhHienThi', type: 'text',width:140, visible: true },
      // { label: 'HẸN TRƯỚC', property: 'LaDangKyHenTruoc', type: 'text', visible: true,width:80, hideFilter:true,template:this.laDangKyHenTruocTemplate  },
      { label: 'TRẠNG THÁI', property: 'TrangThaiYeuCauTiepNhan', type: 'text', visible: true,width:100, hideFilter:true,template:this.tinhTrangTemplate  },
      // { label: '', property: 'actions', type: 'button', visible: true,width:40, useActionDefault:true ,hideFilter:true,template:this.actionTemplate  },
    ];
    var now=new Date();
    this.timKiemModel.NgayTiepNhanTu=new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
    this.timKiemModel.NgayTiepNhanDen=new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);
    this.table.additionalSearchObject = this.timKiemModel;
    this.dangTimKiem=true;
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
