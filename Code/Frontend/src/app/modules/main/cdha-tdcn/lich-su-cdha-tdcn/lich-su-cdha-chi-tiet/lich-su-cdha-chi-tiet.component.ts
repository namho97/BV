import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { environment } from 'src/environments/environment';
declare let $: any;

@Component({
  selector: 'app-lich-su-cdha-chi-tiet',
  templateUrl: './lich-su-cdha-chi-tiet.component.html',
  styleUrls: ['./lich-su-cdha-chi-tiet.component.scss']
})
export class LichSuCdhaChiTietComponent implements OnInit {

  tabActiveIndex:number=0;
  validationErrors:any;
  isUpdate: boolean = false;
  lichSuCDHAVo:any={};
  contentIn:string="(Chưa chọn dịch vụ)";
  @Input() data:any;
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog:MatDialog,private http: HttpClient) { }

  ngOnInit() {
    this.formatFormContent(); 
    this.formatXemPhieuIn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.lichSuCDHAVo={};
      }
      else {
        this.isUpdate = true;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
      this.lichSuCDHAVo={"Id":1,"MaTiepNhan":'2207150191',"MaNguoiBenh":"22052611","HoTen":"ĐẶNG THỊ NGỌC BÍCH","GioiTinh":"Nữ","NamSinh":1988,
      "ChiDinh":"(0/1) Chụp Xquang sọ thẳng/nghiêng (D.R 2 phim)","TinhTrang": "Chờ kết quả", "LoaiTinhTrang": 1,"NgayChiDinh":"22/05/2022 11:25 AM",
      "NgayThucHien":"22/05/2022 11:25 AM",DichVu:"Chụp Xquang sọ thẳng/nghiêng (D.R 2 phim)",TenKetQua:"NỘI SOI",TenKyThuat:"",
      NoiDungKetQua:"<p>- Các bản xương không có hình ảnh lún, vỡ.</p><p>- Các khớp sọ bình thường.</p>",
      NoiDungKetLuan:"<b>Hiện tại không thấy bất thường trên chụp XQ sọ.</b>",DiaChi:"203 Quang Trung, Phường Quang Trung, Quận Hà Đông, Thành phố Hà Nội",
      NoiChiDinh:"Phòng 101",NoiThucHien:"Phòng 201",ChanDoan:"Viêm gan",DienGiai:"Viêm gan siêu vi B",
      HinhAnhDinhKems:[
        {Id:1,Name:'anh-1.jpg',Size:12456,Type:'.jpg',NameGUID:'9fe004b3-2c1b-4798-b9e9-0c77b198e0d6',Uploaded:true,URL:'wwwroot/temp/9fe004b3-2c1b-4798-b9e9-0c77b198e0d6.png'},
        {Id:2,Name:'anh-2.jpg',Size:12456,Type:'.jpg',NameGUID:'16f1ac5e-1749-4d92-8d36-353ea555bd9d',Uploaded:true,URL:'wwwroot/temp/16f1ac5e-1749-4d92-8d36-353ea555bd9d.png'},
        {Id:3,Name:'anh-3.jpg',Size:12456,Type:'.jpg',NameGUID:'380776ba-ba41-4340-924a-3e48ea045ff1',Uploaded:true,URL:'wwwroot/temp/380776ba-ba41-4340-924a-3e48ea045ff1.png'},
        {Id:4,Name:'anh-4.jpg',Size:12456,Type:'.jpg',NameGUID:'b21d1993-783c-40d2-9001-f5df660f1c11',Uploaded:true,URL:'wwwroot/temp/b21d1993-783c-40d2-9001-f5df660f1c11.png'},
        {Id:5,Name:'anh-5.jpg',Size:12456,Type:'.jpg',NameGUID:'ca8df3a2-adf2-4faa-aa65-07cf17823eae',Uploaded:true,URL:'wwwroot/temp/ca8df3a2-adf2-4faa-aa65-07cf17823eae.png'},
        {Id:6,Name:'anh-6.jpg',Size:12456,Type:'.jpg',NameGUID:'dca94f7f-8a73-4a28-b51c-33322c13e858',Uploaded:true,URL:'wwwroot/temp/dca94f7f-8a73-4a28-b51c-33322c13e858.png'},
        {Id:7,Name:'anh-7.jpg',Size:12456,Type:'.jpg',NameGUID:'f0d4e149-8fb4-4102-8851-426154e34cb3',Uploaded:true,URL:'wwwroot/temp/f0d4e149-8fb4-4102-8851-426154e34cb3.png'},
        {Id:8,Name:'anh-8.jpg',Size:12456,Type:'.jpg',NameGUID:'fb092759-ab59-493f-b2c5-97d4f76312bd',Uploaded:true,URL:'wwwroot/temp/fb092759-ab59-493f-b2c5-97d4f76312bd.png'}
      ]};
    }
  }
  formatFormContent() {
    if ($(".form-content") != null && $(".form-content").length > 0) {
      $(".form-content").css({ "height": $(window).height() - 215 });
    }
  }
  formatXemPhieuIn() {
    if ($("#iframeXemPhieuIn") != null && $("#iframeXemPhieuIn").length > 0) {
      $("#iframeXemPhieuIn").css({ "height":$(window).width()>575? $(window).height() - 370 : 400 });
    }
  }
  dichVuChange(_event:any)
  {
    this.contentIn=this.getContentIn();

  }
  
  getContentIn(){
    var url=document.location.protocol +'//'+ document.location.hostname+(document.location.port!=null?":"+document.location.port:"") ;
    var Logo=url+"/assets/img/logo.png";
    var MaBarcode=this.lichSuCDHAVo.MaTiepNhan;
    var BarCodeImgBase64="iVBORw0KGgoAAAANSUhEUgAAAJYAAAAeCAYAAADO4udXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARiSURBVHhezY5BigQwEALn/5/eRZgCEQ0E5pCCoK0e8vkxf98nUEHeMshNdo7vxMm3Lffy4uZenfdo6/CwenxmaOZ4aBsU/yTt04K8ZZCb7BzfiZNvW+7lxc29Ou/R1uFh9fjM0Mzx0DYo/knapwV5yyA32Tm+EyffttzLi5t7dd6jrcPD6vGZoZnjoW1Q/JO0TwvylkFusnN8J06+bbmXFzf36rxHW4eH1eMzQzPHQ9ug+CdpnxbkLYPcZOf4Tpx823IvL27u1XmPtg4Pq8dnhmaOh7ZB8U/SPi3IWwa5yc7xnTj5tuVeXtzcq/MebR0eVo/PDM0cD22D4p+kfVqQtwxyk53jO3Hybcu9vLi5V+c92jo8rB6fGZo5HtoGxT9J+7QgbxnkJjvHd+Lk25Z7eXFzr857tHV4WD0+MzRzPLQNin+S9mlB3jLITXaO78TJty338uLmXp33aOvwsHp8ZmjmeGgbFP8k7dOCvGWQm+wc34mTb1vu5cXNvTrv0dbhYfX4zNDM8dA2KP5J2qcFecsgN9k5vhMn37bcy4ube3Xeo63Dw+rxmaGZ46FtUPyTtE8L8pZBbrJzfCdOvm25lxc39+q8R1uHh9XjM0Mzx0PboPgnaZ8W5C2D3GTn+E6cfNtyLy9u7tV5j7YOD6vHZ4Zmjoe2QfFP0j4tyFsGucnO8Z04+bblXl7c3KvzHm0dHlaPzwzNHA9tg+KfpH1akLcMcpOd4ztx8m3Lvby4uVfnPdo6PKwenxmaOR7aBsU/Sfu0IG8Z5CY7x3fi5NuWe3lxc6/Oe7R1eFg9PjM0czy0DYp/kvZpQd4yyE12ju/Eybct9/Li5l6d92jr8LB6fGZo5nhoGxT/JO3TgrxlkJvsHN+Jk29b7uXFzb0679HW4WH1+MzQzPHQNij+SdqnBXnLIDfZOb4TJ9+23MuLm3t13qOtw8Pq8ZmhmeOhbVD8k7RPC/KWQW6yc3wnTr5tuZcXN/fqvEdbh4fV4zNDM8dD26D4J2mfFuQtg9xk5/hOnHzbci8vbu7VeY+2Dg+rx2eGZo6HtkHxT9I+LchbBrnJzvGdOPm25V5e3Nyr8x5tHR5Wj88MzRwPbYPin6R9WpC3DHKTneM7cfJty728uLlX5z3aOjysHp8Zmjke2gbFP0n7tCBvGeQmO8d34uTblnt5cXOvznu0dXhYPT4zNHM8tA2Kf5L2aUHeMshNdo7vxMm3Lffy4uZenfdo6/CwenxmaOZ4aBsU/yTt04K8ZZCb7BzfiZNvW+7lxc29Ou/R1uFh9fjM0Mzx0DYo/knapwV5yyA32Tm+EyffttzLi5t7dd6jrcPD6vGZoZnjoW1Q/JO0TwvylkFusnN8J06+bbmXFzf36rxHW4eH1eMzQzPHQ9ug+CdpnxbkLYPcZOf4Tpx823IvL27u1XmPtg4Pq8dnhmaOh7ZB8U/SPi3IWwa5yc7xnTj5tuVeXtzcq/MebR0eVo/PDM0cD22D4n/A5/MPJN946l7H2RkAAAAASUVORK5CYII=";
    var MaBenhNhan=this.lichSuCDHAVo.MaNguoiBenh;
    var TenKetQuaLabel="KẾT QUẢ";
    var TenKetQua=this.lichSuCDHAVo.TenKetQua;
    var HoTen=this.lichSuCDHAVo.HoTen;
    var NamSinh=this.lichSuCDHAVo.NamSinh;
    var GioiTinh=this.lichSuCDHAVo.GioiTinh;
    var DiaChi=this.lichSuCDHAVo.DiaChi;
    var SoBenhAn=this.lichSuCDHAVo.MaTiepNhan;
    var BacSiChiDinh="";
    var NgayChiDinh=this.lichSuCDHAVo.NgayChiDinh;
    var NoiChiDinh=this.lichSuCDHAVo.NoiChiDinh;
    var NoiThucHien=this.lichSuCDHAVo.NoiThucHien;
    var ChanDoan=this.lichSuCDHAVo.ChanDoan;
    var DienGiai=this.lichSuCDHAVo.DienGiai;
    var TenChiDinhDichVu=this.lichSuCDHAVo.DichVu;
    var KyThuat=this.lichSuCDHAVo.TenKyThuat;
    var KetQua=this.lichSuCDHAVo.NoiDungKetQua;
    var KetLuan=this.lichSuCDHAVo.NoiDungKetLuan;
    var HinhAnh="";
    if(this.lichSuCDHAVo.HinhAnhDinhKems.length>0)
    {
      this.lichSuCDHAVo.HinhAnhDinhKems.forEach(element => {
        if(element.Src==undefined)
        {
          this.http.post(
            `${environment.api_url}/Common/DownloadFile`,
            {url:element.URL},
            {responseType: 'blob'}
          ).subscribe((resultData:any)=>{
            if (resultData !== undefined && resultData != null) {              
              const downloadedFile = new Blob([resultData]);
              element.Src=URL.createObjectURL(downloadedFile);
            }
          });
        }
        HinhAnh+="<img src='"+element.Src+"' alt='' style='width:calc(25% - 10px);margin:5px;'/>";
      });
    }
    var Ngay=25;
    var Thang=10;
    var Nam=2022;
    var HocViBacSi="BS";
    var BacSiChuyenKhoa="Nguyễn VĂn A";
    return "<style>table,td,th{border-collapse:collapse;font-family:Times New Roman}p{margin:5px}h3{margin:10px 0}ol,ul{margin:5px 0}td,th{padding:1px 2px}td p{margin:0}.container{display:flex;flex-flow:row wrap;align-content:flex-start;width:100%;min-height:50px}.image{flex:0 0 25%;margin:5px}img{max-width:100%}.tbl-content-ket-qua{width:100%;border-collapse:collapse}.k-table.border td,.k-table.border th{border:1px solid #000}.line_bottom{border:1px #333 solid;margin-bottom:20px}.round-sttNhanVien{top:20px;position:absolute;min-width:60px;max-width:120px;text-decoration:none;display:inline-block;outline:0;cursor:pointer;border-style:none;border:2px solid;background-color:#fff;color:#333;font-size:16px;border-radius:100%;overflow:none;text-align:center;padding:0;font-weight:700}.round-sttNhanVien:before{content:'';display:inline-block;vertical-align:middle;padding-top:100%}</style><div><div style='width:100%'><table width='100%'><tbody><tr><td><img src='"+Logo+"' style='height:85px' alt='lo-go'></td><td style='padding-left:50px'><div style='text-align:center;float:right'><img style='height:40px' src='data:image/png;base64,"+BarCodeImgBase64+"'><br><p style='margin:0;padding:0'>"+MaBarcode+"-"+MaBenhNhan+"</p></div></td></tr></tbody></table></div></div><table style='padding:5px;width:100%'><th><span style='font-size:28'>"+TenKetQuaLabel+" "+TenKetQua+"</span><br></th></table><div style='padding-left:20px'><br><table style='width:100%'><tbody><tr><td colspan='2'>Họ và tên: <b>"+HoTen+"</b></td><td>Năm sinh: "+NamSinh+"</td><td>Giới tính: "+GioiTinh+"</td></tr><tr><td colspan='3'>Địa chỉ: "+DiaChi+"</td><td>Số bệnh án: "+SoBenhAn+"</td></tr><tr><td colspan='2'>BS.chỉ định: "+BacSiChiDinh+"</td><td colspan='2'>Ngày chỉ định: "+NgayChiDinh+"</td></tr><tr><td colspan='2'>Nơi chỉ định: "+NoiChiDinh+"</td><td colspan='2'>Nơi thực hiện: "+NoiThucHien+"</td></tr><tr><td colspan='2'>Chẩn đoán: "+ChanDoan+"</td><td colspan='2'>Diễn giải: "+DienGiai+"</td></tr><tr><td colspan='4'>Chỉ định: "+TenChiDinhDichVu+"</td></tr></tbody></table><br><div class='line_bottom'></div><h3 style=''><u>KỸ THUẬT</u></h3><div>"+KyThuat+"</div><h3><u>KẾT QUẢ</u></h3><div id='ket-qua'>"+KetQua+"</div><h3><u>KẾT LUẬN</u></h3><div><b>"+KetLuan+"</b></div><div>"+HinhAnh+"</div><table style='width:100%'><tr><th width='25%'><b></b></th><th width='25%'><b></b></th><th width='20%'><b></b></th><th style='font-weight:400'>Ngày "+Ngay+" tháng "+Thang+" năm "+Nam+"<br>Bs Chuyên Khoa</th></tr><tr><td style='text-align:center'><i></i></td><td style='text-align:center'><i></i></td><td style='text-align:center'><i></i></td><td style='text-align:center'><div style='margin-top:40px'>"+HocViBacSi+" "+BacSiChuyenKhoa+"</div></td></tr></table></div>";
  }

  selectedIndexChange(event:number){
    this.tabActiveIndex=event;
  }
  quayLai(){
    this.quayLaiChange.emit(true);
  }
  moNhapKetQuaLai(){
    this.dialog.open(ConfirmComponent, {
      disableClose: false,
      width: '400px',
      data: { message:"Bạn chắc chắn muốn mở lại để nhập kết quả cho người bệnh này không?" ,yesColor:"warn"  }
  }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
      if (result) {
         
      }
  });
  }

}
