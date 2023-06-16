import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lich-su-kham-chi-tiet-kham-benh',
  templateUrl: './lich-su-kham-chi-tiet-kham-benh.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet-kham-benh.component.scss']
})
export class LichSuKhamChiTietKhamBenhComponent implements OnInit {

  @Input() data:any;
  constructor() { }

  ngOnInit() {
    this.getThongTinKhamBenh();
  }
  getThongTinKhamBenh(){
    this.data.KhamBenh= {
      CoHenTaiKham:true,
      KhamKhacs:[{Id:0,BoPhan:"",MoTa:""}],
      TienSuBenhs:[{LoaiTienSuBenh:"Bản thân",TenBenhTienSu:"Lao"},{LoaiTienSuBenh:"Gia đình",TenBenhTienSu:"Ho gà"}],
      DiUngs:[{LoaiDiUng:"Thuốc",TenDiUng:"Viêm da",BieuHienDiUng:"NỔi ửng đỏ",MucDoDiUng:"Nặng"}],
      ChiSoSinhTons:[{Id:0}]
    };
  }

}
