import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-lich-su-kham-chi-tiet-thong-tin-hanh-chinh',
  templateUrl: './lich-su-kham-chi-tiet-thong-tin-hanh-chinh.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet-thong-tin-hanh-chinh.component.scss']
})
export class LichSuKhamChiTietThongTinHanhChinhComponent implements OnInit {

  thongTinHanhChinhVo:any={};
  @Input() data:any;
  @Input() thongTinHanhChinh:any;
  constructor(private dialog: MatDialog,private apiService:ApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.   
    if (changes.thongTinHanhChinh != undefined && changes.thongTinHanhChinh.currentValue != null) {
      if(this.thongTinHanhChinh!=null)
      {
        this.thongTinHanhChinhVo=changes.thongTinHanhChinh.currentValue;
      } 
    }
  }
  getLichSuKhamChiTietThongTinHanhChinh(id:number){
    if(id!=null && id>0)
    {
      this.showPopupLoadingData();
      this.apiService.get("KhamBenhBacSiGiaDinhLichSuBacSiKham/GetLichSuKhamChiTietThongTinHanhChinh/"+id).subscribe((result)=>{
        this.thongTinHanhChinhVo=result;
        console.log(this.thongTinHanhChinh);
        this.closePopupLoadingData();
      },(err:any) => {
        this.closePopupLoadingData();
        console.log(err);
      });
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
}
