import {  Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-nguoi-benh-dang-kham-thong-tin-hanh-chinh',
  templateUrl: './nguoi-benh-dang-kham-thong-tin-hanh-chinh.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-thong-tin-hanh-chinh.component.scss']
})
export class NguoiBenhDangKhamThongTinHanhChinhComponent implements OnInit {

  thongTinHanhChinhVo:any={};
  totalResultSearch:number=null;
  searchTimeout:any=null;
  validationErrors:any=null;
  @Input() data:any;
  @Input() taoDangKyMoi:any;
  @Input() thongTinHanhChinh:any;
  @Output() extBatDauKham = new EventEmitter<any>();

  constructor(private dialog: MatDialog,private apiService:ApiService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.taoDangKyMoi && changes.taoDangKyMoi.currentValue) {
      if (changes.taoDangKyMoi.currentValue==true) {
        this.thongTinHanhChinhVo={GioiTinh:1}
      }
    }
    if (changes.data != undefined && changes.data.currentValue != null) {
      if(this.thongTinHanhChinh!=null)
      {
        this.thongTinHanhChinhVo=this.thongTinHanhChinh;
      }
      else{
        this.getNguoiBenhDangKhamThongTinHanhChinh();
      }
    }
  }
  getNguoiBenhDangKhamThongTinHanhChinh(){
    if(this.data!=null && this.data>0)
    {
      this.showPopupLoadingData();
      this.apiService.get("KhamBenhBacSiGiaDinhBacSiKham/GetNguoiBenhDangKhamThongTinHanhChinh/"+this.data).subscribe((result)=>{
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

  batDauKham(event:any){
    this.taoDangKyMoi=false;
    this.extBatDauKham.emit(event.Id);
  }
  huy(){
    this.taoDangKyMoi=false;
    this.extBatDauKham.emit(null);
  }
  capNhatThongTinHanhChinh(){

  }
}
