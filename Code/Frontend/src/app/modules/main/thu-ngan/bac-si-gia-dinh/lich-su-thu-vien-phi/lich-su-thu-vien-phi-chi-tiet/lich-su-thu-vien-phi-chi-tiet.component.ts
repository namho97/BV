import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { AccessUser } from 'src/app/shared/models/access-user.model';
declare let $: any;

@Component({
  selector: 'app-lich-su-thu-vien-phi-chi-tiet',
  templateUrl: './lich-su-thu-vien-phi-chi-tiet.component.html',
  styleUrls: ['./lich-su-thu-vien-phi-chi-tiet.component.scss']
})
export class LichSuThuVienPhiChiTietComponent implements OnInit {

  dichVuThuVienPhiVo:any={};
  validationErrors:any=null;
  accessUser:AccessUser;
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiVaTaiLaiChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService,private dialog: MatDialog,private authService:AuthService) { }

  ngOnInit() {
    this.accessUser = this.authService.getAccessUser();
    this.getColumnsLichSuThu();
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
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
     
    this.apiService.get("ThuNganBacSiGiaDinhThuVienPhi/GetChiTietVienPhi/"+id).subscribe((result)=>{
      this.dichVuThuVienPhiVo=result;
      this.tableLichSuThu.refresh();
      
    });
    }
  }
  formatContent(){
    
    if ($("#thu-tien-content") != null && $("#thu-tien-content").length > 0) {
      $("#thu-tien-content").css({ "height": $(window).height() - 343 });
    }
    if ($("#noi-dung-content") != null && $("#noi-dung-content").length > 0) {
      $("#noi-dung-content").css({ "height": $(window).height() - 397 });
    }
  }

  quayLai() {
    this.quayLaiChange.emit(true);
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
          this.quayLaiVaTaiLaiChange.emit(true);
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


}
