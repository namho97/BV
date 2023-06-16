import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lich-su-kham-chi-tiet-thong-tin-hanh-chinh',
  templateUrl: './lich-su-kham-chi-tiet-thong-tin-hanh-chinh.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet-thong-tin-hanh-chinh.component.scss']
})
export class LichSuKhamChiTietThongTinHanhChinhComponent implements OnInit {

  @Input() data:any;
  constructor() { }

  ngOnInit() {
  }

}
