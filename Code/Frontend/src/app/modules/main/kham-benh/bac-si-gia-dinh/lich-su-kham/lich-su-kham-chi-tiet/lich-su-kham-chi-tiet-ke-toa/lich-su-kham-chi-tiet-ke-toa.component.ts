import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { AccessUser } from 'src/app/shared/models/access-user.model';

@Component({
  selector: 'app-lich-su-kham-chi-tiet-ke-toa',
  templateUrl: './lich-su-kham-chi-tiet-ke-toa.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet-ke-toa.component.scss']
})
export class LichSuKhamChiTietKeToaComponent implements OnInit {

  chanDoanDieuTriVo:any={};

  documentType:DocumentType;
  dataChonKeToa:any;
  validationErrors:any;
  columnsKeToa: TableColumn<any>[] = [];
  dataSourceKeToa: any;
  groupByColumnsKeToa: string[] = [];
  sortByColumnKeToa: SortDescriptor = { field: 'SoThuTu', dir: 'asc' };
  accessUser:AccessUser;
  barCodeLinkDangKyKham:any;
  @Input() data:any;
  @Input() thongTinHanhChinh:any;
  constructor(private dialog:MatDialog,private apiService:ApiService,private authService:AuthService) { }

  ngOnInit() {
    this.documentType=DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham;
    this.getColumnsKeToa();
    this.accessUser = this.authService.getAccessUser();
    this.barCodeLinkDangKyKham=this.accessUser.BarCodeLinkDangKyKham;
  }
  ngAfterViewInit() { 
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data != undefined && changes.data.currentValue.Id != null) {
      this.getLichSuKhamChiTietThongTinChanDoanDieuTri(changes.data.currentValue.Id);
    }
  }
  getLichSuKhamChiTietThongTinChanDoanDieuTri(id:number){
    this.showPopupLoadingData();
    this.apiService.get("KhamBenhBacSiGiaDinhLichSuBacSiKham/GetLichSuKhamChiTietThongTinChanDoanDieuTri/"+id).subscribe((result)=>{
      this.chanDoanDieuTriVo=result;
      this.dataSourceKeToa={
        Data:this.chanDoanDieuTriVo.ToaThuocs,
        TotalRowCount:this.chanDoanDieuTriVo.ToaThuocs.length
      };
      this.closePopupLoadingData();
      this.getBarCodeLinkDangKyKham();
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
  getColumnsKeToa() {
    this.columnsKeToa = [      
      { label: 'TÊN', property: 'DuocPhamTen', type: 'text', minWidth: 150, visible: true, disableFilter: false,sticky:true },
      { label: 'HOẠT CHẤT', property: 'HoatChat', type: 'text', width: 100, visible: true, disableFilter: false },
      { label: 'HÀM LƯỢNG', property: 'HamLuong', type: 'text', width: 80, visible: true, disableFilter: false },
      { label: 'ĐVT', property: 'DonViTinh', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'ĐD', property: 'DuongDung', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'SÁNG', property: 'SoLuongSang', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'TRƯA', property: 'SoLuongTrua', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'CHIỀU', property: 'SoLuongChieu', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'TỐI', property: 'SoLuongToi', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'SỐ NGÀY', property: 'SoNgayDung', type: 'text', width: 80, visible: true, disableFilter: false },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true, disableFilter: false },
      { label: 'CÁCH DÙNG', property: 'CachDung', type: 'text', width: 100, visible: true, disableFilter: false }
      
    ];
  }
  
  getContentInToaThuoc(){
    //var url=document.location.protocol +'//'+ document.location.hostname+(document.location.port!=null?":"+document.location.port:"") ;
    var LogoUrl="data:image/png;base64,"+this.accessUser.Logo;
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

  
}
