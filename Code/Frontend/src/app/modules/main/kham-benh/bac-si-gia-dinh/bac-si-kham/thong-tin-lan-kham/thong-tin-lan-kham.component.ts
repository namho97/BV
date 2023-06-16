import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thong-tin-lan-kham',
  templateUrl: './thong-tin-lan-kham.component.html',
  styleUrls: ['./thong-tin-lan-kham.component.scss']
})
export class ThongTinLanKhamComponent implements OnInit {

  @Input() data:any;
  constructor() { }

  ngOnInit() {
  }

}
