import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-nguoi-benh-dang-kham',
  templateUrl: './nguoi-benh-dang-kham.component.html',
  styleUrls: ['./nguoi-benh-dang-kham.component.scss']
})
export class NguoiBenhDangKhamComponent implements OnInit {

  tabActiveIndex:number=0;
  validationErrors:any;
  @Input() data:any;
  @Output() extQuayLai= new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.formatFormContent(); 
    
  }
  formatFormContent() {
    if ($(".form-content") != null && $(".form-content").length > 0) {
      $(".form-content").css({ "height": $(window).height() - 215 });
    }
  }
  getNguoiBenhDangKham(){
    this.data={ "Id": 1,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" };
  }
  selectedIndexChange(event:number){
    this.tabActiveIndex=event;
  }
  quayLai(){
    this.extQuayLai.emit(true);
  }
  quayLaiChuKham(){    
    this.extQuayLai.emit(true);
  }
  luu(){}
  luuVaHoanThanh(){}
  nhapLai(){}

}
