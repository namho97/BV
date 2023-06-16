import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { DocumentType } from "src/app/shared/enum/document-type.enum";
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-lich-hen',
  templateUrl: './lich-hen.component.html',
  styleUrls: ['./lich-hen.component.scss']
})
export class LichHenComponent implements OnInit {

  id: number = null;
  dataChon: any;
  timKiemModel: any = {};
  accessUser:AccessUser;
  documentType: DocumentType;
  columns: TableColumn<any>[] = [];  
  dataSource:any; 
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor={field:'GioHenKham',dir:'asc'};
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  @ViewChild('nguoiBenhDenTemplate', { static: true }) nguoiBenhDenTemplate: TemplateRef<any>;
  @ViewChild("tableLichHen", { static: true }) table:TableComponent;

  constructor(private route: ActivatedRoute, public dialog: MatDialog,  private authService:AuthService, private cdref: ChangeDetectorRef) {
    this.id = this.route.snapshot.queryParams.id;
  }
//#region init
  ngOnInit() {
    this.accessUser=this.authService.getAccessUser();
    this.documentType = DocumentType.TiepNhanNguoiBenhPhongKhamDaKhoaLichHen;
    this.columns=[
      
      { label: '', property: 'Id', type: 'button', visible: true,width:110, useActionDefault:true ,hideFilter:true,template:this.nguoiBenhDenTemplate,sticky:true  },
      { label: 'STT', property: 'SoThuTu', type: 'text',width:30, visible: true },
      { label: 'MÃ NB', property: 'MaNguoiBenh', type: 'text',width:60, visible: true,isLink:true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text',width:160, visible: true },
      { label: 'GT', property: 'GioiTinh', type: 'text',width:40, visible: true },
      { label: 'NS', property: 'NamSinh', type: 'text',width:40, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:90, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChi', type: 'text',minWidth:300, visible: true },
      { label: 'GIỜ KHÁM DỰ KIẾN', property: 'GioKhamDuKien', type: 'text',width:130, visible: true },
      { label: 'NGƯỜI TIẾP NHẬN', property: 'NguoiTiepNhan', type: 'text',width:110, visible: true },
      { label: 'TIẾP NHẬN LÚC', property: 'TiepNhanLuc', type: 'text',width:140, visible: true },
      { label: 'LÝ DO KHÁM', property: 'LyDoKham', type: 'text',width:120, visible: true },
      { label: '', property: 'actions', type: 'button', visible: true,width:40, useActionDefault:true ,hideFilter:true,template:this.actionTemplate  },
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
        {"Id":1,"SoThuTu":1,"MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"SoDienThoai":"0856781221","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"14/07/2022 05:25 AM","LyDoKham":"Đau bụng","GioKhamDuKien":"07:00 AM-08:00 AM"},
        {"Id":2,"SoThuTu":2,"MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"SoDienThoai":"0856781221","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"14/07/2022 05:25 AM","LyDoKham":"Đau bụng","GioKhamDuKien":"07:30 AM-08:30 AM"},
        {"Id":3,"SoThuTu":3,"MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"SoDienThoai":"0856781221","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"14/07/2022 05:25 AM","LyDoKham":"Đau bụng","GioKhamDuKien":"08:00 AM-09:00 AM"},
        {"Id":4,"SoThuTu":4,"MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"SoDienThoai":"0856781221","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"14/07/2022 05:25 AM","LyDoKham":"Đau bụng","GioKhamDuKien":"08:30 AM-09:30 AM"},
        {"Id":5,"SoThuTu":5,"MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"SoDienThoai":"0856781221","DiaChi":"15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh","NguoiTiepNhan":"Nguyễn Văn A","TiepNhanLuc":"14/07/2022 05:25 AM","LyDoKham":"Đau bụng","GioKhamDuKien":"09:00 AM-10:00 AM"}
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
  timKiem() {
    this.table.additionalSearchObject = this.timKiemModel;
    this.table.search();
  }
  huyTimKiem(){
    this.timKiemModel={};
    this.timKiem();
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


  tiepNhanBenhNhan(dataItem:any){
    this.dialog.open(ConfirmComponent, {
      disableClose: false,
      width: '400px',
      data: { message: "Bạn chắn chắn muốn tạo tiếp nhận cho người bệnh: <b>"+dataItem.HoTen+"</b> vào khám hay không?" }
  }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
      if (result) {
          
      }
  });
  }

}
