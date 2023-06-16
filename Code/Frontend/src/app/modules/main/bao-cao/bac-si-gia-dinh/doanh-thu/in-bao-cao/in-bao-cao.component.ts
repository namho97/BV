import { CommonService } from 'src/app/core/utilities/common.helper';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { AccessUser } from 'src/app/shared/models/access-user.model';

@Component({
  selector: 'app-in-bao-cao',
  templateUrl: './in-bao-cao.component.html',
  styleUrls: ['./in-bao-cao.component.scss']
})
export class InBaoCaoComponent implements OnInit {

  accessUser:AccessUser;
  constructor(public dialogRef: MatDialogRef<InBaoCaoComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private authService:AuthService) { }

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
    var Template="<table width='100%' class='table-dich-vu'><tr><th>STT</th><th>NGÀY PHÁT SINH</th><th>HỌ TÊN</th><th>TRẠNG THÁI THANH TOÁN</th><th>LOẠI DỊCH VỤ</th><th>TÊN DỊCH VỤ</th><th>ĐVT</th><th>SỐ LƯỢNG</th><th>ĐƠN GIÁ</th><th>THÀNH TIỀN</th><th>DOANH THU</th></tr>";
    var i=1;
    var tongThanhTien=0;
    var tongDoanhThu=0;
    this.data.Data.forEach(item => {
      Template+="<tr>";
      Template+="<td align='center'>"+i+"</td>";
      Template+="<td>"+item.NgayPhatSinhHienThi+"</td>";
      Template+="<td>"+item.HoTen+"</td>";
      Template+="<td>"+item.TrangThaiThanhToanHienThi+"</td>";
      Template+="<td>"+item.LoaiDichVuHienThi+"</td>";
      Template+="<td>"+item.TenDichVu+"</td>";
      Template+="<td>"+item.DonViTinh+"</td>";
      Template+="<td align='center'>"+item.SoLuong+"</td>";
      Template+="<td align='right'>"+CommonService.formatMoney(item.DonGia)+"</td>";
      Template+="<td align='right'>"+CommonService.formatMoney(item.ThanhTien)+"</td>";
      Template+="<td align='right'>"+CommonService.formatMoney(item.DoanhThu)+"</td>";
      Template+="</tr>";
      tongThanhTien+=(item.ThanhTien??0);
      tongDoanhThu+=(item.DoanhThu??0);
      i++;
    });
    Template+="<tr><td colspan='9' align='right'><strong>TỔNG CỘNG:</strong></td><td align='right'><strong>"+CommonService.formatMoney(tongThanhTien)+"</strong></td><td align='right'><strong>"+CommonService.formatMoney(tongDoanhThu)+"</strong></td></tr>";
    Template+="</table>";
    var now=new Date();
    var NgayThangHientai=CommonService.formatTime(now) + ", Ngày "+now.getDate()+" tháng "+(now.getMonth()+1)+" năm "+now.getFullYear()+"";

    return "<style>body{padding:0;margin:0;}p{padding:0;margin:0;margin-bottom:3px;}.mb-0{margin-bottom:0}.mb-3{margin-bottom:15px}table, th, td{border-collapse: collapse; font-family: Times New Roman; font-size: 13px;}table.table-dich-vu{margin-top:30px;page-break-inside:auto;border-left:1px solid #000;border-bottom:1px solid #000;}table.table-dich-vu td,table.table-dich-vu th{padding:5px;border-top:1px solid #000;border-right:1px solid #000;}table.table-dich-vu tr{page-break-inside:avoid; page-break-after:auto}table.table-dich-vu th{page-break-inside:avoid; page-break-after:auto}</style><table width='100%'><tr><td width='50%' valign='top'><table width='100%'><tr><td style='width:60px'><img src='"+LogoUrl+"' alt='' height='60'/></td><td><p><strong>"+TenPhongKham+"</strong></p><p>"+DiaChiPhongKham+"</p><p>"+SoDienThoaiPhongKham+"</p></td></tr></table></td><td align='center'><h1 class='mb-0' style='font-size:22px;'>BÁO CÁO DOANH THU</h1><p>"+NgayThangHientai+"</p></td></tr><tr><td colspan='2'><table width='100%' style='margin-top:15px'><tr><td><p>Trạng thái thanh toán: <strong>"+(this.data.TrangThaiThanhToan!=null?this.data.TrangThaiThanhToan:"Tất cả")+"</strong></p><p>Loại dịch vụ: <strong>"+(this.data.LoaiDichVu!=null?this.data.LoaiDichVu:"Tất cả")+"</strong></p></td><td><p>Từ ngày: <strong>"+(this.data.TuNgay!=null?CommonService.formatDateTime(this.data.TuNgay):"")+"</strong></p><p>Đến ngày: <strong>"+(this.data.DenNgay!=null?CommonService.formatDateTime(this.data.DenNgay):"")+"</strong></p></td></tr></table></td></tr><tr><td colspan='2'>"+Template+"</td></tr></table>";
  }

}
