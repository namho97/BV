import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
@Component({
  selector: 'app-lich-hen-shared',
  templateUrl: './lich-hen-shared.component.html',
  styleUrls: ['./lich-hen-shared.component.scss']
})
export class LichHenSharedComponent implements OnInit {

  popupLoadingData: any;
  documentType: DocumentType;
  isUpdate: boolean = false;
  lichHenVo:any={};
  validationErrors: any[] = [];
  isThemMoiNguoiBenh:boolean=false;
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.documentType = DocumentType.TiepNhanNguoiBenhPhongKhamDaKhoaLichHen;
    this.getDanhSachNamSinh();
    this.getDanhSachThangSinh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.lichHenVo={NguoiTiepNhan:"Nguyễn Văn A",NgayTiepNhan:new Date()};
      }
      else {
        this.isUpdate = true;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
      this.lichHenVo={MaNguoiBenh:"22052611",GioiTinh:1,NguoiTiepNhan:"Nguyễn Văn A",NgayTiepNhan:new Date()};
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
  
  //#region combobox ngày sinh
  danhSachNamSinhs: any = [];
  danhSachNgaySinhs: any = [];
  danhSachThangSinhs: any = [];
  getDanhSachNgaySinh(month: number, year: number) {
    this.danhSachNgaySinhs = [];
    for (var i = 1; i <= CommonService.getDaysInMonth(month - 1, year).length; i++) {
      this.danhSachNgaySinhs.push({ KeyId: i, DisplayName: i });
    }
  }

  getDanhSachThangSinh() {
    this.danhSachThangSinhs = [];
    for (var i = 1; i <= 12; i++) {
      this.danhSachThangSinhs.push({ KeyId: i, DisplayName: i });
    }
  }

  getDanhSachNamSinh() {
    this.danhSachNamSinhs = [];
    var now = new Date();
    for (var i = now.getFullYear(); i >= 1900; i--) {
      this.danhSachNamSinhs.push({ KeyId: i, DisplayName: i });
    }
  }

  modelThangSinhChange() {
    this.getDanhSachNgaySinh(this.lichHenVo.ThangSinh, this.lichHenVo.NamSinh);
  }
  //#endregion combobox ngày sinh
  
  //#region actions
  chonMaNguoiBenh(event:any){
    this.lichHenVo.MaNguoiBenh=event!=null?event.MaNguoiBenh:null;
    this.lichHenVo.HoTen=event!=null?event.HoTen:null;
    this.lichHenVo.NamSinh=event!=null?event.NamSinh:null;
    this.lichHenVo.SoDienThoai=event!=null?event.SoDienThoai:null;
    this.lichHenVo.GioiTinh=event!=null?(event.GioiTinh=="Nam"?1:2):null;
    //this.lichHenVo.DiaChi=event.DiaChi;

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

      }
    });
  }
  //#endregion actions
}
