import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-lich-su-kham-chi-tiet-kham-benh',
  templateUrl: './lich-su-kham-chi-tiet-kham-benh.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet-kham-benh.component.scss']
})
export class LichSuKhamChiTietKhamBenhComponent implements OnInit {

  khamLamSangVo:any={};
  @Input() data:any;
  constructor(private dialog: MatDialog,private apiService:ApiService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data != undefined && changes.data.currentValue.Id != null) {
      this.getLichSuKhamChiTietThongTinKhamLamSang(changes.data.currentValue.Id);
    }
  }
  getLichSuKhamChiTietThongTinKhamLamSang(id:number){
    this.showPopupLoadingData();
    this.apiService.get("KhamBenhBacSiGiaDinhLichSuBacSiKham/GetLichSuKhamChiTietThongTinKhamLamSang/"+id).subscribe((result)=>{
      this.khamLamSangVo=result;
      this.closePopupLoadingData();
    },(err:any) => {
      this.closePopupLoadingData();
      console.log(err);
    });
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
