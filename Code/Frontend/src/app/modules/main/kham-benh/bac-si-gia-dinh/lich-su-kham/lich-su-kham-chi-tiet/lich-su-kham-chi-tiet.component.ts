import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter,  Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
declare let $: any;

@Component({
  selector: 'app-lich-su-kham-chi-tiet',
  templateUrl: './lich-su-kham-chi-tiet.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet.component.scss']
})
export class LichSuKhamChiTietComponent implements OnInit {

  thongTinHanhChinhVo:any=null;
  tabActiveIndex:number=0;
  validationErrors:any;
  isUpdate: boolean = false;
  @Input() data:any;
  @Input() displayOnPopup:boolean=false;
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiVaTaiLaiChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog:MatDialog,private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService) { }

  ngOnInit() {
    this.formatFormContent();

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
   
    if (changes.data != undefined && changes.data.currentValue.Id != null) {
      this.getLichSuKhamChiTietThongTinHanhChinh(changes.data.currentValue.Id);
    }
  }

  getLichSuKhamChiTietThongTinHanhChinh(id:number){
    //this.data = this.route.snapshot.queryParams.id;
    if(id!=null && id>0)
    {
      this.showPopupLoadingData();
      this.apiService.get("KhamBenhBacSiGiaDinhBacSiKham/GetNguoiBenhDangKhamThongTinHanhChinh/"+id).subscribe((result)=>{
        this.thongTinHanhChinhVo=result;
        this.closePopupLoadingData();
      },(err:any) => {
        this.closePopupLoadingData();
        console.log(err);
      });
    }
    else{
      this.thongTinHanhChinhVo={};
    }
  }

  formatFormContent() {
    if ($(".form-content") != null && $(".form-content").length > 0) {
      $(".form-content").css({ "height": $(window).height() - 215 });
    }
  }
  selectedIndexChange(event:number){
    this.tabActiveIndex=event;
  }
  quayLai(){
    this.quayLaiChange.emit(true);
  }
  quayLaiVaTaiLai(){
    this.quayLaiVaTaiLaiChange.emit(true);
  }
  khamLai(){
    this.dialog.open(ConfirmComponent, {
      disableClose: false,
      width: '400px',
      data: { 
        message:"Bạn chắc chắn muốn mở lại yêu cầu khám bệnh này?" ,
        yesColor:"warn"  ,
        inputReason:true,
        reasonLabel:"Lý do"
      }
  }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
      if (result.Chon==true) {
        this.showPopupLoadingData();
        this.apiService.post("KhamBenhBacSiGiaDinhLichSuBacSiKham/MoKhamLaiLichSuKhamChiTiet",{Id:this.thongTinHanhChinhVo.Id,LyDo:result.Reason}).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Mở khám lại thành công", "success");
            this.quayLaiVaTaiLai();
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Mở khám lại không thành công", "error");
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
