import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ChangeDetectorRef,ViewChild,TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from 'src/app/core/services/base.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn } from 'src/app/shared/components/table/table.model';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { LoaiDichVu } from 'src/app/shared/enum/loai-dich-vu.enum';
import { SecurityOperation } from 'src/app/shared/enum/security-operation.enum\'';
import { NhomDichVuThuongDungService } from '../nhom-dich-vu-thuong-dung.service';


@Component({
  selector: 'app-nhom-dich-vu-thuong-dung-chi-tiet',
  templateUrl: './nhom-dich-vu-thuong-dung-chi-tiet.component.html',
  styleUrls: ['./nhom-dich-vu-thuong-dung-chi-tiet.component.scss']
})
export class NhomDichVuThuongDungChiTietComponent implements OnInit {

  id:number = null;
  nhomDichVuThuongDungVo: any = {};
  dichVuThem: any = {};
  loaiDV :number =1;
  columnsNhomDichVuThuongDung: TableColumn<any>[] = [];

  dataDichVuThems:any = {
    Data: [],
    TotalRowCount: 0
  };

  validationErrors: any = null;
  @ViewChild("tableDichVu", { static: true }) table:TableComponent;
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  @ViewChild('editTenDVTemplate', { static: true }) editTenDVTemplate: TemplateRef<any>;
  @ViewChild('SoLanTemplate', { static: true }) SoLanTemplate: TemplateRef<any>;
  @ViewChild('editGhiChuTemplate', { static: true }) editGhiChuTemplate: TemplateRef<any>;

  documentType: DocumentType = DocumentType.QuanTriNhomPhongKhamNhomDichVuThuongDung;
  @Input() showOnPopup: boolean = false;
  @Input() isUpdate: boolean = false;
  @Input() data: any = null;
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private baseService: BaseService, private snackBar: MatSnackBar, private errorService: ErrorService,
    private nhomDichVuThuongDungService: NhomDichVuThuongDungService, private authService: AuthService,
    private cdRef: ChangeDetectorRef) {
    this.baseService.controllerName = this.nhomDichVuThuongDungService.controllerName;
  }

  ngOnInit() {
    this.columnsNhomDichVuThuongDung = [
      { label: 'Mã', property: 'Ma', type: 'text', width: 70, visible: true, isLink: true, sortable: true},
      { label: 'Tên dịch vụ', property: 'TenDV', type: 'text', minWidth: 200, visible: true ,template: this.editTenDVTemplate},
      { label: 'Số lượng', property: 'SoLan', type: 'text', width: 100, visible: true ,template: this.SoLanTemplate},
      { label: 'Đơn giá', property: 'DonGia', type: 'text', width: 100, visible: true ,},
      { label: 'Thành tiền', property: 'ThanhTien', type: 'text', width: 100, visible: true ,},
      { label: 'Ghi chú', property: 'GhiChu', type: 'text', width: 100, visible: true ,template: this.editGhiChuTemplate},
      { label: '', property: 'action', type: 'button', visible: true, width: 50,template: this.actionTemplate}
    ];

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.nhomDichVuThuongDungVo = {};
        this.dichVuThem = {};
      }
      else {
        this.isUpdate = true;
        this.id= changes.data.currentValue.Id;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
      this.baseService.getById(id).subscribe((result) => {
        this.nhomDichVuThuongDungVo = result;
        let dada = [];
        if(this.nhomDichVuThuongDungVo.GoiDichVuChiTietDichVuKhamBenhs.length > 0){
          
          this.nhomDichVuThuongDungVo.GoiDichVuChiTietDichVuKhamBenhs.forEach(element => {
            dada.push(element);
          });
        }
        if(this.nhomDichVuThuongDungVo.GoiDichVuChiTietDichVuKyThuats.length > 0){
          this.nhomDichVuThuongDungVo.GoiDichVuChiTietDichVuKyThuats.forEach(element => {
            dada.push(element);
          });
        }
        this.dataDichVuThems={
          Data:dada,
          TotalRowCount: dada.length
        }
        this.table.setDataSource({Data:[...this.dataDichVuThems.Data],TotalRowCount:this.dataDichVuThems.Data.length});
      });
    }
  }

  quayLai() {
    this.quayLaiChange.emit(true);
  }

  popupLoadingData: any = null;
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
  nhapLai() {
    if(this.isUpdate){
      this.getById(this.id);
     }
     if(!this.isUpdate){
      this.nhomDichVuThuongDungVo = {};
     }
   }
  capNhat() {

    this.validationErrors = [];
    this.cdRef.detectChanges();

    if (this.authService.hasPermission(this.documentType, SecurityOperation.Update)) {
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn cập nhật nhóm dịch vụ thường dùng này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.nhomDichVuThuongDungVo.GoiDichVuChiTietDichVuKhamBenhs = this.dataDichVuThems.Data.filter(d=>d.LoaiDichVu == LoaiDichVu.DichVuKham);
          this.nhomDichVuThuongDungVo.GoiDichVuChiTietDichVuKyThuats = this.dataDichVuThems.Data.filter(d=>d.LoaiDichVu == LoaiDichVu.DichVuKyThuat);
          this.baseService.update(this.nhomDichVuThuongDungVo).subscribe(() => {
            this.dataChange.emit(this.nhomDichVuThuongDungVo);
            CommonService.openSnackBar(this.snackBar, CommonService.format(SystemMessage.ActionSuccessfully, ["Cập nhật"]));
            this.closePopupLoadingData();
          }, (err: any) => {

            this.validationErrors = err.ValidationErrors;
            if (err.Message != "Validation Failed") {
              CommonService.openSnackBar(this.snackBar, err.Message, "error");
            }
            else {
              const mess = this.errorService.getValidationErrors(err);
              if (mess != null) {
                CommonService.openSnackBar(this.snackBar, mess, "error", null, 7000);
              }
            }
            this.closePopupLoadingData();
          });
        }
      });
    }
    else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }

  }
  luu() {
    this.validationErrors = [];
    this.cdRef.detectChanges();

    if (this.authService.hasPermission(this.documentType, SecurityOperation.Add)) {
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn lưu nhóm dịch vụ thường dùng này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.nhomDichVuThuongDungVo.GoiDichVuChiTietDichVuKhamBenhs = this.dataDichVuThems.Data.filter(d=>d.LoaiDichVu == LoaiDichVu.DichVuKham);
          this.nhomDichVuThuongDungVo.GoiDichVuChiTietDichVuKyThuats = this.dataDichVuThems.Data.filter(d=>d.LoaiDichVu == LoaiDichVu.DichVuKyThuat);

          this.baseService.create(this.nhomDichVuThuongDungVo).subscribe((result) => {
            this.nhomDichVuThuongDungVo = {};
            this.dataChange.emit(result);
            CommonService.openSnackBar(this.snackBar, CommonService.format(SystemMessage.ActionSuccessfully, ["Lưu"]));
            this.closePopupLoadingData();
          }, (err: any) => {

            this.validationErrors = err.ValidationErrors;
            if (err.Message != "Validation Failed") {
              CommonService.openSnackBar(this.snackBar, err.Message, "error");
            }
            else {
              const mess = this.errorService.getValidationErrors(err);
              if (mess != null) {
                CommonService.openSnackBar(this.snackBar, mess, "error", null, 7000);
              }
            }
            this.closePopupLoadingData();
          });
        }
      });
    }
    else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }



  }
  changeLoaiDichVu(event:any,loaiDichVu:any){
    if(loaiDichVu == LoaiDichVu.DichVuKham && event != null){
      this.dichVuThem.DonGia = event.Gia;
      this.dichVuThem.DichVuKhamBenhId = event.KeyId;
      this.dichVuThem.TenDV = event.DisplayName;
      // defeffault 1
      this.dichVuThem.SoLan = 1;
      if(this.dichVuThem.DonGia !=null)
      {
        this.dichVuThem.ThanhTien = this.dichVuThem.DonGia*1; 
      }
      if(event.DichVuKhamGiaId != undefined && event.DichVuKhamGiaId != null){
        this.dichVuThem.DichVuKhamGiaId = event.DichVuKhamGiaId;
      }
      
    }
    else if(loaiDichVu == LoaiDichVu.DichVuKyThuat && event != null){
      this.dichVuThem.DonGia = event.Gia;
      this.dichVuThem.DichvuKyThuatId = event.KeyId;
      this.dichVuThem.TenDV = event.DisplayName;

      if(event.DichVuKyThuatGiaId != undefined && event.DichVuKyThuatGiaId != null){
        this.dichVuThem.DichVuKyThuatGiaId = event.DichVuKyThuatGiaId;
      }
      
    }
    else{
      this.dichVuThem.DonGia = null;
      if(loaiDichVu == LoaiDichVu.DichVuKham){
        this.dichVuThem.DichVuKhamBenhId = null;
        this.dichVuThem.DichVuKhamGiaId = null;
      }
      if(loaiDichVu == LoaiDichVu.DichVuKyThuat){
        this.dichVuThem.DichvuKyThuatId= null;
        this.dichVuThem.DichVuKyThuatGiaId = null;
      }
      this.dichVuThem.TenDV = null;
      
    }
  }
  changeSoLanDichVuKyThuat(event:any){
     if(event != null ){
      this.dichVuThem.SoLan = event;
      this.dichVuThem.ThanhTien = this.dichVuThem.DonGia * this.dichVuThem.SoLan; 
     }
     else if(event != 0){
      this.dichVuThem.SoLan = event;
      this.dichVuThem.ThanhTien = 0;
     }
     else{
      this.dichVuThem.SoLan = null;
      this.dichVuThem.ThanhTien = null;
     }
  }

  them(){
    this.validationErrors = [];
    this.cdRef.detectChanges();
    this.validationErrors = this.validation();
    if (this.validationErrors && this.validationErrors.some(x => x)) {
      return;
    }
    if(this.loaiDV != null)
    {
      this.dichVuThem.LoaiDichVu =this.loaiDV;
    }
    
   this.dataDichVuThems.Data.push(this.dichVuThem);

   this.dichVuThem = {};
   this.table.setDataSource({Data:[...this.dataDichVuThems.Data],TotalRowCount:this.dataDichVuThems.Data.length});

  }
  huy(){
    
  }
  validation() {
    const validationResult = [];
    if (this.dichVuThem.DichVuKhamBenhId == null && this.loaiDV == LoaiDichVu.DichVuKham) {
      const validationItem = {
        Field: 'DichVuKhamBenhId',
        Message: "Dịch vụ khám yêu cầu nhập"
      };
      validationResult.push(validationItem);
    }

    if (this.dichVuThem.DichvuKyThuatId == null && this.loaiDV == LoaiDichVu.DichVuKyThuat) {
      const validationItem = {
        Field: 'DichvuKyThuatId',
        Message: "Dịch vụ kỹ thuật yêu cầu nhập"
      };
      validationResult.push(validationItem);
    }

    if (this.dichVuThem.SoLan == null  ) {
      const validationItem = {
        Field: 'SoLan',
        Message: "Số lượng yêu cầu nhập"
      };
      validationResult.push(validationItem);
    }

    if (this.dichVuThem.DonGia == null) {
      const validationItem = {
        Field: 'DonGia',
        Message: "Đơn giá yêu cầu nhập"
      };
      validationResult.push(validationItem);
    }

    return validationResult;
  }
  changeTypeLoaiDichVu(event:any){
    if (event != null) {
      this.dichVuThem.LoaiDichVu = event;
    }
    else {
      this.dichVuThem.LoaiDichVu = null;
    }
  }
  changeLoaiDichVuEdit(event:any,loaiDichVu:any,dataItem:any){
    if(loaiDichVu == LoaiDichVu.DichVuKham && event != null){
      dataItem.DonGia = event.Gia;
      dataItem.DichVuKhamBenhId = event.KeyId;
      dataItem.TenDV = event.DisplayName;
      // defeffault 1
      dataItem.SoLan = 1;
      if(dataItem.DonGia !=null)
      {
        dataItem.ThanhTien = dataItem.DonGia*1; 
      }
    }
    else if(loaiDichVu == LoaiDichVu.DichVuKyThuat && event != null){
      dataItem.DonGia = event.Gia;
      dataItem.DichvuKyThuatId = event.KeyId;
      dataItem.TenDV = event.DisplayName;
    }
    else{
      dataItem.DonGia = null;
      if(loaiDichVu == LoaiDichVu.DichVuKham){
        dataItem.DichVuKhamBenhId = null;
      }
      if(loaiDichVu == LoaiDichVu.DichVuKyThuat){
        dataItem.DichvuKyThuatId= null;
      }
      dataItem.TenDV = event.DisplayName;
    }
  }
  edit(dataItem:any)
  {
    dataItem.IsEdit = !dataItem.IsEdit;
  }
  xoa(item:any){
    const index: number = this.dataDichVuThems.Data.indexOf(item);
    if (index !== -1) {
      this.dataDichVuThems.Data.splice(index, 1);
      this.table.setDataSource(this.dataDichVuThems);
    }
  }
}
