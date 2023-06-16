import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { BaseService } from 'src/app/core/services/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-lich-su-dang-ky-kham-chi-tiet',
  templateUrl: './lich-su-dang-ky-kham-chi-tiet.component.html',
  styleUrls: ['./lich-su-dang-ky-kham-chi-tiet.component.scss']
})
export class LichSuDangKyKhamChiTietComponent implements OnInit {

  popupLoadingData: any;
  documentType: DocumentType;
  isUpdate: boolean = false;
  lichSuDangKyKhamVo:any={
    ThongTinLichHenViewModel:{},
    ThongTinHanhChinhViewModel:{},
    ThongTinTiepNhanViewModel:{},
    DoChiSoSinhTon:false,
    ChiSoSinhTonViewModel:{}
  };
  validationErrors: any[] = [];
  isThemMoiNguoiBenh:boolean=false;
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiVaTaiLaiChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog,private baseService:BaseService,private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService) { }

  ngOnInit() {
    this.documentType = DocumentType.TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.lichSuDangKyKhamVo={
          DoChiSoSinhTon:false,
          ChiSoSinhTonViewModel:{}
        };
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
        this.lichSuDangKyKhamVo=result;
      })
    }
  }

  ngAfterContentInit(): void {
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

  //#region actions
  quayLai() {
    this.quayLaiChange.emit(true);
  }
  quayLaiVaTaiLai(){
    this.quayLaiVaTaiLaiChange.emit(true);
  }
  nhapLai() {
    this.ngOnInit();
  }
  moLai() {
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn mở lại đăng ký khám này?",
        yesColor:"warn"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.apiService.post("TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham/MoKhamLaiLichSuDangKyKhamChiTiet",{Id:this.lichSuDangKyKhamVo.Id}).subscribe((result)=>{
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
  //#endregion actions

}
