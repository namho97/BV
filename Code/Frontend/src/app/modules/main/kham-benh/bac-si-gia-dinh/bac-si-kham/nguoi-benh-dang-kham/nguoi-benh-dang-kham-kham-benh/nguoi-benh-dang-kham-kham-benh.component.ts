import { AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-nguoi-benh-dang-kham-kham-benh',
  templateUrl: './nguoi-benh-dang-kham-kham-benh.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-kham-benh.component.scss']
})
export class NguoiBenhDangKhamKhamBenhComponent implements OnInit,AfterViewInit,DoCheck {

  timeoutCheckChange:any=null;
  request:any=null;
  khamLamSangCompareVo:any={};//Lưu lại data của lần lưu cuối cùng, dùng cho việc so sánh object có thay đổi hay không
  khamLamSangOriginVo:any={};//Lưu lại data gốc ban đầu, dùng để cho việc reset form

  khamLamSangVo:any={};
  validationErrors:any;
  @Input() data:any;
  @Input() taoDangKyMoi:any;
  @Input() nhanLuu:boolean;
  @Input() nhanHoanThanhKham:boolean;
  @Input() nhanNhapLai:boolean;
  @Output() extLuuXong= new EventEmitter<any>();
  constructor(private dialog: MatDialog,private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data != undefined && changes.data.currentValue != null) {
      this.getNguoiBenhDangKhamThongTinKhamLamSan();
    }
    if (changes.nhanLuu != undefined && changes.nhanLuu.currentValue != null && changes.nhanLuu.currentValue==true) {
      this.luu();
    }
    if (changes.nhanNhapLai != undefined && changes.nhanNhapLai.currentValue != null && changes.nhanNhapLai.currentValue==true) {      
      this.khamLamSangCompareVo=CommonService.copyObject(this.khamLamSangOriginVo);
      this.khamLamSangVo=CommonService.copyObject(this.khamLamSangOriginVo);
      this.luu();
    }
  }
  ngOnDestroy(){
    if(CommonService.compareObjectChange(this.khamLamSangCompareVo,this.khamLamSangVo))
    {
      this.showPopupLoadingData("Đang lưu dữ liệu khám lâm sàng...");
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
      if(CommonService.compareObjectChange(self.khamLamSangCompareVo,self.khamLamSangVo))
      {
        self.luu();
      }
    },5000);
  }
  getNguoiBenhDangKhamThongTinKhamLamSan(){
    this.showPopupLoadingData();
    this.apiService.get("KhamBenhBacSiGiaDinhBacSiKham/GetNguoiBenhDangKhamThongTinKhamLamSang/"+this.data).subscribe((result)=>{
      this.khamLamSangVo=result;
      this.khamLamSangCompareVo=CommonService.copyObject(this.khamLamSangVo);
      this.khamLamSangOriginVo=CommonService.copyObject(this.khamLamSangVo);
      this.closePopupLoadingData();
    },(err:any) => {
      this.closePopupLoadingData();
      console.log(err);
    });
  }
  tinhBMI(){
    if(this.khamLamSangVo.ChiSoSinhTon.CanNang!=null && this.khamLamSangVo.ChiSoSinhTon.CanNang!="" &&
    this.khamLamSangVo.ChiSoSinhTon.ChieuCao!=null && this.khamLamSangVo.ChiSoSinhTon.ChieuCao!="")
    {
      this.khamLamSangVo.ChiSoSinhTon.Bmi=((parseFloat(this.khamLamSangVo.ChiSoSinhTon.CanNang)*10000) / (parseFloat(this.khamLamSangVo.ChiSoSinhTon.ChieuCao)*parseFloat(this.khamLamSangVo.ChiSoSinhTon.ChieuCao))).toFixed(2);
    }
    else{
      this.khamLamSangVo.ChiSoSinhTon.Bmi=null;
    }
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
    this.khamLamSangVo.HoanThanhKham=this.nhanHoanThanhKham;
    var dataCopy=CommonService.copyObject(this.khamLamSangVo);
    this.request=this.apiService.post("KhamBenhBacSiGiaDinhBacSiKham/LuuKhamLamSang",dataCopy).subscribe(()=>{
      this.khamLamSangCompareVo=CommonService.copyObject(dataCopy);
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
