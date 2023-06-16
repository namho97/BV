import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
declare let $: any;

@Component({
  selector: 'app-tu-dien-dich-vu-ky-thuat-chi-tiet',
  templateUrl: './tu-dien-dich-vu-ky-thuat-chi-tiet.component.html',
  styleUrls: ['./tu-dien-dich-vu-ky-thuat-chi-tiet.component.scss']
})
export class TuDienDichVuKyThuatChiTietComponent implements OnInit {

  popupLoadingData: any;
  documentType: DocumentType;
  isUpdate: boolean = false;
  tuDienVo:any={};
  validationErrors: any[] = [];
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.documentType = DocumentType.CdhaTdcnDanhMucTuDienDichVuKyThuat;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue == undefined || changes.data.currentValue == 0) {
        this.isUpdate = false;
        this.tuDienVo={};
      }
      else {
        this.isUpdate = true;
        this.getById(changes.data.currentValue);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
      this.tuDienVo={Id:1,DichVu:"Siêu âm Doppler mạch cấp cứu tại giường",MaMauKetQua:"A101",TenMauKetQua:"Siêu âm Doppler",NoiDungKetQua:"<p>- Các bản xương không có hình ảnh lún, vỡ.</p><p>- Các khớp sọ bình thường.</p>",NoiDungKetLuan:"<b>Hiện tại không thấy bất thường trên chụp XQ sọ</b>"};
    }
  }

  ngAfterContentInit(): void {
    this.formatFormContent();
  }

  formatFormContent() {
    if ($(".form-content") != null && $(".form-content").length > 0) {
      $(".form-content").css({ "height": $(window).height() - 161 });
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
  
  
  //#region actions
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
        message: "Bạn chắc chắn muốn lưu kỹ thuật này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {

      }
    });
  }
  //#endregion actions
}
