import { ToaMauComponent } from './../toa-mau/toa-mau.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
declare let $: any;

@Component({
  selector: 'app-nguoi-benh-dang-kham-ke-toa',
  templateUrl: './nguoi-benh-dang-kham-ke-toa.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-ke-toa.component.scss']
})
export class NguoiBenhDangKhamKeToaComponent implements OnInit {

  documentType:DocumentType;
  dataChonKeToa:any;
  validationErrors:any;
  keToaVo: any={LoaiBhyt:2,ChiTietSoLuong:false};
  columnsKeToa: TableColumn<any>[] = [];
  dataSourceKeToa: any;
  groupByColumnsKeToa: string[] = [];
  sortByColumnKeToa: SortDescriptor = { field: 'SoThuTu', dir: 'asc' };
  @ViewChild('tenTemplate', { static: true }) tenTemplate: TemplateRef<any>;
  @ViewChild('actionKeToaTemplate', { static: true }) actionKeToaTemplate: TemplateRef<any>;
  @ViewChild('thuocBHYTTemplate', { static: true }) thuocBHYTTemplate: TemplateRef<any>;
  @Input() data:any;
  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.documentType=DocumentType.KhamBenhPhongKhamDaKhoaBacSiKham;
    this.getColumnsKeToa();
    this.getDataForGridKeToa();
  }
  ngAfterViewInit() { 
    var self=this;
    setTimeout(function(){
      self.formatFormContent();
    })
  }
  formatFormContent() {
    if ($(".form-content-ke-toa") != null && $(".form-content-ke-toa").length > 0) {
      $(".form-content-ke-toa").css({ "height":$(window).width()>575? $(window).height() - 441: 350 });
    }
  }
  chiTietSoLuongChange(event:any){
    if(event)
    {
      if($(window).width()<=575)
      {
        $(".form-content-ke-toa").css({ "height": 685 });
      }      
    }
    else{
      if($(window).width()<=575)
      {
        $(".form-content-ke-toa").css({ "height": 350 });
      }      
    }
  }
  getColumnsKeToa() {
    this.columnsKeToa = [
      { label: '', property: 'actions', type: 'button', visible: true, width: 80, useActionDefault: true, hideFilter: true,sticky:true, template: this.actionKeToaTemplate },
      { label: 'TÊN', property: 'Ten', type: 'text', minWidth: 150, visible: true, disableFilter: false,sticky:true,template:this.tenTemplate },
      { label: 'HOẠT CHẤT', property: 'HoatChat', type: 'text', width: 100, visible: true, disableFilter: false },
      { label: 'HÀM LƯỢNG', property: 'HamLuong', type: 'text', width: 80, visible: true, disableFilter: false },
      { label: 'ĐVT', property: 'DonViTinh', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'ĐD', property: 'DuongDung', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true, disableFilter: false },
      { label: 'SÁNG', property: 'SoLuongSang', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'TRƯA', property: 'SoLuongTrua', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'CHIỀU', property: 'SoLuongChieu', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'TỐI', property: 'SoLuongToi', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'BHYT', property: 'ThuocBHYT', type: 'text', width: 50, visible: true, disableFilter: false ,template:this.thuocBHYTTemplate},
      { label: 'CÁCH DÙNG', property: 'CachDung', type: 'text', width: 100, visible: true, disableFilter: false }
      
    ];
  }
  getDataForGridKeToa() {
    this.dataSourceKeToa = {
      Data: [
        { "Id": 1,"SoThuTu":1, "Ten":"Acemuc kid", "HoatChat":"Acetylcystein", "HamLuong":"200mg", "DonViTinh":"Gói", "DuongDung":"Uống", "SoLuong":"21", "CachDung":"", "SoLuongSang":"1", "SoLuongTrua":"1", "SoLuongChieu":"1", "SoLuongToi":"","ThuocBHYT":true},
        { "Id": 2,"SoThuTu":2, "Ten":"Acemuc ABC", "HoatChat":"Acetylcystein", "HamLuong":"200mg", "DonViTinh":"Gói", "DuongDung":"Uống", "SoLuong":"21", "CachDung":"", "SoLuongSang":"1", "SoLuongTrua":"1", "SoLuongChieu":"1", "SoLuongToi":"","ThuocBHYT":false},
        { "Id": 3,"SoThuTu":3, "Ten":"Hemostat CPA", "HoatChat":"", "HamLuong":"200mg", "DonViTinh":"Gói", "DuongDung":"Uống", "SoLuong":"21", "CachDung":"", "SoLuongSang":"1", "SoLuongTrua":"1", "SoLuongChieu":"1", "SoLuongToi":"","ThuocBHYT":true}
      ],
      TotalRowCount: 49
    }
  }
  viewKeToa(dataItem: any) {
    this.dataChonKeToa = dataItem;

  }
  chonTuToaMau(){
    this.dialog.open(ToaMauComponent, {
      disableClose: false,
      width: '1100px',
      data: {  }
    }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
        if (result) {
         
        }
    });
  }
  getContentInToaThuoc(){
    return "<h1>ĐƠN THUỐC</h1>";
  }
  
  chonDuocPham(event:any){
    this.keToaVo.DuocPhamId=event!=null?event.Id:null;
    this.keToaVo.Ten=event!=null?event.Ten:null;
    console.log(event);

  }
}
