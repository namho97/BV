import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges,ChangeDetectorRef,ViewChild,TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from 'src/app/core/services/base.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { SortDescriptor, TableColumn } from 'src/app/shared/components/table/table.model';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { SecurityOperation } from 'src/app/shared/enum/security-operation.enum\'';
import { ToaThuocMauService } from '../toa-thuoc-mau.service';
declare let $: any;

@Component({
  selector: 'app-toa-thuoc-mau-chi-tiet',
  templateUrl: './toa-thuoc-mau-chi-tiet.component.html',
  styleUrls: ['./toa-thuoc-mau-chi-tiet.component.scss']
})
export class ToaThuocMauChiTietComponent implements OnInit {

  id:number = null;
  toaThuocMauVo:any={};
  toaThuocMauChiTietVo:any={};
  validationErrors:any=null;
  documentType: DocumentType = DocumentType.QuanTriNhomPhongKhamToaThuocMau;
  columnsKeToa: TableColumn<any>[] = [];
  dataSourceKeToa:any={Data:[],TotalRowCount:0};
  groupByColumnsKeToa: string[] = [];
  sortByColumnKeToa: SortDescriptor = { field: 'SoThuTu', dir: 'asc' };

  @ViewChild('tableKeToa',{static:false}) tableKeToa:TableComponent;
  @ViewChild('tenTemplate', { static: true }) tenTemplate: TemplateRef<any>;
  @ViewChild('hoatChatTemplate', { static: true }) hoatChatTemplate: TemplateRef<any>;
  @ViewChild('hamLuongTemplate', { static: true }) hamLuongTemplate: TemplateRef<any>;
  @ViewChild('donViTinhTemplate', { static: true }) donViTinhTemplate: TemplateRef<any>;
  @ViewChild('duongDungTemplate', { static: true }) duongDungTemplate: TemplateRef<any>;
  @ViewChild('soLuongTemplate', { static: true }) soLuongTemplate: TemplateRef<any>;
  @ViewChild('sangTemplate', { static: true }) sangTemplate: TemplateRef<any>;
  @ViewChild('truaTemplate', { static: true }) truaTemplate: TemplateRef<any>;
  @ViewChild('chieuTemplate', { static: true }) chieuTemplate: TemplateRef<any>;
  @ViewChild('toiTemplate', { static: true }) toiTemplate: TemplateRef<any>;
  @ViewChild('soNgayDungTemplate', { static: true }) soNgayDungTemplate: TemplateRef<any>;
  @ViewChild('cachDungTemplate', { static: true }) cachDungTemplate: TemplateRef<any>;
  @ViewChild('actionKeToaTemplate', { static: true }) actionKeToaTemplate: TemplateRef<any>;
  @ViewChild('thuocBHYTTemplate', { static: true }) thuocBHYTTemplate: TemplateRef<any>;

  @Input() showOnPopup:boolean=false;
  @Input() isUpdate:boolean=false;
  @Input() data:any=null;
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog:MatDialog,
    private baseService:BaseService,
    private snackBar:MatSnackBar,
    private errorService:ErrorService,
    private toaThuocMauService:ToaThuocMauService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef) {
    this.baseService.controllerName=this.toaThuocMauService.controllerName;
  }

  ngOnInit() {
    this.getColumnsKeToa();
  }
  getColumnsKeToa() {
    this.columnsKeToa = [
      { label: 'TÊN (*)', property: 'Ten', type: 'text', width: 300, visible: true, disableFilter: false,template:this.tenTemplate },
      { label: 'HOẠT CHẤT', property: 'HoatChat', type: 'text', width: 100, visible: true, disableFilter: false,template:this.hoatChatTemplate },
      { label: 'HÀM LƯỢNG', property: 'HamLuong', type: 'text', width: 80, visible: true, disableFilter: false,template:this.hamLuongTemplate },
      { label: 'ĐVT', property: 'DonViTinh', type: 'text', width: 80, visible: true, disableFilter: false,template:this.donViTinhTemplate},
      { label: 'ĐD', property: 'DuongDung', type: 'text', width: 80, visible: true, disableFilter: false,template:this.duongDungTemplate },
      { label: 'SÁNG', property: 'SoLuongSang', type: 'text', width: 80, visible: true, disableFilter: false,template:this.sangTemplate },
      { label: 'TRƯA', property: 'SoLuongTrua', type: 'text', width: 80, visible: true, disableFilter: false,template:this.truaTemplate },
      { label: 'CHIỀU', property: 'SoLuongChieu', type: 'text', width: 80, visible: true, disableFilter: false ,template:this.chieuTemplate},
      { label: 'TỐI', property: 'SoLuongToi', type: 'text', width: 80, visible: true, disableFilter: false,template:this.toiTemplate },
      { label: 'SỐ NGÀY (*)', property: 'SoNgayDung', type: 'text', width: 80, visible: true, disableFilter: false,template:this.soNgayDungTemplate },
      { label: 'SL (*)', property: 'SoLuong', type: 'text', width: 80, visible: true, disableFilter: false,template:this.soLuongTemplate },
      { label: 'CÁCH DÙNG', property: 'CachDung', type: 'text', minWidth: 150, visible: true, disableFilter: false ,template:this.cachDungTemplate},
      { label: '', property: 'actions', type: 'button', visible: true, width: 20, useActionDefault: true, hideFilter: true, template: this.actionKeToaTemplate }

    ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.toaThuocMauVo = {};
        this.toaThuocMauChiTietVo={toaThuocMauGias:[{Id:0}]};
        let arrDefault = [{Id:0}];
        this.dataSourceKeToa={Data:[...arrDefault],TotalRowCount:[...arrDefault].length};
      }
      else {
        this.isUpdate = true;
        this.id =changes.data.currentValue.Id;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
      this.baseService.getById(id).subscribe((result)=>{
        this.toaThuocMauVo=result;
        let data :any = result;
        if(data.ToaThuocMauChiTiets != null && data.ToaThuocMauChiTiets.length > 0)
        {
          data.ToaThuocMauChiTiets.push({Id:0});
          this.dataSourceKeToa ={
            Data:[...data.ToaThuocMauChiTiets],
            TotalRowCount:[...data.ToaThuocMauChiTiets].length
          };
          this.tableKeToa.setDataSource(this.dataSourceKeToa);
        }
      });
    }
  }
  quayLai(){
    this.quayLaiChange.emit(true);
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
  nhapLai(){
    if(this.isUpdate){
      this.getById(this.id);
    }
    if(!this.isUpdate){
      this.toaThuocMauVo = {};
      this.dataSourceKeToa = {
        Data:[],
        TotalRowCount :0
      };
      this.tableKeToa.setDataSource(this.dataSourceKeToa);
    }
  }
  capNhat(){
    this.validationErrors = [];
    this.cdRef.detectChanges();

    if (this.authService.hasPermission(this.documentType, SecurityOperation.Update)) {
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn cập nhật toa thuốc mẫu này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.toaThuocMauVo.ToaThuocMauChiTiets = this.dataSourceKeToa.Data.filter(d=>d.DuocPhamId != null && d.DuocPhamId != 0);
          this.baseService.update(this.toaThuocMauVo).subscribe(()=>{
            this.dataChange.emit(this.toaThuocMauVo);
            CommonService.openSnackBar(this.snackBar,CommonService.format(SystemMessage.ActionSuccessfully, ["Cập nhật"]));
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
    else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }




   
  }
  luu(){
    this.validationErrors = [];
    this.cdRef.detectChanges();

    if (this.authService.hasPermission(this.documentType, SecurityOperation.Add)) {
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn lưu toa thuốc mẫu này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          
          this.toaThuocMauVo.ToaThuocMauChiTiets =this.dataSourceKeToa.Data.filter(d=>d.DuocPhamId != null && d.DuocPhamId != 0);

          this.baseService.create(this.toaThuocMauVo).subscribe((result)=>{
            this.toaThuocMauVo=result;
            CommonService.openSnackBar(this.snackBar,CommonService.format(SystemMessage.ActionSuccessfully, ["Lưu"]));
            this.dataChange.emit(result);
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
    else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }
  }
  icdChange(event:any){
    if(event != null){
      this.toaThuocMauVo.IcdId = event.KeyId;
      this.toaThuocMauVo.IcdDisplay = event.DisplayName;
    }
    else{
      this.toaThuocMauVo.IcdId = null;
      this.toaThuocMauVo.IcdDisplay = null;
    }
  }
  themHoacSuaICDLuuChange(event: any) {
    this.toaThuocMauVo.IcdId = event.Id;
    this.toaThuocMauVo.IcdDisplay = event.Ten;
    this.dialog.closeAll();
  }

  bacSiChange(event:any){
    if(event != null){
      this.toaThuocMauVo.BacSiId = event.KeyId;
      this.toaThuocMauVo.BacSiDisplay = event.DisplayName;
    }
    else{
      this.toaThuocMauVo.BacSiId = null;
      this.toaThuocMauVo.BacSiDisplay = null;
    }
  }
  themHoacSuaBacSiLuuChange(event: any) {
    this.toaThuocMauVo.BacSiId = event.Id;
    this.toaThuocMauVo.BacSiDisplay = event.Ten;
    this.dialog.closeAll();
  }

  themToaThuocMau(event:any){
    if(event == undefined)
    {
      let gias :any ={
        Gia:0,
        TuNgay:null,
        DenNgay:null
      };
      event =[];
      event.push(gias);
    }
    else{
      let gias :any ={
        Gia:0,
        TuNgay:null,
        DenNgay:null
      };
      event.push(gias);
    }
    
  }
 
  hieuLucChange(event:any){
    if(event != null){
      if(event == 1){
        this.toaThuocMauVo.HieuLuc = true;
      }
      if(event == 2)
      {
        this.toaThuocMauVo.HieuLuc = false;
      }
    }
    else{
      this.toaThuocMauVo.HieuLuc = null;
    }
    
  }
  duocPhamChange(event:any,item:any)
  {
    if(event==null || event==0)
    {

    }
    else{
      var check= this.dataSourceKeToa.Data.filter(o=>o.DuocPhamId==event.KeyId && ((item.Id!=null && o.Id!=item.Id)  || (item.IdTemp!=null && o.IdTemp!=item.IdTemp)));
      if(check!=null && check.length>0)
      {        
        CommonService.openSnackBar(this.snackBar, "Thuốc '"+event.DisplayName+"' đã được kê trong toa này.", "error");
        item.DuocPhamId=null;
        item.Ten=null;
        item.HoatChat=null;
        item.HamLuong=null;
        item.DonViTinh=null;
        item.DuongDung=null;
        item.SoLuongSang=null;
        item.SoLuongTrua=null;
        item.SoLuongChieu=null;
        item.SoLuongToi=null;
        item.SoLuong=null;
        item.SoNgayDung=null;
        item.CachDung=null;
        
        var countThuocChuaCo= this.dataSourceKeToa.Data.filter(o=>o.DuocPhamId==null ||o.DuocPhamId==0);
        if(countThuocChuaCo!=null && countThuocChuaCo.length>1)
        {
      
          //XÓa bớt thuốc trống sau cùng
          const index: number = this.dataSourceKeToa.Data.length-1;
          if (index !== -1) {
            this.dataSourceKeToa.Data.splice(index, 1);
            this.tableKeToa.setDataSource(this.dataSourceKeToa);
          }
        }
      }
      else{
        item.DuocPhamTen=event.DisplayName;
        item.HoatChat=event.HoatChat;
        item.HamLuong=event.HamLuong;
        item.DonViTinh=event.DonViTinh;
        item.DuongDung=event.DuongDung;
        if(this.dataSourceKeToa.Data.filter(o=>o.DuocPhamId==null)<=0)
        {
          this.dataSourceKeToa.Data.push({Id:0,IdTemp:CommonService.makeRandom(6),SoNgayDung:(this.toaThuocMauChiTietVo.SoNgayDungThuocMacDinh??1)});
          this.tableKeToa.setDataSource(this.dataSourceKeToa);
        }
        setTimeout(function(){
          $("#SoLuongSang"+(item.Id!=null && item.Id>0?item.Id:item.IdTemp)).focus();
        });
      }
    }
  }
  xoaThuoc(item:any){
    const index: number = this.dataSourceKeToa.Data.indexOf(item);
    if (index !== -1) {
      this.dataSourceKeToa.Data.splice(index, 1);
      this.tableKeToa.setDataSource(this.dataSourceKeToa);
    }
  }
  themHoacSuaDuocPhamLuuChange(event:any,dataItem:any){
    dataItem.DuocPhamId=event.Id;
    dataItem.DuocPhamTen=event.Ten;
    this.dialog.closeAll();
  }
}
