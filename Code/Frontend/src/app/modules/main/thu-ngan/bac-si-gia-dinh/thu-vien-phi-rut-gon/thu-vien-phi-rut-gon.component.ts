import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { PrintButtonComponent } from 'src/app/shared/components/print-button/print-button.component';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { ThuVienPhiRutGonChiTietComponent } from './thu-vien-phi-rut-gon-chi-tiet/thu-vien-phi-rut-gon-chi-tiet.component';
declare let $: any;

@Component({
  selector: 'app-thu-vien-phi-rut-gon',
  templateUrl: './thu-vien-phi-rut-gon.component.html',
  styleUrls: ['./thu-vien-phi-rut-gon.component.scss']
})
export class ThuVienPhiRutGonComponent implements OnInit {

  showFormMienGiam:boolean=false;
  showChiTietVienPhi:boolean=false;
  validationErrors:any;
  thuVienPhiVo:any={};
  accessUser:AccessUser;
  @ViewChild('btnIn', { static: true }) btnIn: PrintButtonComponent;
  @Input() viewOnly:boolean=false;
  @Input() width:string="20%";
  @Input() id:number;
  @Output() extClosePopup= new EventEmitter<any>();
  constructor(private dialog: MatDialog,private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService,private authService:AuthService) { }

  ngOnInit() {
    this.accessUser = this.authService.getAccessUser();
    this.getChiTietVienPhi();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.id && changes.id.currentValue) {     
      this.getChiTietVienPhi();
    }
  }  
  getChiTietVienPhi(){
    this.apiService.get("ThuNganBacSiGiaDinhThuVienPhi/GetChiTietVienPhi/"+this.id).subscribe((result)=>{
      this.thuVienPhiVo=result;
      this.getCauHinhInPhieu();
    });
  }
  sum(type:number){
    var total = 0;
    switch(type)
    {
      case 1:
        this.thuVienPhiVo.ChiTietVienPhis.forEach(item => {
          total+=parseInt(item.SoTien);
        });
        break;
      case 2:
        this.thuVienPhiVo.ChiTietVienPhis.forEach(item => {
          total+=parseInt(item.MienGiam);
        });
        break;
      case 3:
        this.thuVienPhiVo.ChiTietVienPhis.forEach(item => {
          total+=parseInt(item.DaThu);
        });
        break;
      case 4:
        this.thuVienPhiVo.ChiTietVienPhis.forEach(item => {
          total+=parseInt(item.ChuaThu);
        });
        break;
    }
    return total;
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
  

  chiTietVienPhi(){
    this.dialog.open(ThuVienPhiRutGonChiTietComponent, {
      disableClose: false,
      width: ($(window).width()-50>1500?1500:$(window).width()-50)+"px",
      data: {
        viewOnly:this.viewOnly,
        id:this.id
      }
    }).afterClosed().subscribe(_result => {/* result is a boolean:true,false,null*/
       
        this.getChiTietVienPhi();
        this.extClosePopup.emit(true);
    });
  }
  
  getContentInBienLai(dataItem:any){
    //var url=document.location.protocol +'//'+ document.location.hostname+(document.location.port!=null?":"+document.location.port:"") ;
    var LogoUrl=this.accessUser.Logo;
    //var BarCodeImgBase64=this.thuVienPhiVo.ThongTinHanhChinh!=null?this.thuVienPhiVo.ThongTinHanhChinh.Barcode:"";
    var TenPhongKham=this.accessUser.TenPhongKham;
    var SoDienThoaiPhongKham=this.accessUser.DienThoaiPhongKham;
    var DiaChiPhongKham=this.accessUser.DiaChiPhongKham;
    //var MaTN=this.thuVienPhiVo.ThongTinHanhChinh!=null?this.thuVienPhiVo.ThongTinHanhChinh.MaTiepNhan:"";
    //var MaBN= this.thuVienPhiVo.ThongTinHanhChinh!=null?this.thuVienPhiVo.ThongTinHanhChinh.MaNguoiBenh:"";
    var HoTen= this.thuVienPhiVo.ThongTinHanhChinh!=null?this.thuVienPhiVo.ThongTinHanhChinh.HoTen:"";
    var GioiTinh= this.thuVienPhiVo.ThongTinHanhChinh!=null?this.thuVienPhiVo.ThongTinHanhChinh.GioiTinhHienThi:"";
    var NamSinhDayDu= this.thuVienPhiVo.ThongTinHanhChinh!=null?this.thuVienPhiVo.ThongTinHanhChinh.NgayThangNamSinh:"";
    var SoDienThoai= this.thuVienPhiVo.ThongTinHanhChinh!=null?this.thuVienPhiVo.ThongTinHanhChinh.SoDienThoai:"";
    var DiaChi= this.thuVienPhiVo.ThongTinHanhChinh!=null?this.thuVienPhiVo.ThongTinHanhChinh.DiaChiDayDu:"";
    
    var now=new Date();
    var NgayThangHientai=CommonService.formatTime(now)+ ", Ngày "+now.getDate()+" tháng "+(now.getMonth()+1)+" năm "+now.getFullYear()+"";
    var NguoiThuTien=this.accessUser.FullName.toUpperCase();
    var TongSoTienBangSo=CommonService.formatMoney(dataItem.TongSoTienBangSo??0);
    var TongSoTienBangChu= dataItem.TongSoTienBangChu;
    var TienMat=CommonService.formatMoney(dataItem.TienMat??0);
    var ChuyenKhoan=CommonService.formatMoney(dataItem.ChuyenKhoan??0);
    var Pos=CommonService.formatMoney(dataItem.Pos??0);
    var NoiDungThu=dataItem.NoiDungThu;

    return "<html><head>	<style>		body{padding:0;margin:0 auto;}		p{padding:0;margin:0;margin-bottom:3px;}		.mb-0{margin-bottom:0}	</style></head><body>	<div style='text-align:center'>		<img src='"+LogoUrl+"' alt='' height='60'/>		<p><strong>"+TenPhongKham+"</strong></p>		<p>"+DiaChiPhongKham+"</p>		<p>"+SoDienThoaiPhongKham+"</p>		<h1 class='mb-0'>PHIẾU THU</h1>		<p>"+NgayThangHientai+"</p>	</div>	<div style='margin-top:30px'>		<p>Người nộp tiền: <strong>"+HoTen+"</strong></p>		<p>Ngày sinh: <strong>"+NamSinhDayDu+"</strong></p>		<p>Giới tính: <strong>"+GioiTinh+"</strong></p>		<p>Điện thoại: <strong>"+SoDienThoai+"</strong></p>		<p>Địa chỉ: <strong>"+DiaChi+"</strong></p>				<p style='margin-top:15px'>Tổng số tiền: <strong>"+TongSoTienBangSo+"</strong></p>		<p><i>(Bằng chữ: <strong>"+TongSoTienBangChu+"</strong>)</i></p>		<p>Tiền mặt: <strong style='margin-right:15px'>"+TienMat+"</strong> Chuyển khoản: <strong style='margin-right:15px'>"+ChuyenKhoan+"</strong> POS: <strong>"+Pos+"</strong></p><p>Nội dung thu: <strong>"+NoiDungThu+"</strong></p>	</div>	<div style='margin-top:30px'>		<table width='100%'>			<tr>				<td width='50%' align='center' valign='top'>									<p>Người nộp tiền</p>					<p><i>(Ký ghi rõ họ tên)</i></p>					<p style='margin-top:70px'><strong>"+HoTen+"</strong></p>				</td>				<td align='center' valign='top'>									<p>Người thu tiền</p>					<p><i>(Ký ghi rõ họ tên)</i></p>					<p style='margin-top:70px'><strong>"+NguoiThuTien+"</strong></p>				</td>			</tr>		</table>	</div></body></html>";
  }
  thuTien(){

    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn đã nhận đủ <strong class='red'>"+CommonService.formatMoney(this.thuVienPhiVo.TongChuaThu)+"</strong> của người bệnh này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData("Đang lưu dữ liệu...");
        var thuVienPhiVo={YeuCauTiepNhanId:this.thuVienPhiVo.ThongTinHanhChinh.YeuCauTiepNhanId, HinhThucThanhToan:[1],TienMat:this.thuVienPhiVo.TongChuaThu,NgayThu:new Date(),NoiDungThu:"Thanh toán viện phí",ThuNhanh:true};
        this.apiService.post("ThuNganBacSiGiaDinhThuVienPhi/ThuTien",thuVienPhiVo).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Thu tiền thành công", "success");
            if(this.thuVienPhiVo.CoInPhieu)
            {
              this.btnIn.onPrint();
            }
            this.getChiTietVienPhi();
            this.extClosePopup.emit(true);
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
}
