import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nguoi-benh-dang-kham-thong-tin-hanh-chinh',
  templateUrl: './nguoi-benh-dang-kham-thong-tin-hanh-chinh.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-thong-tin-hanh-chinh.component.scss']
})
export class NguoiBenhDangKhamThongTinHanhChinhComponent implements OnInit {

  @Input() data:any;
  constructor() { }

  ngOnInit() {
    this.getThongTinhHanhChinh();
  }
  getThongTinhHanhChinh(){
    this.data.ThongTinhHanhChinh={

    };
  }
}
