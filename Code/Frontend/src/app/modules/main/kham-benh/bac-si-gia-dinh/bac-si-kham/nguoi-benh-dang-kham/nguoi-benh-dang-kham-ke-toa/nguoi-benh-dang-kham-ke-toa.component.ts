import { ToaMauComponent } from './../toa-mau/toa-mau.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, DoCheck, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { LuuToaMauMoiComponent } from './luu-toa-mau-moi/luu-toa-mau-moi.component';
import { ApiService } from 'src/app/core/services/api.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { DeviceDetectorService } from 'ngx-device-detector';
declare let $: any;

@Component({
  selector: 'app-nguoi-benh-dang-kham-ke-toa',
  templateUrl: './nguoi-benh-dang-kham-ke-toa.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-ke-toa.component.scss']
})
export class NguoiBenhDangKhamKeToaComponent implements OnInit,DoCheck {

  timeoutCheckChange:any=null;
  request:any=null;
  chanDoanDieuTriCompareVo:any={};//Lưu lại data của lần lưu cuối cùng, dùng cho việc so sánh object có thay đổi hay không
  chanDoanDieuTriOriginVo:any={};//Lưu lại data gốc ban đầu, dùng để cho việc reset form


  documentType:DocumentType;
  dataChonKeToa:any;
  validationErrors:any;
  chanDoanDieuTriVo: any={IcdChinh:null,IcdKemTheo:[],NoiDungChanDoan:"",ThuThuat:"",CachGiaiQuyet:1,BenhVienChuyenDen:null,LyDoNhapVien:null,LoiDan:"",KhamLaiSau:null,NgayHenTaiKham:null,GhiChuHenTaiKham:null,TenToaMauMoi:"",SoNgayDungThuocMacDinh:3};
  columnsKeToa: TableColumn<any>[] = [];
  groupByColumnsKeToa: string[] = [];
  dataSourceKeToa:any={Data:[],TotalRowCount:0};
  sortByColumnKeToa: SortDescriptor = { field: 'SoThuTu', dir: 'asc' };
  viewTypeToaThuoc:number=$(window).width()>1760?2:1;
  accessUser:AccessUser;
  barCodeLinkDangKyKham:any;
  isMobile:boolean=false;
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
  @ViewChild('donGiaTemplate', { static: true }) donGiaTemplate: TemplateRef<any>;
  @ViewChild('thanhTienTemplate', { static: true }) thanhTienTemplate: TemplateRef<any>;
  @ViewChild('thanhTienFooterTemplate', { static: true }) thanhTienFooterTemplate: TemplateRef<any>;
  @ViewChild('donGiaFooterTemplate', { static: true }) donGiaFooterTemplate: TemplateRef<any>;
  @Input() data:any;
  @Input() taoDangKyMoi:any;
  @Input() nhanLuu:boolean;
  @Input() nhanHoanThanhKham:boolean;
  @Input() nhanNhapLai:boolean;
  @Input() thongTinHanhChinh:any;
  @Input() taiLai:boolean;
  @Output() extLuuXong= new EventEmitter<any>();
  @Output() taiLaiVienPhi= new EventEmitter<any>();  
  @Output() extTaiLaiXong= new EventEmitter<any>();
  constructor(private dialog:MatDialog,private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService,
    private authService:AuthService,private devideService:DeviceDetectorService) { }

  ngOnInit() {
    this.isMobile=this.devideService.isMobile();
    this.documentType=DocumentType.KhamBenhBacSiGiaDinhBacSiKham;    
    this.accessUser = this.authService.getAccessUser();
    this.barCodeLinkDangKyKham=this.accessUser.BarCodeLinkDangKyKham;
    this.getColumnsKeToa();
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data != undefined && changes.data.currentValue != null) {
      this.getNguoiBenhDangKhamThongTinChanDoanDieuTri();
    }
    if (changes.nhanLuu != undefined && changes.nhanLuu.currentValue != null && changes.nhanLuu.currentValue==true) {
      this.luu();
    }
    if (changes.nhanNhapLai != undefined && changes.nhanNhapLai.currentValue != null && changes.nhanNhapLai.currentValue==true) {      
      this.chanDoanDieuTriCompareVo=CommonService.copyObject(this.chanDoanDieuTriOriginVo);
      this.chanDoanDieuTriVo=CommonService.copyObject(this.chanDoanDieuTriOriginVo);
      this.luu();
    }
    if (changes.taiLai != undefined && changes.taiLai.currentValue ==true) {
      this.getNguoiBenhDangKhamThongTinChanDoanDieuTri();
    }
  }
  ngOnDestroy(){
    if(CommonService.compareObjectChange(this.chanDoanDieuTriCompareVo,this.chanDoanDieuTriVo))
    {
      this.showPopupLoadingData("Đang lưu dữ liệu chẩn đoán điều trị...");
      this.luu();
    }
    if(this.timeoutCheckChange!=null)
    {
      clearTimeout(this.timeoutCheckChange);
    }
  }
  ngDoCheck(){    
    //this.checkChange();
  }
  checkChange(){
    var self=this;
    if(this.timeoutCheckChange!=null)
    {
      clearTimeout(this.timeoutCheckChange);
    }
    this.timeoutCheckChange=setTimeout(function(){
      if(CommonService.compareObjectChange(self.chanDoanDieuTriCompareVo,self.chanDoanDieuTriVo))
      {
        self.luu();
      }
    },5000);
  }
  getNguoiBenhDangKhamThongTinChanDoanDieuTri(){
    this.showPopupLoadingData();
    this.apiService.get("KhamBenhBacSiGiaDinhBacSiKham/GetNguoiBenhDangKhamThongTinChanDoanDieuTri/"+this.data).subscribe((result:any)=>{
      this.chanDoanDieuTriVo=result;
      this.chanDoanDieuTriCompareVo=CommonService.copyObject(this.chanDoanDieuTriVo);
      this.chanDoanDieuTriOriginVo=CommonService.copyObject(this.chanDoanDieuTriVo);
      this.dataSourceKeToa={
        Data:this.chanDoanDieuTriVo.ToaThuocs,
        TotalRowCount:this.chanDoanDieuTriVo.ToaThuocs.length
      };
      if(this.tableKeToa!=null)
      {
        this.tableKeToa.setDataSource(this.dataSourceKeToa);
      }
      this.closePopupLoadingData();
      this.getBarCodeLinkDangKyKham();
      this.extTaiLaiXong.emit(true);
    },(err:any) => {
      this.closePopupLoadingData();
      console.log(err);
    });
  }
  getBarCodeLinkDangKyKham(){
    this.showPopupLoadingData();
    this.apiService.get("QuanTriNhomNguoiBenhNguoiBenh/GetBarCodeLinkDangKyKham?id="+this.thongTinHanhChinh.NguoiBenhId).subscribe((result:any)=>{
      this.barCodeLinkDangKyKham=result;
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
      { label: '', property: 'actions', type: 'button', visible: true, width: 20, useActionDefault: true, hideFilter: true, template: this.actionKeToaTemplate },
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
      { label: 'Đ.GIÁ', property: 'Gia', type: 'text', width: 110, visible: true, disableFilter: false,template:this.donGiaTemplate,footerTemplate:this.donGiaFooterTemplate },
      { label: 'T.TIỀN', property: 'ThanhTien', type: 'text', width: 90, visible: true, disableFilter: false,template:this.thanhTienTemplate,footerTemplate:this.thanhTienFooterTemplate },
      { label: 'CÁCH DÙNG', property: 'CachDung', type: 'text', minWidth: 150, visible: true, disableFilter: false ,template:this.cachDungTemplate}      

    ];
  }
  viewKeToa(dataItem: any) {
    this.dataChonKeToa = dataItem;

  }
  getTongThanhTienThuoc(){
    return this.chanDoanDieuTriVo.ToaThuocs.reduce((prev,next)=>(prev??0)+(next.ThanhTien??0),0);
  }
  chonTuToaMau(){
    this.dialog.open(ToaMauComponent, {
      disableClose: false,
      width: '1100px',
      data: {  }
    }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
        if (result) {
          this.showPopupLoadingData();
          this.apiService.get("QuanTriNhomPhongKhamToaThuocMau/"+result.Id).subscribe((result:any)=>{
            this.chanDoanDieuTriVo.ToaThuocs=result.ToaThuocMauChiTiets.concat(this.chanDoanDieuTriVo.ToaThuocs);
            this.dataSourceKeToa={
              Data:this.chanDoanDieuTriVo.ToaThuocs,
              TotalRowCount:this.chanDoanDieuTriVo.ToaThuocs.length
            };
            if(this.viewTypeToaThuoc==2)
            {
              this.tableKeToa.setDataSource(this.dataSourceKeToa);
            }
            this.closePopupLoadingData();
          },(err:any) => {
            this.closePopupLoadingData();
            console.log(err);
          });
        }
    });
  }
  toaMauChange(event:any){
    this.showPopupLoadingData();
    this.apiService.get("QuanTriNhomPhongKhamToaThuocMau/"+event.KeyId).subscribe((result:any)=>{
      this.chanDoanDieuTriVo.ToaThuocs=result.ToaThuocMauChiTiets.concat(this.chanDoanDieuTriVo.ToaThuocs);
      this.dataSourceKeToa={
        Data:this.chanDoanDieuTriVo.ToaThuocs,
        TotalRowCount:this.chanDoanDieuTriVo.ToaThuocs.length
      };
      if(this.viewTypeToaThuoc==2)
      {
        this.tableKeToa.setDataSource(this.dataSourceKeToa);
      }
      this.closePopupLoadingData();
    },(err:any) => {
      this.closePopupLoadingData();
      console.log(err);
    });
  }
  xoaThuoc(item:any){
    const index: number = this.chanDoanDieuTriVo.ToaThuocs.indexOf(item);
    if (index !== -1) {
      this.chanDoanDieuTriVo.ToaThuocs.splice(index, 1);
      if(this.viewTypeToaThuoc==2)
      {
        this.tableKeToa.setDataSource(this.dataSourceKeToa);
      }
    }
  }
  tinhTongSoLuong(dataItem:any){
    dataItem.SoLuong=((dataItem.SoLuongSang??0)+(dataItem.SoLuongTrua??0)+(dataItem.SoLuongChieu??0)+(dataItem.SoLuongToi??0)) * (dataItem.SoNgayDung??1);
  }
  giaModelChange(_event,item){
    item.ThanhTien=(item.Gia??0)*(item.SoLuong??0);
  }
  tinhThanhTienDichVuKhac(item:any){
    item.ThanhTienDichVuKhac=(item.SoLuongDichVuKhac??0)*(item.DonGiaDichVuKhac??0);
  }
  getContentInToaThuoc(){
    //var url=document.location.protocol +'//'+ document.location.hostname+(document.location.port!=null?":"+document.location.port:"") ;
    var LogoUrl=this.accessUser.Logo;
    //var BarCodeImgBase64=this.thongTinHanhChinh!=null?this.thongTinHanhChinh.Barcode:"";
    var TenPhongKham=this.accessUser.TenPhongKham;
    //var BacSiPhongKham="BS. HẢI LỢI"
    var SoDienThoaiPhongKham=this.accessUser.DienThoaiPhongKham;
    var DiaChiPhongKham=this.accessUser.DiaChiPhongKham;
    var GioKhamPhongKham=this.accessUser.GioKhamPhongKham;
    var LinkDangKyKham= this.accessUser.LinkDangKyKham;
    var BarCodeLinkDangKyKham=this.barCodeLinkDangKyKham;
    //var MaTN=this.thongTinHanhChinh!=null?this.thongTinHanhChinh.MaTiepNhan:"";
    //var MaBN= this.thongTinHanhChinh!=null?this.thongTinHanhChinh.MaNguoiBenh:"";
    var HoTen= this.thongTinHanhChinh!=null?this.thongTinHanhChinh.HoTen:"";
    var GioiTinh= this.thongTinHanhChinh!=null?this.thongTinHanhChinh.GioiTinhHienThi:"";
    var NamSinhDayDu= this.thongTinHanhChinh!=null?this.thongTinHanhChinh.NgayThangNamSinh:"";
    var Tuoi= this.thongTinHanhChinh!=null?this.thongTinHanhChinh.Tuoi:"";
    var SoDienThoai= this.thongTinHanhChinh!=null?this.thongTinHanhChinh.SoDienThoai:"";
    var DiaChi= this.thongTinHanhChinh!=null?this.thongTinHanhChinh.DiaChiDayDu:"";
    var ChuanDoan=this.chanDoanDieuTriVo.NoiDungChanDoan;
    var TemplateDonThuoc="<table width='100%' class='table-thuoc'><tr><th style='width:30px'>STT</th><th>TÊN THUỐC - HÀM LƯỢNG - LIỀU DÙNG</th><th style='width:50px'>SL</th><th style='width:50px'>ĐVT</th></tr>";
    var i=1;
    this.chanDoanDieuTriVo.ToaThuocs.filter(o=>o.DuocPhamId!=null && o.DuocPhamId>0).forEach(item => {
      TemplateDonThuoc+="<tr>";
      TemplateDonThuoc+="<td align='center'>"+i+"</td>";
      TemplateDonThuoc+="<td><b>"+item.DuocPhamTen+" + "+item.HamLuong+"</b>";
      if((item.SoLuongSang!=null || item.SoLuongTrua!=null|| item.SoLuongChieu!=null|| item.SoLuongToi!=null) &&
      (item.SoLuongSang>0 || item.SoLuongTrua>0|| item.SoLuongChieu>0|| item.SoLuongToi>0))
      {
        TemplateDonThuoc+="<br/>";
        var rowDonThuoc="";
        if(item.SoLuongSang!=null && item.SoLuongSang>0 )
        {
          rowDonThuoc+="Sáng: "+item.SoLuongSang+", ";
        }
        if(item.SoLuongTrua!=null && item.SoLuongTrua>0 )
        {
          rowDonThuoc+="Trưa: "+item.SoLuongTrua+", ";
        }
        if(item.SoLuongChieu!=null && item.SoLuongChieu>0 )
        {
          rowDonThuoc+="Chiều: "+item.SoLuongChieu+", ";
        }
        if(item.SoLuongToi!=null && item.SoLuongToi>0 )
        {
          rowDonThuoc+="Tối: "+item.SoLuongToi+", ";
        }
        TemplateDonThuoc+=rowDonThuoc.substring(0,rowDonThuoc.length-2);
      }
      TemplateDonThuoc+="<br/>"+(item.CachDung??'')+"</td>";
      TemplateDonThuoc+="<td align='center'>"+(item.SoLuong??0)+"</td>";
      TemplateDonThuoc+="<td align='center'>"+(item.DonViTinh)+"</td>";
      TemplateDonThuoc+="</tr>";
      i++;
    });
    TemplateDonThuoc+="</table>";
    var LoiDan=this.chanDoanDieuTriVo.LoiDan;
    var NgayTaiKham=this.chanDoanDieuTriVo.NgayHenTaiKham!=null?CommonService.formatDate(new Date(this.chanDoanDieuTriVo.NgayHenTaiKham)):"";
    var GhiChuHenTaiKham=this.chanDoanDieuTriVo.GhiChuHenTaiKham!=null?"Lưu ý: "+this.chanDoanDieuTriVo.GhiChuHenTaiKham:"";
    var now=new Date();
    var NgayThangHientai="Ngày "+now.getDate()+" tháng "+(now.getMonth()+1)+" năm "+now.getFullYear()+"";
    var BacSiKham=this.accessUser.FullName;

    return "<style>p{margin:0}table, th, td{border-collapse: collapse; font-family: Times New Roman; font-size: 13px;}table.table-thuoc{page-break-inside:auto;border-left:1px solid #000;border-bottom:1px solid #000;}table.table-thuoc td,table.table-thuoc th{padding:5px;border-top:1px solid #000;border-right:1px solid #000;}table.table-thuoc tr{page-break-inside:avoid; page-break-after:auto}table.table-thuoc th{page-break-inside:avoid; page-break-after:auto}#loi-dan{width: 60px;}.container{width:100%;display:table;}.container .value{display:table-cell; width:100%; height:100%; vertical-align:top; position:relative;box-sizing:border-box; border-bottom:1px dotted black;}.container .label{width: max-content; white-space: nowrap}</style><div> <table style='width:100%'> <tbody><tr><td colspan='3' valign='top'><table><tr> <td valign='top'><img src='"+LogoUrl+"' style='height: 80px;' alt='CAMINO CLINIC'/></td><td> <p><strong>"+TenPhongKham+"</strong></p><p>"+SoDienThoaiPhongKham+"</p><p>Địa chỉ: "+DiaChiPhongKham+"</p><p>Giờ khám: "+GioKhamPhongKham+"</p><p>Link: <a href='"+LinkDangKyKham+" target='_blank''>"+LinkDangKyKham+"</a></p></td></td></tr></table></td><td valign='top' style='text-align:center'><div style='text-align:center;width:100%'> <img style='height: 60px;' src='data:image/png;base64,"+BarCodeLinkDangKyKham+"'></div><p>Quét mã đăng ký</p></td></tr><tr> <td colspan='4' valign='top' align='center'><br/><span style='font-size: 25px;font-weight:bold;'>ĐƠN THUỐC</span> </td></tr><tr> <td colspan='3' valign='top'>Họ và tên: <b>"+HoTen+"</b> </td><td valign='top'>Giới tính: "+GioiTinh+"</td></tr><tr> <td colspan='2' valign='top'>Ngày sinh: "+NamSinhDayDu+"</td><td valign='top'>Tuổi: "+Tuoi+"</td><td valign='top'>SĐT: "+SoDienThoai+"</td></tr><tr> <td colspan='4' valign='top'>Địa chỉ: "+DiaChi+"</td></tr><tr> <td colspan='4'>Chẩn đoán: "+ChuanDoan+"</td></tr></tbody> </table> <br>"+TemplateDonThuoc+"<div style='display: flex;flex-direction: row;word-wrap: break-word;font-style:italic;margin-top:15px;font-size:13px;'> Lời dặn: "+LoiDan+"</div><div style='display: flex;flex-direction: row;word-wrap: break-word;font-style:italic;margin-top:15px;font-size:13px;'> Ngày tái khám: "+NgayTaiKham+"</div><table style='width:100%;margin-bottom:15px;'> <tr> <td style='width:50%;'></td><td style='text-align: center;width:50%;'><i>"+NgayThangHientai+"</i><br/><b>Bác sỹ khám bệnh</b><br/><br/><br/><br/><br/><b>"+BacSiKham+"</b></td></tr></table><div style='display: flex;flex-direction: row;word-wrap: break-word;font-style:italic;margin-top:15px;font-size:13px;'> "+GhiChuHenTaiKham+"</div></div>";
  }

  chonDuocPham(event:any){
    this.chanDoanDieuTriVo.DuocPhamId=event!=null?event.Id:null;
    this.chanDoanDieuTriVo.Ten=event!=null?event.Ten:null;

  }
  duocPhamChange(event:any,item:any)
  {
    if(event==null || event==0)
    {

    }
    else{
      var check= this.chanDoanDieuTriVo.ToaThuocs.filter(o=>o.DuocPhamId==event.KeyId && ((item.Id!=null && o.Id!=item.Id)  || (item.IdTemp!=null && o.IdTemp!=item.IdTemp)));
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
        item.Gia=null;
        
        var countThuocChuaCo= this.chanDoanDieuTriVo.ToaThuocs.filter(o=>o.DuocPhamId==null ||o.DuocPhamId==0);
        if(countThuocChuaCo!=null && countThuocChuaCo.length>1)
        {
      
          //XÓa bớt thuốc trống sau cùng
          const index: number = this.chanDoanDieuTriVo.ToaThuocs.length-1;
          if (index !== -1) {
            this.chanDoanDieuTriVo.ToaThuocs.splice(index, 1);
            if(this.viewTypeToaThuoc==2)
            {
              this.tableKeToa.setDataSource(this.dataSourceKeToa);
            }
          }
        }
      }
      else{
        item.DuocPhamTen=event.DisplayName;
        item.HoatChat=event.HoatChat;
        item.HamLuong=event.HamLuong;
        item.DonViTinh=event.DonViTinh;
        item.DuongDung=event.DuongDung;
        item.CachDung=event.CachDung;
        item.Gia=event.Gia;
        item.GiaGoc=event.Gia;
        this.giaModelChange(event.Gia,item);
        if(this.chanDoanDieuTriVo.ToaThuocs.filter(o=>o.DuocPhamId==null)<=0)
        {
          this.chanDoanDieuTriVo.ToaThuocs.push({Id:0,IdTemp:CommonService.makeRandom(6),SoNgayDung:(this.chanDoanDieuTriVo.SoNgayDungThuocMacDinh??1)});
          if(this.viewTypeToaThuoc==2)
          {
            this.tableKeToa.setDataSource(this.dataSourceKeToa);
          }
        }
        setTimeout(function(){
          $("#SoLuongSang"+(item.Id!=null && item.Id>0?item.Id:item.IdTemp)).focus();
        });
      }
    }
  }
  modelObjectChangeIcd(event:any){
    this.chanDoanDieuTriVo.NoiDungChanDoan=event.Description;
  }
  tenDichVuKhacModelObjectChange(event:any,item:any){
    item.DonGiaDichVuKhac=event.Gia;
    item.DonGiaDichVuKhacGoc=event.Gia;

    this.tinhThanhTienDichVuKhac(item);
  }
  luuThanhToaMau(){
    var danhSachThuocs=this.chanDoanDieuTriVo.ToaThuocs.filter(o=>o.DuocPhamId!=null && o.DuocPhamId>0);
    if(danhSachThuocs==null ||danhSachThuocs.length==0)
    {
      CommonService.openSnackBar(this.snackBar, "Danh sách thuốc yêu cầu nhập.", "error");
    }
    else{
      let dialogRef = this.dialog.open(LuuToaMauMoiComponent, {
        width:"400px",
        data: {
          ToaThuocs:danhSachThuocs,
          IcdId:this.chanDoanDieuTriVo.IcdChinhId,
          BacSiId:this.accessUser.Id,
          GhiChu:this.chanDoanDieuTriVo.NoiDungChanDoan
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
  
        }
      });
    }
  }
  luuTienKhamClick(dataItem:any){
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn lưu giá tiền khám này thành giá mặc định?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.apiService.post("QuanTriNhomDuocPhamDuocPham/CapNhatGia",{DuocPhamId:dataItem.DuocPhamId,Gia:dataItem.Gia,TuNgay:new Date()}).subscribe((result)=>{
          if(result)
          {
            dataItem.GiaGoc=dataItem.Gia;
            CommonService.openSnackBar(this.snackBar, "Cập nhật tiền khám thành công", "success");
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Cập nhật tiền khám không thành công", "error");
          }
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
  
  luuDonGiaDichVuKhacClick(dataItem:any){
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn lưu giá tiền dịch vụ này thành giá mặc định?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.apiService.post("QuanTriNhomPhongKhamDichVuKyThuat/CapNhatGia",{Ten:dataItem.TenDichVuKhac,Gia:dataItem.DonGiaDichVuKhac,TuNgay:new Date()}).subscribe((result)=>{
          if(result)
          {
            dataItem.DonGiaDichVuKhacGoc=dataItem.DonGiaDichVuKhac;
            CommonService.openSnackBar(this.snackBar, "Cập nhật giá tiền dịch vụ thành công", "success");
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Cập nhật giá tiền dịch vụ không thành công", "error");
          }
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
  themHoacSuaDuocPhamLuuChange(event:any,dataItem:any){
    dataItem.DuocPhamId=event.Id;
    dataItem.DuocPhamTen=event.Ten;
    dataItem.HoatChat=event.HoatChat;
    dataItem.HamLuong=event.HamLuong;
    dataItem.DonViTinh=event.TenDonViTinh;
    dataItem.DuongDung=event.TenDuongDung;
    dataItem.CachDung=event.CachDung;
    var now=new Date();
    var giaActives=event.DuocPhamGias.filter(o=>(new Date(o.TuNgay) <= new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0)) && (o.DenNgay == null || new Date(o.DenNgay) >= new Date()))            
    dataItem.Gia=giaActives!=null && giaActives.length>0?giaActives[0].Gia:0;
    dataItem.GiaGoc=event.Gia;
    this.giaModelChange(dataItem.Gia,dataItem);
    this.dialog.closeAll();
  }
  themHoacSuaIcdLuuChange(event:any){
    this.chanDoanDieuTriVo.IcdChinh=event.Id;
    this.chanDoanDieuTriVo.NoiDungChanDoan=event.MoTa;
    this.dialog.closeAll();
  }
  themHoacSuaBenhVienLuuChange(event:any){
    this.chanDoanDieuTriVo.BenhVienChuyenDen=event.Id;
    this.dialog.closeAll();
  }
  
  themDichVuKhac(){
    if(this.chanDoanDieuTriVo.DichVuKyThuatKhacs==null)
    {
      this.chanDoanDieuTriVo.DichVuKyThuatKhacs=[];
    }
    this.chanDoanDieuTriVo.DichVuKyThuatKhacs.push({SoLuongDichVuKhac:1});
  }
  xoaDichVuKhac(item:any){
    if(this.chanDoanDieuTriVo.DichVuKyThuatKhacs != null){
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn xóa dịch vụ này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
        
          let indexRemove = this.chanDoanDieuTriVo.DichVuKyThuatKhacs.findIndex((existingItem) => existingItem ==item);
          this.chanDoanDieuTriVo.DichVuKyThuatKhacs.splice(indexRemove, 1);
        }
      });
      
      
    }
  }
  khamLaiSauChange(event:any)
  {
    if(event!=null && event>0)
    {
      this.chanDoanDieuTriVo.NgayHenTaiKham=CommonService.addDate(new Date(),event);
    }
  }
  luu(){
    if(this.request!=null)
    {
      this.request.unsubscribe();
    }
    this.chanDoanDieuTriVo.HoanThanhKham=this.nhanHoanThanhKham;
    
    if(this.chanDoanDieuTriVo.CachGiaiQuyet!=1)
    {
      this.chanDoanDieuTriVo.ToaThuocs=[];
    }
    const dataCopy=CommonService.copyObject(this.chanDoanDieuTriVo);
    if(this.chanDoanDieuTriVo.CachGiaiQuyet==1)
    {
      dataCopy.ToaThuocs.splice(dataCopy.ToaThuocs.length-1, 1);

    }
    this.validationErrors=[];
    this.request=this.apiService.post("KhamBenhBacSiGiaDinhBacSiKham/LuuChanDoanDieuTri",dataCopy).subscribe((result)=>{
      this.chanDoanDieuTriCompareVo=CommonService.copyObject(result);
      this.chanDoanDieuTriVo=result;
      this.nhanLuu=false;
      this.extLuuXong.emit(true);
      this.taiLaiVienPhi.emit(true);
      this.closePopupLoadingData();
    },(err:any) => {

      this.extLuuXong.emit(true);
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
}
