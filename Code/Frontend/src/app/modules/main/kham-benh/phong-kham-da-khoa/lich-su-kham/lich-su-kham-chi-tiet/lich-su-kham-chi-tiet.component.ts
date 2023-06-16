import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
declare let $: any;

@Component({
  selector: 'app-lich-su-kham-chi-tiet',
  templateUrl: './lich-su-kham-chi-tiet.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet.component.scss']
})
export class LichSuKhamChiTietComponent implements OnInit {

  tabActiveIndex:number=0;
  validationErrors:any;
  isUpdate: boolean = false;
  lichSuKhamVo:any={};
  @Input() data:any;
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.formatFormContent(); 
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.lichSuKhamVo={};
      }
      else {
        this.isUpdate = true;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
      this.lichSuKhamVo={ "Id": 1,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" };
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
  khamLai(){
    this.dialog.open(ConfirmComponent, {
      disableClose: false,
      width: '400px',
      data: { message:"Bạn chắc chắn muốn mở lại yêu cầu khám bệnh này?" ,yesColor:"warn"  }
  }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
      if (result) {
         
      }
  });
  }


}
