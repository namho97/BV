import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ErrorService } from 'src/app/core/error/error.service';
import { ApiService } from 'src/app/core/services/api.service';
import { BaseService } from 'src/app/core/services/base.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { TimKiemNguoiBenhComponent } from '../../../dung-chung/tim-kiem-nguoi-benh/tim-kiem-nguoi-benh.component';
declare let $;

@Component({
  selector: 'app-dang-ky-kham-chi-tiet',
  templateUrl: './dang-ky-kham-chi-tiet.component.html',
  styleUrls: ['./dang-ky-kham-chi-tiet.component.scss']
})
export class DangKyKhamChiTietComponent implements OnInit {

  popupLoadingData: any;
  documentType: DocumentType;
  isUpdate: boolean = false;
  chonNguoiBenhTrongHeThong: boolean = false;
  dangKyKhamVo:any={
    GioiTinh:1,
    DoChiSoSinhTon:false,
    ChiSoSinhTonViewModel:{}
  };
  dangKyKhamCompareVo:any={
    GioiTinh:1,
    DoChiSoSinhTon:false,
    ChiSoSinhTonViewModel:{}
  };
  validationErrors: any[] = [];
  isThemMoiNguoiBenh:boolean=false;
  showFormMienGiam:boolean=false;
  showChiTietVienPhi:boolean=false;
  totalResultSearch:number=null;
  searchTimeout:any=null;
  isMobile:boolean=false;
  @Input() data: any;
  @Input() formFrom: number=1;//1: Form trong tiếp nhận, 2:Form trong bác sĩ khám
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() extHuy: EventEmitter<any> = new EventEmitter<any>();
  @Output() extBatDauKham: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog,private apiService:ApiService,private baseService:BaseService,private snackBar:MatSnackBar,
    private errorService:ErrorService,private devideService:DeviceDetectorService) { }

  ngOnInit() {
    this.isMobile=this.devideService.isMobile();
    this.documentType = DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.dangKyKhamVo={
          ThoiDiemTiepNhan:new Date(),
          GioiTinh:1,
          DoChiSoSinhTon:false,
          ChiSoSinhTonViewModel:{}};
          this.laySoThuTuMoiNhat();
          this.getTienKham();
          this.dangKyKhamCompareVo=CommonService.copyObject(this.dangKyKhamVo);
      }
      else {
        this.isUpdate = true;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }  
  getById(id) {
    if (id != null && id > 0) {
      this.baseService.getById(id).subscribe((result)=>{
        this.dangKyKhamVo=result;
        this.dangKyKhamCompareVo=CommonService.copyObject(this.dangKyKhamVo);
      })
    }
  }

  ngAfterContentInit(): void {
    if(this.formFrom==2)
    {
      if ($(".form-content-kham-benh") != null && $(".form-content-kham-benh").length > 0) {
        $(".form-content-kham-benh").css({ "height": $(window).height() - 115 });
      }
      if ($(".form-content") != null && $(".form-content").length > 0) {
        $(".form-content").css({ "height": $(window).height() - 167 });
      }
    }
  }

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

  //#region combobox ngày sinh
  ngayThangNamSinhChange(event:any){
    if(event!=null)
    {
      this.dangKyKhamVo.NamSinh=(new Date(event)).getFullYear();
    }
    else{
      this.dangKyKhamVo.NamSinh=null;
    }
  }
  //#endregion combobox ngày sinh

  //#region actions
  chonMaNguoiBenh(event:any){
    this.dangKyKhamVo.MaNguoiBenh=event!=null?event.MaNguoiBenh:null;
    this.dangKyKhamVo.HoTen=event!=null?event.HoTen:null;
    this.dangKyKhamVo.NamSinh=event!=null?event.NamSinh:null;
    this.dangKyKhamVo.SoDienThoai=event!=null?event.SoDienThoai:null;
    this.dangKyKhamVo.GioiTinh=event!=null?(event.GioiTinh=="Nam"?1:2):null;
    this.chonNguoiBenhTrongHeThong=true;
    //this.dangKyKhamVo.DiaChi=event.DiaChi;

  }
  taoNguoiBenhMoi(){
    this.dangKyKhamVo.MaNguoiBenh=null;
    this.dangKyKhamVo.HoTen=null;
    this.dangKyKhamVo.NamSinh=null;
    this.dangKyKhamVo.SoDienThoai=null;
    this.dangKyKhamVo.GioiTinh=1;
    this.chonNguoiBenhTrongHeThong=false;
  }
  laDangKyHenKhamChange(event:any){
      this.dangKyKhamVo.NgayHenKham=!event?null: CommonService.getNowDateOnly();
      this.dangKyKhamVo.GioHenKham=!event?null:CommonService.time2sec(new Date());
      this.dangKyKhamVo.HinhThucHen=!event?null:1;
  }
  timNguoiBenh(_type:number,_event:string){
    if(this.searchTimeout!=null)
    {
      clearTimeout(this.searchTimeout);
    }
    var self=this;
    self.totalResultSearch=null;
    if((self.dangKyKhamVo.HoTen!=null && self.dangKyKhamVo.HoTen!="")||
    (self.dangKyKhamVo.SoDienThoai!=null && self.dangKyKhamVo.SoDienThoai!="")||
    (self.dangKyKhamVo.SoChungMinhThu!=null && self.dangKyKhamVo.SoChungMinhThu!=""))
    {
      this.searchTimeout=setTimeout(function(){
        self.apiService.post("QuanTriNhomNguoiBenhNguoiBenh/GetDataForGridAsync",{HoTen:self.dangKyKhamVo.HoTen,SoDienThoai:self.dangKyKhamVo.SoDienThoai,SoChungMinhThu:self.dangKyKhamVo.SoChungMinhThu}).subscribe((result:any)=>{
          self.totalResultSearch=result.TotalRowCount;
        });
      },500);
    }
  }
  hienThiKetQuaTimKiem(){
    let dialogRef = this.dialog.open(TimKiemNguoiBenhComponent, {
      width:"1200px",
      data: {
       MaNguoiBenh:this.dangKyKhamVo.MaNguoiBenh,
       HoTen:this.dangKyKhamVo.HoTen,
       SoDienThoai:this.dangKyKhamVo.SoDienThoai,
       SoChungMinhThu:this.dangKyKhamVo.SoChungMinhThu
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dangKyKhamVo.NguoiBenhId=result.Id;
        this.dangKyKhamVo.MaNguoiBenh=result.MaNguoiBenh;
        this.dangKyKhamVo.HoTen=result.HoTen;
        this.dangKyKhamVo.SoDienThoai=result.SoDienThoai;
        this.dangKyKhamVo.SoChungMinhThu=result.SoChungMinhThu;
        this.dangKyKhamVo.NamSinh=result.NamSinh;
        this.dangKyKhamVo.NgayThangNamSinh=result.NgayThangNamSinh;
        this.dangKyKhamVo.GioiTinh=result.GioiTinh;
        this.dangKyKhamVo.NgheNghiep=result.NgheNghiep;
        this.dangKyKhamVo.HoVaTenNguoiGiamHo=result.HoVaTenNguoiGiamHo;
        this.dangKyKhamVo.TinhThanhId=result.TinhThanhId;
        this.dangKyKhamVo.QuanHuyenId=result.QuanHuyenId;
        this.dangKyKhamVo.PhuongXaId=result.PhuongXaId;
        this.dangKyKhamVo.KhomApId=result.KhomApId;
        this.dangKyKhamVo.SoNha=result.SoNha;
      }
    });
  }
  onKey(event: any) {
    if (event.key == 'Enter' && !this.isUpdate) {
      this.hienThiKetQuaTimKiem();
    }
  }
  quayLai() {
    this.quayLaiChange.emit(true);
  }
  nhapLai() {
    this.ngOnInit();
  }
  luu() {
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn lưu tiếp nhận này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.apiService.post("TiepNhanNguoiBenhBacSiGiaDinhDangKyKham/TaoDangKyKham",this.dangKyKhamVo).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Đăng ký khám thành công", "success");
            this.dangKyKhamVo={
              ThoiDiemTiepNhan:new Date(),
              GioiTinh:1,
              DoChiSoSinhTon:false,
              ChiSoSinhTonViewModel:{}
            };
            this.laySoThuTuMoiNhat();
            this.getTienKham();
            this.dangKyKhamCompareVo=CommonService.copyObject(this.dangKyKhamVo);
            this.dataChange.emit(true);
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Đăng ký khám không thành công", "error");
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
  luuVaThuTien() {
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn lưu tiếp nhận này và thu luôn tiền khám của người bệnh?",
        yesColor:"warn"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.dangKyKhamVo.DangKyVaThuTien=true;
        this.apiService.post("TiepNhanNguoiBenhBacSiGiaDinhDangKyKham/TaoDangKyKham",this.dangKyKhamVo).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Đăng ký khám và thu tiền thành công", "success");
            this.dangKyKhamVo={
              ThoiDiemTiepNhan:new Date(),
              GioiTinh:1,
              DoChiSoSinhTon:false,
              ChiSoSinhTonViewModel:{}
            };
            this.laySoThuTuMoiNhat();
            this.getTienKham();
            this.dangKyKhamCompareVo=CommonService.copyObject(this.dangKyKhamVo);
            this.dataChange.emit(true);
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Đăng ký khám và thu tiền không thành công", "error");
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
  capNhat() {
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn cập nhật tiếp nhận này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.apiService.post("TiepNhanNguoiBenhBacSiGiaDinhDangKyKham/CapNhatDangKyKham",this.dangKyKhamVo).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Cập nhật đăng ký khám thành công", "success");
            this.dangKyKhamCompareVo=CommonService.copyObject(this.dangKyKhamVo);
            this.dataChange.emit(true);
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Cập nhật đăng ký khám không thành công", "error");
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
  thuTien(){
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn đã nhận đủ <strong class='red'>"+this.dangKyKhamVo.TienKham+"</strong> của người bệnh này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {

      }
    });
  }
  //#endregion actions
  nguoiBenhDaDen(){
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn người bệnh đã đến phòng khám?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.apiService.post("TiepNhanNguoiBenhBacSiGiaDinhDangKyKham/CapNhatTrangThaiDen",{Id:this.dangKyKhamVo.Id}).subscribe((result)=>{
          if(result)
          {
            this.dangKyKhamVo=result;
            CommonService.openSnackBar(this.snackBar, "Cập nhật tình trạng đã đến thành công", "success");
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Cập nhật tình trạng đã đến không thành công", "error");
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
  luuTienKhamClick(){
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn lưu giá tiền khám này thành giá mặc định?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.apiService.post("QuanTriNhomPhongKhamDichVuKham/CapNhatGia",{Gia:this.dangKyKhamVo.TienKham,TuNgay:new Date()}).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Cập nhật tiền khám thành công", "success");
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Cập nhật tiền khám không thành công", "error");
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
  laySoThuTuMoiNhat(){
    this.apiService.get("TiepNhanNguoiBenhBacSiGiaDinhDangKyKham/LaySoThuTuMoiNhat").subscribe((result)=>{
      this.dangKyKhamVo.SoThuTu=result;
    })
  }
  getTienKham(){
    this.apiService.get("QuanTriNhomPhongKhamDichVuKham/GetDichVuKhamBenhMacDinh").subscribe((result:any)=>{
      if(result)
      {
        this.dangKyKhamVo.TienKham=result.Gia;
        this.dangKyKhamVo.TienKhamGoc=result.Gia;
      }
    })
  }
  tinhBMI(){
    if(this.dangKyKhamVo.ChiSoSinhTonViewModel.CanNang!=null && this.dangKyKhamVo.ChiSoSinhTonViewModel.CanNang!="" &&
    this.dangKyKhamVo.ChiSoSinhTonViewModel.ChieuCao!=null && this.dangKyKhamVo.ChiSoSinhTonViewModel.ChieuCao!="")
    {
      this.dangKyKhamVo.ChiSoSinhTonViewModel.Bmi=((parseFloat(this.dangKyKhamVo.ChiSoSinhTonViewModel.CanNang)*10000) / (parseFloat(this.dangKyKhamVo.ChiSoSinhTonViewModel.ChieuCao)*parseFloat(this.dangKyKhamVo.ChiSoSinhTonViewModel.ChieuCao))).toFixed(2);
    }
    else{
      this.dangKyKhamVo.ChiSoSinhTonViewModel.Bmi=null;
    }
  }
  batDauKham(){
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn bắt đầu khám cho người bệnh này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.apiService.post("TiepNhanNguoiBenhBacSiGiaDinhDangKyKham/TaoDangKyKham",this.dangKyKhamVo).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Đăng ký khám thành công", "success");
            this.extBatDauKham.emit(this.dangKyKhamVo);
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Đăng ký khám không thành công", "error");
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
  huy(){
    this.extHuy.emit(null);
  }

  huyDangKy(){
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn hủy đăng ký khám của người bệnh này?",
        yesColor:"warn",
        inputReason:true,
        reasonLabel:"Lý do"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.Chon  == true) {
        this.showPopupLoadingData();
        this.apiService.post("TiepNhanNguoiBenhBacSiGiaDinhDangKyKham/HuyDangKyKham",{Id:this.dangKyKhamVo.Id,LyDoHuy:result.Reason}).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Hủy đăng ký khám thành công", "success");
            this.dataChange.emit(true);
            this.quayLai();
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Hủy đăng ký khám không thành công", "error");
          }
          this.closePopupLoadingData();
        },(err:any) => {
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, err.Message, "error");
          }
          else{
            console.log(err);
          }
          this.closePopupLoadingData();
        });
      }
    });
  }
  themHoacSuaTinhThanhLuuChange(event:any){
    this.dangKyKhamVo.TinhThanhId=event.Id;
    this.dangKyKhamVo.TinhThanhTen=event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaQuanHuyenLuuChange(event:any){
    this.dangKyKhamVo.QuanHuyenId=event.Id;
    this.dangKyKhamVo.QuanHuyenTen=event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaPhuongXaLuuChange(event:any){
    this.dangKyKhamVo.PhuongXaId=event.Id;
    this.dangKyKhamVo.PhuongXaTen=event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaThonXomLuuChange(event:any){
    this.dangKyKhamVo.KhomApId=event.Id;
    this.dangKyKhamVo.KhomApTen=event.Ten;
    this.dialog.closeAll();
  }
}
