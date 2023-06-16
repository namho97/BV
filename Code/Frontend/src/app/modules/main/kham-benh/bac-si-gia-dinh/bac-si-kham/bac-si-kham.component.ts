import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { DeviceDetectorService } from 'ngx-device-detector';
declare let $: any;

@Component({
  selector: 'app-bac-si-kham',
  templateUrl: './bac-si-kham.component.html',
  styleUrls: ['./bac-si-kham.component.scss']
})
export class BacSiKhamComponent implements OnInit {

  id: number = null;
  tabActive:number=0;
  hideLeft:boolean=false;
  taoDangKyMoi:boolean=false;
  isMobile:boolean=false;
  now:Date=new Date();
  constructor(private apiService:ApiService,private dialog:MatDialog, private router: Router,private route: ActivatedRoute,private devideService:DeviceDetectorService) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.isMobile=this.devideService.isMobile();
    this.initHangDoi();
    this.formatMiddle();
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.id != null) {
      var self=this;
      setTimeout(function(){
        self.setIdForUrl(self.id);
      });
    }
  }
  selectedIndexChange(event:any){
    this.tabActive=event;
  }
  formatMiddle(){
   if ($(".middle") != null && $(".middle").length > 0) {
    $(".middle").css({ "height": $(window).height()-93+'px'});
   }
  }
  getHeightToolbar(){
    return this.devideService.isMobile()?214:207;
  }
  //#region Hàng đợi
  bacSiKhamHangDoiQueryInfo:any={};
  bacSiKhamHangDoiSearching:boolean=false;
  columnsHangDoi: TableColumn<any>[] = [];
  dataSourceHangDoi: any;
  groupByColumnsHangDoi: string[] = ["TrangThaiHienThi"];
  sortByColumnHangDoi: SortDescriptor = { field: 'SoThuTu', dir: 'asc' };
  documentTypeHangDoi: DocumentType;
  nguoiBenhDangKhamId:number=null;
  @ViewChild('hoTenTemplate', { static: true }) hoTenTemplate: TemplateRef<any>;
  @ViewChild('tableHangDoi', { static: true }) tableHangDoi: TableComponent;


  initHangDoi() {
    this.documentTypeHangDoi = DocumentType.KhamBenhBacSiGiaDinhBacSiKham;
    this.columnsHangDoi = [
      { label: 'STT', property: 'SoThuTu', type: 'text', width: 30, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text', minWidth: 212, visible: true,template:this.hoTenTemplate },
      { label: 'GT', property: 'GioiTinhHienThi', type: 'text', width: 40, visible: true },
      { label: 'NS', property: 'NamSinh', type: 'text', width: 40, visible: true },
    ];
  }
  timKiemHangDoi(){
    this.bacSiKhamHangDoiSearching=true;
    this.tableHangDoi.additionalSearchObject=this.bacSiKhamHangDoiQueryInfo;
    this.tableHangDoi.search();
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
        this.timKiemHangDoi();
    }
  }
  huyTimKiemHangDoi(){
    this.bacSiKhamHangDoiSearching=false;
    this.tableHangDoi.additionalSearchObject=null;
    this.tableHangDoi.search();
  }
  setIdForUrl(id:any){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        id: id
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // trigger navigation
    });
    this.nguoiBenhDangKhamId=id;
    if(id!=null)
    {
      this.hideLeft=true;
      if(id==0)
      {
        this.taoDangKyMoi=true;
      }
      else{
        this.taoDangKyMoi=false;
      }
    }
    else{
      this.hideLeft=false;
    }
  }
  chonNguoiBenhKham(id:any){
    this.setIdForUrl(id);
    this.taoDangKyMoi=false;
  }
  extQuayLaiHangDoi(){
    this.setIdForUrl(null);
  }
  extQuayLaiVaTaiLai(){
    this.setIdForUrl(null);
    this.timKiemHangDoi()
  }
  //#endregion
  dangKyKhamMoi(){
    this.taoDangKyMoi=true;
    this.setIdForUrl(0);
  }
  nguoiBenhTiepTheo(){
    this.showPopupLoadingData();
    this.apiService.get("KhamBenhBacSiGiaDinhBacSiKham/GetNguoiBenhTiepTheo").subscribe((result:any)=>{
      this.setIdForUrl(result);
      this.taoDangKyMoi=false;
      this.closePopupLoadingData();
    },(err:any) => {
      this.closePopupLoadingData();
      console.log(err);
    });
  }
  batDauKhamCuaDangKyMoi(event:number){
    this.taoDangKyMoi=false;
    this.setIdForUrl(event);
  }
  getDataSourceHangDoi(_event){

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
