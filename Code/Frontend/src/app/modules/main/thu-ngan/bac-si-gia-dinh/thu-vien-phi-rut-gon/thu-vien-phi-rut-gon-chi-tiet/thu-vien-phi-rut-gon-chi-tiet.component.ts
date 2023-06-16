import { ErrorService } from 'src/app/core/error/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
declare let $: any;

@Component({
  selector: 'app-thu-vien-phi-rut-gon-chi-tiet',
  templateUrl: './thu-vien-phi-rut-gon-chi-tiet.component.html',
  styleUrls: ['./thu-vien-phi-rut-gon-chi-tiet.component.scss']
})
export class ThuVienPhiRutGonChiTietComponent implements OnInit {

  thuVienPhiVo:any={HinhThucThanhToan:[1],NgayThu:new Date(),NoiDungThu:"Thanh toán viện phí"};
  dichVuThuVienPhiVo:any={};
  validationErrors:any=null;
  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<ThuVienPhiRutGonChiTietComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService) { }

  ngOnInit() {
    this.getChiTietVienPhi();
    var self=this;
    setTimeout(function(){
      self.formatFormContent();
    });
  }
  formatFormContent() {
    if ($(".form-content") != null && $(".form-content").length > 0) {
      $(".form-content").css({ "height": $(window).height() - 161 });
    }
  }
  getChiTietVienPhi(){
    this.apiService.get("ThuNganBacSiGiaDinhThuVienPhi/GetChiTietVienPhi/"+this.data.id).subscribe((result)=>{
      this.dichVuThuVienPhiVo=result;
      this.thuVienPhiVo.TienMat=this.dichVuThuVienPhiVo.TongChuaThu;
    });
  }
  close(result = null) {
    this.dialogRef.close(result);
  }

  sum(type:number){
    var total = 0;
    if(this.dichVuThuVienPhiVo.DichVus!=null)
    {
      switch(type)
      {
        case 1:
          this.dichVuThuVienPhiVo.DichVus.forEach(item => {
            total+=parseInt(item.SoTien);
          });
          break;
        case 2:
          this.dichVuThuVienPhiVo.DichVus.forEach(item => {
            total+=parseInt(item.MienGiam);
          });
          break;
        case 3:
          this.dichVuThuVienPhiVo.DichVus.forEach(item => {
            total+=parseInt(item.DaThu);
          });
          break;
        case 4:
          this.dichVuThuVienPhiVo.DichVus.forEach(item => {
            total+=parseInt(item.ChuaThu);
          });
          break;
      }
    }
    return total;
  }
  sumChiTiet(type:number,chiTiets:any){
    var total = 0;
    switch(type)
    {
      case 1:
        chiTiets.forEach(item => {
          total+=parseInt(item.SoLuong);
        });
        break;
      case 2:
        chiTiets.forEach(item => {
          total+=parseInt(item.SoLuong)*parseInt(item.DonGia);
        });
        break;
    }
    return total;
  }
  tinhChuaThu(dataItem:any){
    var cal=(dataItem.SoTien??0)-(dataItem.MienGiam??0)-(dataItem.DaThu??0);
    dataItem.ChuaThu=cal>0?cal:0;
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
        message: "Bạn chắc chắn đã nhận đủ <strong class='red'>"+CommonService.formatMoney(this.sum(4))+"</strong> của người bệnh này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData("Đang lưu dữ liệu...");
        this.apiService.post("ThuNganBacSiGiaDinhThuVienPhi/ThuTien",this.thuVienPhiVo).subscribe((_result)=>{
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
  nguoiBenhDuaModelChange(){
    var tienThoiLai=this.thuVienPhiVo.NguoiBenhDua-((this.thuVienPhiVo.TienMat??0)+(this.thuVienPhiVo.ChuyenKhoan??0)+(this.thuVienPhiVo.Pos??0));
    this.thuVienPhiVo.TraLai=tienThoiLai>0?Number(tienThoiLai).toLocaleString('de-DE'):0;
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
  }
  
  documentTypeLichSuThu:DocumentType;
  dataChonLichSuThu: any;
  columnsLichSuThu: TableColumn<any>[] = [];
  dataSourceLichSuThu: any;
  groupByColumnsLichSuThu: string[] = [];
  sortByColumnLichSuThu: SortDescriptor = { field: 'NgayThu', dir: 'asc' }; 
  getColumnsLichSuThu() {
    this.columnsLichSuThu = [
      { label: 'SỐ HÓA ĐƠN', property: 'SoHoaDon', type: 'text', width: 80, visible: true },
      { label: 'SỐ TIỀN', property: 'SoTienHienThi', type: 'text', width: 90, visible: true },
      { label: 'HÌNH THƯC THANH TOÁN', property: 'HinhThucThanhToan', type: 'text', minWidth: 140, visible: true },
      { label: 'NỘI DUNG THU', property: 'NoiDungThu', type: 'text', width: 150, visible: true },
      { label: 'NGÀY THU', property: 'NgayThu', type: 'text', width: 140, visible: true},
      { label: 'NGƯỜI THU', property: 'NguoiThu', type: 'text', width: 120, visible: true }
    ];
  }
}
