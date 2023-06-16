import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { DocumentType } from "src/app/shared/enum/document-type.enum";

@Component({
  selector: 'app-nhap-ket-qua',
  templateUrl: './nhap-ket-qua.component.html',
  styleUrls: ['./nhap-ket-qua.component.scss']
})
export class NhapKetQuaComponent implements OnInit {

  id: number = null;
  dataChon: any;
  timKiemModel: any = {TinhTrang:[1,2]};
  accessUser:AccessUser;
  documentType: DocumentType;
  columns: TableColumn<any>[] = [];  
  dataSource:any; 
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor={field:'GioHenKham',dir:'asc'};
  @ViewChild('tinhTrangTemplate', { static: true }) tinhTrangTemplate: TemplateRef<any>;
  @ViewChild("tableNhapKetQua", { static: true }) table:TableComponent;

  constructor(private route: ActivatedRoute, public dialog: MatDialog,  private authService:AuthService, private cdref: ChangeDetectorRef) {
    this.id = this.route.snapshot.queryParams.id;
  }
//#region init
  ngOnInit() {
    this.accessUser=this.authService.getAccessUser();
    this.documentType = DocumentType.CdhaTdcnNhapKetQua;
    this.columns=[
      
      
      { label: 'MÃ TN', property: 'MaTiepNhan', type: 'text',width:70, visible: true,isLink:true },
      { label: 'MÃ NB', property: 'MaNguoiBenh', type: 'text',width:60, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text',width:160, visible: true },
      { label: 'GT', property: 'GioiTinh', type: 'text',width:40, visible: true },
      { label: 'NS', property: 'NamSinh', type: 'text',width:40, visible: true },
      { label: 'CHỈ ĐỊNH', property: 'ChiDinh', type: 'text',minWidth:300, visible: true },
      { label: 'TRẠNG THÁI', property: 'TinhTrang', type: 'text',width:110, visible: true,template:this.tinhTrangTemplate },
      { label: 'NGÀY CHỈ ĐỊNH', property: 'NgayChiDinh', type: 'text',width:140, visible: true },      
      { label: 'NGÀY THỰC HIỆN', property: 'NgayThucHien', type: 'text',width:140, visible: true }
    ];
    this.getData();
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.id != null) {
      var self=this;
      setTimeout(function(){
        self.table.view(self.id);
      });
    }
  }
  getData(){

    this.dataSource ={      
      Data:[
        {"Id":1,"MaTiepNhan":'2207150191',"MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,"ChiDinh":"(0/1) Chụp Xquang sọ thẳng/nghiêng (D.R 2 phim)","TinhTrang": "Chờ kết quả", "LoaiTinhTrang": 1,"NgayChiDinh":"22/05/2022 11:25 AM","NgayThucHien":""},
        {"Id":2,"MaTiepNhan":'2207150192',"MaNguoiBenh":"22052612","HoTen":"HÀ HỒ ANH","GioiTinh":"Nữ","NamSinh":1988,"ChiDinh":"(0/2) Chụp Xquang cột sống cổ thẳng nghiêng (D.R); Chụp Xquang ngực thẳng (D.R)","TinhTrang": "Chờ kết quả", "LoaiTinhTrang": 1,"NgayChiDinh":"22/05/2022 11:25 AM","NgayThucHien":""},
        {"Id":3,"MaTiepNhan":'2207150193',"MaNguoiBenh":"22052613","HoTen":"NGUYỄN THÁI BÌNH","GioiTinh":"Nữ","NamSinh":1988,"ChiDinh":"(0/1) Chụp Xquang ngực thẳng (D.R)","TinhTrang": "Chờ kết quả", "LoaiTinhTrang": 1,"NgayChiDinh":"22/05/2022 11:25 AM","NgayThucHien":""},
        {"Id":4,"MaTiepNhan":'2207150194',"MaNguoiBenh":"22052614","HoTen":"TRẦN NGỌC TIẾN","GioiTinh":"Nữ","NamSinh":1988,"ChiDinh":"(0/1) Chụp Xquang xương gót thẳng nghiêng (D.R 2 phim)","TinhTrang": "Chờ kết quả", "LoaiTinhTrang": 1,"NgayChiDinh":"22/05/2022 11:25 AM","NgayThucHien":""},
        {"Id":5,"MaTiepNhan":'2207150195',"MaNguoiBenh":"22052615","HoTen":"ĐẶNG THỊ BÍCH","GioiTinh":"Nữ","NamSinh":1988,"ChiDinh":"(1/1) Chụp Xquang sọ thẳng/nghiêng (D.R 2 phim)","TinhTrang": "Đã có kết quả", "LoaiTinhTrang": 2,"NgayChiDinh":"22/05/2022 11:25 AM","NgayThucHien":"22/05/2022 11:25 AM"}
      ],
      TotalRowCount:49
    }
  }
  //#endregion init 

//#region actions
  extDataItemSelected(event)
  {
    this.dataChon = event; 
    this.cdref.detectChanges();

  }
  quayLaiChange() {
    this.dataChon = null;
    this.table.back();
  }
  dataChange(event) {
    if (event) {
      this.table.search();
    }
  }
  //#endregion actions


//#region tìm kiếm
  onKey(event:any){
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
 
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.timKiemModel;
    this.table.search();
    this.dangTimKiem=true;
  }
  huyTimKiem(){
    this.timKiemModel={};
    this.timKiem();
    this.dangTimKiem=false;
  }
  //#endregion tìm kiếm

}
