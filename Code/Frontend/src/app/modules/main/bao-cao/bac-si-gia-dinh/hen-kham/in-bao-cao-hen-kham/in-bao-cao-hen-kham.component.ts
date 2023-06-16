import { CommonService } from 'src/app/core/utilities/common.helper';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { AccessUser } from 'src/app/shared/models/access-user.model';

@Component({
  selector: 'app-in-bao-cao-hen-kham',
  templateUrl: './in-bao-cao-hen-kham.component.html',
  styleUrls: ['./in-bao-cao-hen-kham.component.scss']
})
export class InBaoCaoHenKhamComponent implements OnInit {
  accessUser:AccessUser;
  constructor(public dialogRef: MatDialogRef<InBaoCaoHenKhamComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private authService:AuthService) { }

  ngOnInit() {
    this.accessUser = this.authService.getAccessUser();
  }

  close(result = null) {
    this.dialogRef.close(result);
  }
  
  getContentInBaoCao(){
    var LogoUrl=this.accessUser.Logo;
    //var BarCodeImgBase64=this.thongTinHanhChinh!=null?this.thongTinHanhChinh.Barcode:"";
    var TenPhongKham=this.accessUser.TenPhongKham;
    //var BacSiPhongKham="BS. HẢI LỢI"
    var SoDienThoaiPhongKham=this.accessUser.DienThoaiPhongKham;
    var DiaChiPhongKham=this.accessUser.DiaChiPhongKham;
    // var GioKhamPhongKham=this.accessUser.GioKhamPhongKham;
    // var LinkDangKyKham= this.accessUser.LinkDangKyKham;
    var Template="<table width='100%' class='table-dich-vu'><tr><th>STT</th><th>MÃ NB</th><th>HỌ TÊN</th><th>GIỚI TÍNH</th><th>NGÀY SINH</th><th>ĐIỆN THOẠI</th><th>ĐỊA CHỈ</th><th>NGÀY HẸN</th><th>GIỜ HẸN</th><th>HÌNH THỨC HẸN</th><th>TRẠNG THÁI</th></tr>";
    var i=1;
    this.data.Data.forEach(item => {
      Template+="<tr>";
      Template+="<td align='center'>"+i+"</td>";
      Template+="<td>"+item.MaNguoiBenh+"</td>";
      Template+="<td>"+item.HoTen+"</td>";
      Template+="<td>"+item.GioiTinhHienThi+"</td>";
      Template+="<td>"+item.NgayThangNamSinh+"</td>";
      Template+="<td>"+item.SoDienThoai+"</td>";
      Template+="<td>"+item.DiaChiDayDu+"</td>";
      Template+="<td>"+item.NgayHenKhamHienThi+"</td>";
      Template+="<td>"+item.GioHenKhamHienThi+"</td>";
      Template+="<td>"+item.HinhThucHenHienThi+"</td>";
      Template+="<td>"+item.TrangThaiHienThi+"</td>";
      Template+="</tr>";
      i++;
    });
    Template+="</table>";
    var now=new Date();
    var NgayThangHientai=CommonService.formatTime(now) + ", Ngày "+now.getDate()+" tháng "+(now.getMonth()+1)+" năm "+now.getFullYear()+"";

    return "<style>body{padding:0;margin:0;}p{padding:0;margin:0;margin-bottom:3px;}.mb-0{margin-bottom:0}.mb-3{margin-bottom:15px}table, th, td{border-collapse: collapse; font-family: Times New Roman; font-size: 13px;}table.table-dich-vu{margin-top:30px;page-break-inside:auto;border-left:1px solid #000;border-bottom:1px solid #000;}table.table-dich-vu td,table.table-dich-vu th{padding:5px;border-top:1px solid #000;border-right:1px solid #000;}table.table-dich-vu tr{page-break-inside:avoid; page-break-after:auto}table.table-dich-vu th{page-break-inside:avoid; page-break-after:auto}</style><table width='100%'><tr><td width='50%' valign='top'><table width='100%'><tr><td style='width:60px'><img src='"+LogoUrl+"' alt='' height='60'/></td><td><p><strong>"+TenPhongKham+"</strong></p><p>"+DiaChiPhongKham+"</p><p>"+SoDienThoaiPhongKham+"</p></td></tr></table></td><td align='center'><h1 class='mb-0' style='font-size:22px;'>BÁO CÁO HẸN KHÁM</h1><p>"+NgayThangHientai+"</p></td></tr><tr><td colspan='2'><table width='100%' style='margin-top:15px'><tr><td><p>Trạng thái: <strong>"+(this.data.TrangThai!=null?this.data.TrangThai:"Tất cả")+"</strong></p></td><td><p>Từ ngày: <strong>"+(this.data.TuNgay!=null?CommonService.formatDateTime(this.data.TuNgay):"")+"</strong></p></td><td><p>Đến ngày: <strong>"+(this.data.DenNgay!=null?CommonService.formatDateTime(this.data.DenNgay):"")+"</strong></p></td></tr></table></td></tr><tr><td colspan='2'>"+Template+"</td></tr></table>";
  }

}
