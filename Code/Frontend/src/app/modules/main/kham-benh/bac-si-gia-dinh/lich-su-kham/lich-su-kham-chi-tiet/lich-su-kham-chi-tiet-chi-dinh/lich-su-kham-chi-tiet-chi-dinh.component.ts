import { ImageViewerComponent } from './../../../../../../../shared/components/image-viewer/image-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { ApiService } from 'src/app/core/services/api.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { CommonService } from 'src/app/core/utilities/common.helper';

@Component({
  selector: 'app-lich-su-kham-chi-tiet-chi-dinh',
  templateUrl: './lich-su-kham-chi-tiet-chi-dinh.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet-chi-dinh.component.scss']
})
export class LichSuKhamChiTietChiDinhComponent implements OnInit {


  documentType:DocumentType;
  canLamSangVo: any={};
  @Input() data:any;
  constructor(private http: HttpClient,private dialog:MatDialog,private apiService:ApiService) { }

  ngOnInit() {
    this.documentType=DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham;
  }
 

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data != undefined && changes.data.currentValue.Id != null) {
      this.getLichSuKhamChiTietThongTinCanLamSang(changes.data.currentValue.Id);
    }
  }
  getLichSuKhamChiTietThongTinCanLamSang(id:number){
    this.showPopupLoadingData();
    this.apiService.get("KhamBenhBacSiGiaDinhLichSuBacSiKham/GetLichSuKhamChiTietThongTinCanLamSang/"+id).subscribe((result)=>{
      this.canLamSangVo=result;
      CommonService.downloadSetSrcForImage(this.canLamSangVo.TaiLieuKetQuaXetNghiem,this.http);
      CommonService.downloadSetSrcForImage(this.canLamSangVo.TaiLieuKetQuaXQuang,this.http);
      CommonService.downloadSetSrcForImage(this.canLamSangVo.TaiLieuKetQuaSieuAm,this.http);
      CommonService.downloadSetSrcForImage(this.canLamSangVo.TaiLieuKetQuaDienTim,this.http);
      CommonService.downloadSetSrcForImage(this.canLamSangVo.TaiLieuKetQuaThuThuatKhac,this.http);
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
  viewImage(src:any){
    console.log(src);
    this.dialog.open(ImageViewerComponent,{data:{src:src}});
  }
}

