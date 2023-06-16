import { PrintButtonComponent } from './../../../../../../shared/components/print-button/print-button.component';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { DeviceDetectorService } from 'ngx-device-detector';
declare let $: any;


@Component({
  selector: 'app-thu-vien-phi-chi-tiet',
  templateUrl: './thu-vien-phi-chi-tiet.component.html',
  styleUrls: ['./thu-vien-phi-chi-tiet.component.scss']
})
export class ThuVienPhiChiTietComponent implements OnInit,AfterViewInit {

  thuVienPhiVo:any={HinhThucThanhToan:[1],NgayThu:new Date(),NoiDungThu:"Thanh toán viện phí"};
  dichVuThuVienPhiVo:any={};
  validationErrors:any=null;
  accessUser:AccessUser;
  isMobile:boolean=false;
  @ViewChild('btnIn', { static: true }) btnIn: PrintButtonComponent;
  @Input() data: any;
  @Input() showOnPopup:boolean=false;
  @Input() viewOnly:boolean=false;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiVaTaiLaiChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService,private dialog: MatDialog,
    private authService:AuthService,private devideService:DeviceDetectorService) { 
      this.isMobile=this.devideService.isMobile();
    }

  ngOnInit() {
    this.accessUser = this.authService.getAccessUser();
    this.tabIndex=this.viewOnly?1:0;
    this.selectedIndexChange(this.tabIndex);
  }
  ngAfterViewInit() {
    var self=this;
    setTimeout(function(){
      self.formatContent();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.dichVuThuVienPhiVo = { };

      }
      else {
        this.getById(changes.data.currentValue.Id);
        this.thuVienPhiVo.YeuCauTiepNhanId=changes.data.currentValue.Id;
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
     
    this.apiService.get("ThuNganBacSiGiaDinhThuVienPhi/GetChiTietVienPhi/"+id).subscribe((result)=>{
      this.dichVuThuVienPhiVo=result;
      this.thuVienPhiVo.TienMat=this.dichVuThuVienPhiVo.TongChuaThu;
      this.thuVienPhiVo.TongThucThu=this.dichVuThuVienPhiVo.TongChuaThu;
      this.chuyenTienTuSoSangChu(this.dichVuThuVienPhiVo.TongChuaThu);
      if(this.tabIndex==0)
      {
        this.tableDichVuThu.refresh();
      }
      else{
        this.tableLichSuThu.refresh();
      }
      this.getCauHinhInPhieu();
    });
    }
  }
  formatContent(){
    
    if ($("#thu-tien-content") != null && $("#thu-tien-content").length > 0) {
      $("#thu-tien-content").css({ "height": this.isMobile?"auto":$(window).height() - 343 });
    }
    if ($("#noi-dung-content") != null && $("#noi-dung-content").length > 0) {
      $("#noi-dung-content").css({ "height": $(window).height() - 397 });
    }
  }

  quayLai() {
    this.quayLaiChange.emit(true);
  }
  hinhThucThanhToanChange(event:any){
    if(event.indexOf(1)<0)
    {
      this.thuVienPhiVo.TienMat=0;
    }
    
    if(event.indexOf(2)<0)
    {
      this.thuVienPhiVo.ChuyenKhoan=0;
    }
    
    if(event.indexOf(3)<0)
    {
      this.thuVienPhiVo.Pos=0;
    }
    if(event.length==1)
    {
      if(event.indexOf(1)>=0)
      {
        this.thuVienPhiVo.TienMat=this.thuVienPhiVo.TongThucThu;
      }
      
      if(event.indexOf(2)>=0)
      {
        this.thuVienPhiVo.ChuyenKhoan=this.thuVienPhiVo.TongThucThu;
      }
      
      if(event.indexOf(3)>=0)
      {
        this.thuVienPhiVo.Pos=this.thuVienPhiVo.TongThucThu;
      }
      
    }
  }
  tongThucThuChange(event:any){
    if(this.thuVienPhiVo.HinhThucThanhToan.length==1)
    {
      if(this.thuVienPhiVo.HinhThucThanhToan.indexOf(1)>=0)
      {
        this.thuVienPhiVo.TienMat=event;
      }
      
      if(this.thuVienPhiVo.HinhThucThanhToan.indexOf(2)>=0)
      {
        this.thuVienPhiVo.ChuyenKhoan=event;
      }
      
      if(this.thuVienPhiVo.HinhThucThanhToan.indexOf(3)>=0)
      {
        this.thuVienPhiVo.Pos=event;
      }
      
    }
    this.chuyenTienTuSoSangChu(event);
  }
  timoutChuyenTienTuSoSangChu:any;
  chuyenTienTuSoSangChu(soTien:any){
    if(this.timoutChuyenTienTuSoSangChu!=null)
    {
      clearTimeout(this.timoutChuyenTienTuSoSangChu);
    }
    var self=this;
    this.timoutChuyenTienTuSoSangChu=setTimeout(() => {
      if(soTien!=null)
      {
        self.apiService.get("Common/ChuyenTienTuSoSangChu?soTien="+soTien).subscribe((result)=>{
          self.thuVienPhiVo.TongSoTienBangChu=result;
        });
      }
      else{
        self.thuVienPhiVo.TongSoTienBangChu="Không đồng";
      }
    }, 1000);
  }
  nguoiBenhDuaModelChange(event:any){
    var tienThoiLai=(event??0)-(this.thuVienPhiVo.TienMat??0);
    this.thuVienPhiVo.TraLai=tienThoiLai>0?tienThoiLai:0;
  }
  thongSoMacDinhInPhieuVo:any={};
  getCauHinhInPhieu(){
    this.apiService.get("QuanTriNhomCauHinhThongSoMacDinh/1").subscribe((result:any)=>{
      if(result)
      {
        this.thongSoMacDinhInPhieuVo=result;
        this.thuVienPhiVo.CoInPhieu=result.Value;
      }
    })
  }
  coInPhieuChange(event:any){
    this.thongSoMacDinhInPhieuVo.Value=event;
    this.apiService.put("QuanTriNhomCauHinhThongSoMacDinh",this.thongSoMacDinhInPhieuVo).subscribe((_result)=>{
     
    },(err:any) => {

      this.validationErrors = err.ValidationErrors;
      if (err.Message != "Validation Failed") {
        CommonService.openSnackBar(this.snackBar, err.Message, "error");
      }
      else{
        const mess = this.errorService.getValidationErrors(err);
        if (mess != null) {
          CommonService.openSnackBar(this.snackBar, mess, "error",null,7000)  ;
        }
      }
    });    
  }
  
  luu(){    
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn lưu chi tiết viện phí này của người bệnh?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData("Đang lưu dữ liệu...");
        this.apiService.post("ThuNganBacSiGiaDinhThuVienPhi/LuuChiTietVienPhi",this.dichVuThuVienPhiVo).subscribe((_result)=>{
          this.closePopupLoadingData();
        },(err:any) => {
          this.validationErrors = err.ValidationErrors;
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, err.Message, "error");
          }
          else{
            const mess = this.errorService.getValidationErrors(err);
            if (mess != null) {
              CommonService.openSnackBar(this.snackBar, mess, "error",null,7000)  ;
            }
          }
          this.closePopupLoadingData();
        });
      }
    });
  }
  thuTien(){

    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn đã nhận đủ <strong class='red'>"+CommonService.formatMoney(this.thuVienPhiVo.TongThucThu)+"</strong> của người bệnh này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData("Đang lưu dữ liệu...");
        this.thuVienPhiVo.DichVus=this.tableDichVuThu._tableDataSource.data;
        this.apiService.post("ThuNganBacSiGiaDinhThuVienPhi/ThuTien",this.thuVienPhiVo).subscribe((result:any)=>{
          if(result && result.PhieuThu)
          {
            this.thuVienPhiVo.SoPhieu=result.PhieuThu.SoPhieu;
            if(this.thuVienPhiVo.CoInPhieu)
            {
              this.btnIn.onPrint();
            }
            if(result.DaHoanThanh){
              CommonService.openSnackBar(this.snackBar, "Thu tiền thành công, người bệnh đã hoàn thành khám và đã chuyển sang lịch sử.", "success");
              this.quayLaiVaTaiLaiChange.emit(true);
            }
            else{
              CommonService.openSnackBar(this.snackBar, "Thu tiền thành công", "success");
              this.tableDichVuThu.refresh();            
              this.getById(this.data.Id);
              this.thuVienPhiVo={HinhThucThanhToan:[1],NgayThu:new Date(),NoiDungThu:"Thanh toán viện phí"};
            }
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Thu tiền không thành công", "error");
          }
          this.closePopupLoadingData();
        },(err:any) => {
          this.validationErrors = err.ValidationErrors;
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, err.Message, "error");
          }
          else{
            const mess = this.errorService.getValidationErrors(err);
            if (mess != null) {
              CommonService.openSnackBar(this.snackBar, mess, "error",null,7000)  ;
            }
          }
          this.closePopupLoadingData();
        });
      }
    });
  }
  
  getContentInBienLai(dataItem:any){
    //var url=document.location.protocol +'//'+ document.location.hostname+(document.location.port!=null?":"+document.location.port:"") ;
    var LogoUrl=this.accessUser.Logo;
    //var BarCodeImgBase64=this.dichVuThuVienPhiVo.ThongTinHanhChinh!=null?this.dichVuThuVienPhiVo.ThongTinHanhChinh.Barcode:"";
    var TenPhongKham=this.accessUser.TenPhongKham;
    var SoDienThoaiPhongKham=this.accessUser.DienThoaiPhongKham;
    var DiaChiPhongKham=this.accessUser.DiaChiPhongKham;
    //var MaTN=this.dichVuThuVienPhiVo.ThongTinHanhChinh!=null?this.dichVuThuVienPhiVo.ThongTinHanhChinh.MaTiepNhan:"";
    //var MaBN= this.dichVuThuVienPhiVo.ThongTinHanhChinh!=null?this.dichVuThuVienPhiVo.ThongTinHanhChinh.MaNguoiBenh:"";
    var HoTen= this.dichVuThuVienPhiVo.ThongTinHanhChinh!=null?this.dichVuThuVienPhiVo.ThongTinHanhChinh.HoTen:"";
    var GioiTinh= this.dichVuThuVienPhiVo.ThongTinHanhChinh!=null?this.dichVuThuVienPhiVo.ThongTinHanhChinh.GioiTinhHienThi:"";
    var NamSinhDayDu= this.dichVuThuVienPhiVo.ThongTinHanhChinh!=null?this.dichVuThuVienPhiVo.ThongTinHanhChinh.NgayThangNamSinh:"";
    var SoDienThoai= this.dichVuThuVienPhiVo.ThongTinHanhChinh!=null?this.dichVuThuVienPhiVo.ThongTinHanhChinh.SoDienThoai:"";
    var DiaChi= this.dichVuThuVienPhiVo.ThongTinHanhChinh!=null?this.dichVuThuVienPhiVo.ThongTinHanhChinh.DiaChiDayDu:"";
    
    var ngayThu=dataItem.NgayThuHienThi!=null?CommonService.convertStringDDMMYYYHHMMTTToDate(dataItem.NgayThuHienThi):new Date();
    var NgayThangHientai=CommonService.formatTime(ngayThu)+ " Ngày "+ngayThu.getDate()+" tháng "+(ngayThu.getMonth()+1)+" năm "+ngayThu.getFullYear()+"";
    var NguoiThuTien=this.accessUser.FullName.toUpperCase();
    var TongSoTienBangSo=CommonService.formatMoney(dataItem.TongSoTienBangSo??0);
    var TongSoTienBangChu= dataItem.TongSoTienBangChu;
    var TienMat=CommonService.formatMoney(dataItem.TienMat??0);
    var ChuyenKhoan=CommonService.formatMoney(dataItem.ChuyenKhoan??0);
    var Pos=CommonService.formatMoney(dataItem.Pos??0);
    var NoiDungThu=dataItem.NoiDungThu;
    var SoPhieu=dataItem.SoPhieu;

    return "<html><head>	<style>		body{padding:0;margin:0 auto;}		p{padding:0;margin:0;margin-bottom:3px;}		.mb-0{margin-bottom:0}	</style></head><body>	<div style='text-align:center'>		<img src='"+LogoUrl+"' alt='' height='60'/>		<p><strong>"+TenPhongKham+"</strong></p>		<p>"+DiaChiPhongKham+"</p>		<p>"+SoDienThoaiPhongKham+"</p>		<h1 class='mb-0'>PHIẾU THU</h1>		<p>"+NgayThangHientai+"</p>	</div>	<div style='margin-top:30px'>		<p>Họ tên: <strong>"+HoTen+"</strong></p>		<p>Ngày sinh: <strong>"+NamSinhDayDu+"</strong></p>		<p>Giới tính: <strong>"+GioiTinh+"</strong></p>		<p>Điện thoại: <strong>"+SoDienThoai+"</strong></p>		<p>Địa chỉ: <strong>"+DiaChi+"</strong></p>				<p style='margin-top:15px'>Tổng số tiền: <strong>"+TongSoTienBangSo+"</strong></p>		<p><i>(Bằng chữ: <strong>"+TongSoTienBangChu+"</strong>)</i></p>		<p>Tiền mặt: <strong style='margin-right:15px'>"+TienMat+"</strong> Chuyển khoản: <strong style='margin-right:15px'>"+ChuyenKhoan+"</strong> POS: <strong>"+Pos+"</strong></p><p>Nội dung thu: <strong>"+NoiDungThu+"</strong></p><p>Số phiếu: <strong>"+SoPhieu+"</strong></p>	</div>	<div style='margin-top:30px'>		<table width='100%'>			<tr>				<td width='50%' align='center' valign='top'>									<p>Người nộp tiền</p>					<p><i>(Ký ghi rõ họ tên)</i></p>					<p style='margin-top:70px'><strong></strong></p>				</td>				<td align='center' valign='top'>									<p>Người thu tiền</p>					<p><i>(Ký ghi rõ họ tên)</i></p>					<p style='margin-top:70px'><strong>"+NguoiThuTien+"</strong></p>				</td>			</tr>		</table>	</div></body></html>";
  }
  popupLoadingData:any=null;
  showPopupLoadingData(mess: string = 'Đang tải dữ liệu...') {
    this.popupLoadingData = this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '200px',
      height: '130px',
      data: { Title: mess }
    });
  }
  closePopupLoadingData() {
    if (this.popupLoadingData != undefined && this.popupLoadingData != null) {
      this.popupLoadingData.close();
    }
  }
  tabIndex:number=0;
  selectedIndexChange(event:any){
    this.tabIndex=event;
    if(event==1)
    {
      this.getColumnsLichSuThu();
    }
    else{
      this.getColumnsDichVuThu();
    }
  }
  
  documentTypeLichSuThu:DocumentType;
  dataChonLichSuThu: any;
  columnsLichSuThu: TableColumn<any>[] = [];
  dataSourceLichSuThu: any;
  groupByColumnsLichSuThu: string[] = [];
  sortByColumnLichSuThu: SortDescriptor = { field: 'NgayThu', dir: 'asc' }; 
  @ViewChild('tableLichSuThu', { static: false }) tableLichSuThu: TableComponent;
  @ViewChild('soHoaDonTemplate', { static: true }) soHoaDonTemplate: TemplateRef<any>;
  @ViewChild('soTienTemplate', { static: true }) soTienTemplate: TemplateRef<any>;
  @ViewChild('ghiChuTemplate', { static: true }) ghiChuTemplate: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  getColumnsLichSuThu() {
    this.columnsLichSuThu = [
      { label: 'SỐ PHIẾU', property: 'SoPhieu', type: 'text', width: 130, visible: true,template:this.soHoaDonTemplate },
      { label: 'SỐ TIỀN', property: 'TongSoTienBangSo', type: 'text', width: 90, visible: true,template:this.soTienTemplate },
      { label: 'HÌNH THƯC THANH TOÁN', property: 'HinhThucThanhToan', type: 'text', width: 140, visible: true },
      { label: 'NỘI DUNG THU', property: 'NoiDungThu', type: 'text', width: 150, visible: true },
      { label: 'NGÀY THU', property: 'NgayThuHienThi', type: 'text', width: 140, visible: true},
      { label: 'NGƯỜI THU', property: 'NhanVienThu', type: 'text', width: 120, visible: true },
      { label: 'GHI CHÚ', property: 'DaHuy', type: 'text', minWidth: 200, visible: true,template:this.ghiChuTemplate },
      { label: '', property: 'Action', type: 'text', width: 120, visible: true,template:this.actionTemplate }
    ];
  }
  huyPhieu(dataItem:any){
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn hủy phiếu thu này của người bệnh?",
        inputReason:true,
        reasonLabel:"Lý do"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.Chon == true) {
        this.showPopupLoadingData("Đang lưu dữ liệu...");
        this.apiService.post("ThuNganBacSiGiaDinhThuVienPhi/HuyPhieuThu",{Id:dataItem.Id,LyDoHuy:result.Reason}).subscribe((_result)=>{
          CommonService.openSnackBar(this.snackBar, "Hủy phiếu thành công", "success");
          this.tableLichSuThu.refresh();
          this.getById(this.dichVuThuVienPhiVo.ThongTinHanhChinh.YeuCauTiepNhanId);
          this.closePopupLoadingData();
        },(err:any) => {
          this.validationErrors = err.ValidationErrors;
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, err.Message, "error");
          }
          else{
            const mess = this.errorService.getValidationErrors(err);
            if (mess != null) {
              CommonService.openSnackBar(this.snackBar, mess, "error",null,7000)  ;
            }
          }
          this.closePopupLoadingData();
        });
      }
    });
  }

  
  documentTypeDichVuThu:DocumentType;
  dataChonDichVuThu: any;
  columnsDichVuThu: TableColumn<any>[] = [];
  dataSourceDichVuThu: any={};
  groupByColumnsDichVuThu: string[] = ["Nhom"];
  sortByColumnDichVuThu: SortDescriptor = { field: 'Ten', dir: 'asc' }; 
  @ViewChild('tableDichVuThu', { static: false }) tableDichVuThu: TableComponent;
  @ViewChild('donGiaTemplate', { static: true }) donGiaTemplate: TemplateRef<any>;
  @ViewChild('thanhTienTemplate', { static: true }) thanhTienTemplate: TemplateRef<any>;
  // @ViewChild('mienGiamTemplate', { static: true }) mienGiamTemplate: TemplateRef<any>;
  // @ViewChild('daThuTemplate', { static: true }) daThuTemplate: TemplateRef<any>;
  // @ViewChild('chuaThuTemplate', { static: true }) chuaThuTemplate: TemplateRef<any>;

  @ViewChild('thanhTienFooterTemplate', { static: true }) thanhTienFooterTemplate: TemplateRef<any>;
  // @ViewChild('mienGiamFooterTemplate', { static: true }) mienGiamFooterTemplate: TemplateRef<any>;
  // @ViewChild('daThuFooterTemplate', { static: true }) daThuFooterTemplate: TemplateRef<any>;
  // @ViewChild('chuaThuFooterTemplate', { static: true }) chuaThuFooterTemplate: TemplateRef<any>;
  getColumnsDichVuThu() {
    this.columnsDichVuThu = [
      { label: 'DỊCH VỤ', property: 'Ten', type: 'text', minWidth: 200, visible: true },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true },
      { label: 'ĐƠN GIÁ', property: 'DonGia', type: 'text', width: 80, visible: true,template:this.donGiaTemplate },
      { label: 'THÀNH TIỀN', property: 'ThanhTien', type: 'text', width: 100, visible: true,template:this.thanhTienTemplate, footerTemplate: this.thanhTienFooterTemplate },
      // { label: 'MIỄN GIẢM', property: 'MienGiam', type: 'text', width: 100, visible: true,template:this.mienGiamTemplate, footerTemplate: this.mienGiamFooterTemplate},
      // { label: 'ĐÃ THU', property: 'DaThu', type: 'text', width: 100, visible: true,template:this.daThuTemplate, footerTemplate: this.daThuFooterTemplate },
      // { label: 'CHƯA THU', property: 'ChuaThu', type: 'text', width: 100, visible: true,template:this.chuaThuTemplate, footerTemplate: this.chuaThuFooterTemplate },
      // { label: 'GHI CHÚ', property: 'GhiChu', type: 'text', minWidth: 120, visible: true }
    ];
  }
}
