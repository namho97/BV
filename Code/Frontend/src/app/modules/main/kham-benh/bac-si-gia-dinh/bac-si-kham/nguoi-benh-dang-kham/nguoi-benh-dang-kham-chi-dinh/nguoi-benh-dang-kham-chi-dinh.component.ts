import { Component, DoCheck, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-nguoi-benh-dang-kham-chi-dinh',
  templateUrl: './nguoi-benh-dang-kham-chi-dinh.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-chi-dinh.component.scss']
})
export class NguoiBenhDangKhamChiDinhComponent implements OnInit,DoCheck {

  timeoutCheckChange:any=null;
  request:any=null;
  canLamSanCompareVo:any={};//Lưu lại data của lần lưu cuối cùng, dùng cho việc so sánh object có thay đổi hay không
  canLamSanOriginVo:any={};//Lưu lại data gốc ban đầu, dùng để cho việc reset form

  documentType:DocumentType;
  validationErrors:any;
  canLamSanVo: any={};
  @Input() data:any;
  @Input() taoDangKyMoi:any;
  @Input() nhanLuu:boolean;
  @Input() nhanHoanThanhKham:boolean;
  @Input() nhanNhapLai:boolean;
  @Output() extLuuXong= new EventEmitter<any>();
  constructor(private dialog:MatDialog,private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService) { }

  ngOnInit() {
    this.documentType=DocumentType.KhamBenhBacSiGiaDinhBacSiKham;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data != undefined && changes.data.currentValue != null) {
      this.getNguoiBenhDangKhamThongTinCanLamSan();
    }
    if (changes.nhanLuu != undefined && changes.nhanLuu.currentValue != null && changes.nhanLuu.currentValue==true) {
      this.luu();
    }
    if (changes.nhanNhapLai != undefined && changes.nhanNhapLai.currentValue != null && changes.nhanNhapLai.currentValue==true) {      
      this.canLamSanCompareVo=CommonService.copyObject(this.canLamSanOriginVo);
      this.canLamSanVo=CommonService.copyObject(this.canLamSanOriginVo);
      this.luu();
    }
  }
  ngOnDestroy(){
    if(CommonService.compareObjectChange(this.canLamSanCompareVo,this.canLamSanVo))
    {
      this.showPopupLoadingData("Đang lưu dữ liệu cận lâm sàng...");
      this.luu();
    }
    if(this.timeoutCheckChange!=null)
    {
      clearTimeout(this.timeoutCheckChange);
    }
  }
  ngDoCheck(){    
    this.checkChange();
  }
  checkChange(){
    var self=this;
    if(this.timeoutCheckChange!=null)
    {
      clearTimeout(this.timeoutCheckChange);
    }
    this.timeoutCheckChange=setTimeout(function(){
      if(CommonService.compareObjectChange(self.canLamSanCompareVo,self.canLamSanVo))
      {
        self.luu();
      }
    },5000);
  }
  getNguoiBenhDangKhamThongTinCanLamSan(){
    this.showPopupLoadingData();
    this.apiService.get("KhamBenhBacSiGiaDinhBacSiKham/GetNguoiBenhDangKhamThongTinCanLamSang/"+this.data).subscribe((result)=>{
      this.canLamSanVo=result;
      this.canLamSanCompareVo=CommonService.copyObject(this.canLamSanVo);
      this.canLamSanOriginVo=CommonService.copyObject(this.canLamSanVo);
      this.closePopupLoadingData();
    },(err:any) => {
      this.closePopupLoadingData();
      console.log(err);
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
  luu(){
    if(this.request!=null)
    {
      this.request.unsubscribe();
    }
    this.canLamSanVo.HoanThanhKham=this.nhanHoanThanhKham;
    var dataCopy=CommonService.copyObject(this.canLamSanVo);
    this.request=this.apiService.post("KhamBenhBacSiGiaDinhBacSiKham/LuuCanLamSang",dataCopy).subscribe(()=>{
      this.canLamSanCompareVo=CommonService.copyObject(dataCopy);
      this.nhanLuu=false;
      this.extLuuXong.emit(true);
      this.closePopupLoadingData();
    },(err:any) => {

      this.extLuuXong.emit(true);
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
}
