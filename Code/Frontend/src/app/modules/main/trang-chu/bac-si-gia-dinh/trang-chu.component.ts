import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { AfterViewInit, Component,  OnInit } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData, ChartEvent, Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { LichHenKhamChiTietComponent } from './lich-hen-kham-chi-tiet/lich-hen-kham-chi-tiet.component';
import { DoanhThuGanDayChiTietComponent } from './doanh-thu-gan-day-chi-tiet/doanh-thu-gan-day-chi-tiet.component';
import { TinhTrangKhamChiTietComponent } from './tinh-trang-kham-chi-tiet/tinh-trang-kham-chi-tiet.component';
declare let $: any;

@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class TrangChuComponent implements OnInit,AfterViewInit {
  
  timKiemModel: any = {};
  constructor(private apiService:ApiService,private dialog:MatDialog) {
  }

  ngOnInit() {
    var now=new Date();
    this.timKiemModel.TuNgay=new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
    this.timKiemModel.DenNgay=new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);
    this.getDataChiTietTiepNhan();
    this.initDoanhThu();
    this.initTinhTrangKham();
    this.initLichHenKham();
  }

  ngAfterViewInit() { 
    this.formatContent();
  }

  ngOnDestroy(): void {
    document.removeEventListener('visibilitychange', this.visibilityChangeCallback, true);
  }

  //#region format content
  formatContent() {
    if ($(".grid-content") != null && $(".grid-content").length > 0) {
      $(".grid-content").css({ "height":$(window).width()>575? $(window).height() - 81 : $(window).height() - 81 });
    }
  }
  //#endregion

  visibilityChangeCallback = () => {
    // if (document.hidden) {
    // } else {
    //   //this.gridChild.search();
    // }
  }
  timKiem(){
    this.getDataChiTietTiepNhan();
    this.initDoanhThu();
    this.initTinhTrangKham();
    this.initLichHenKham();
  }
  //#region chi tiết tiếp nhận
  chiTietTiepNhanVo:any={};
  getDataChiTietTiepNhan(){
    //this.showPopupLoadingData();
    this.apiService.post("TrangChuBacSiGiaDinh/GetDataChiTietTiepNhan",this.timKiemModel).subscribe((result:any)=>{
      this.chiTietTiepNhanVo=result;
      this.closePopupLoadingData();
    },(err:any) => {
      console.log(err);
      this.closePopupLoadingData();
    });

  }
  //#endregion chi tiết tiếp nhận
  //#region Chart TÌnh Trang KHám
  chartTinhTrangKhamDataLabels=[ChartDataLabels];
  pieChartTinhTrangKhamOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { 
        display: false,
        position: 'top' 
      },
      datalabels: {
        formatter: (_value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex] +"\r\n"+ctx.chart.data.datasets[0].data[ctx.dataIndex];
          }
        },
      }
    },
    onClick:(event:any,active:any)=>{
      var trangThai= event.chart.data.labels[active[0].index];
      
      this.dialog.open(TinhTrangKhamChiTietComponent,{
        disableClose: true,
        width: ($(window).width()-50>1700?1700:$(window).width()-50)+"px",
        data: { TrangThai: trangThai,TuNgay:this.timKiemModel.TuNgay,DenNgay:this.timKiemModel.DenNgay }
      }).afterClosed().subscribe(_result => {/* result is a boolean:true,false,null*/
       });
    }
  };
  pieChartTinhTrangKhamLabels: string[] = [ ];
  pieChartTinhTrangKhamType: ChartType = 'pie';
  pieChartTinhTrangKhamData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieChartTinhTrangKhamLabels,
    datasets: [
      {data:[]}
    ]
  };
  chartTinhTrangKham:any={};
  initTinhTrangKham(){
    //this.formatChartHeight();
    var self=this;
    setTimeout(function(){      
      self.getDataTinhTrangKham();
    });
  }
  
  getDataTinhTrangKham(){
    //this.showPopupLoadingData();
    this.apiService.post("TrangChuBacSiGiaDinh/GetDataTinhTrangKham",this.timKiemModel).subscribe((result:any)=>{
      this.pieChartTinhTrangKhamLabels=result.TrangThais;
      this.pieChartTinhTrangKhamData.datasets[0].data=result.SoLuongs;
      this.pieChartTinhTrangKhamData.labels=result.TrangThais;
      this.chartTinhTrangKham.type=this.pieChartTinhTrangKhamType;
      if(this.chartTinhTrangKham.chart!=null)
      {
        this.chartTinhTrangKham.chart.destroy();
      }
      this.chartTinhTrangKham.chart= new Chart("chartTinhTrangKham",{
        type:this.pieChartTinhTrangKhamType,
        data:this.pieChartTinhTrangKhamData,
        plugins:this.chartTinhTrangKhamDataLabels,
        options:this.pieChartTinhTrangKhamOptions  
      });
      this.closePopupLoadingData();
    },(err:any) => {
      console.log(err);
      this.closePopupLoadingData();
    });

  }
  formatChartHeight() {
    if ($(".chart-tinh-trang-kham") != null && $(".chart-tinh-trang-kham").length > 0) {
      $(".chart-tinh-trang-kham").css({ "height":$(window).width()>575? $(window).height() - 483 : 400 });
    }
  }
  // events
  chartClicked(event?: any, active?: any): void {
    var tinhTrangKham= event.chart.data.labels[active[0].index];
    console.log(tinhTrangKham)
  }

  chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    event;active;
  }

  randomize(): void {
    this.pieChartTinhTrangKhamType = this.pieChartTinhTrangKhamType === 'pie' ? 'line' : 'pie';
  }

  //#endregion

  //#region Doanh thu
  
  barChartDoanhThuOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio:0.1,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero:true
      }
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        formatter: (_value, ctx) => {
          if (ctx.chart.data.datasets) {
            return new Intl.NumberFormat('vi-VN').format(Number(ctx.chart.data.datasets[0].data[ctx.dataIndex]));
          }
        },
      }
    },
    onClick:(event:any,active:any)=>{
      var ngayThu= event.chart.data.labels[active[0].index];
      
      this.dialog.open(DoanhThuGanDayChiTietComponent,{
        disableClose: true,
        width: ($(window).width()-50>1700?1700:$(window).width()-50)+"px",
        data: { NgayThu: ngayThu }
      }).afterClosed().subscribe(_result => {/* result is a boolean:true,false,null*/
       });
    }
  };
  barChartDoanhThuDataLabels=[ChartDataLabels];
  barChartDoanhThuLabels: string[] = [ ];
  barChartDoanhThuType: ChartType = 'bar';

  barChartDoanhThuData: ChartData<'bar'> = {
    labels: this.barChartDoanhThuLabels,
    datasets: [
      { data: [  ], label: 'Tổng doanh thu', backgroundColor:"#a5d6a7",hoverBackgroundColor:"#d7ffd9" }
    ]
  };
  chartDoanhThuGanDay:any={};
  initDoanhThu(){
    this.formatChartDoanhThuHeight();
    var self=this;
    setTimeout(function(){      
      self.getDataDoanhThuGanDay();
    });
  }
  getDataDoanhThuGanDay(){
    //this.showPopupLoadingData();
    this.apiService.post("TrangChuBacSiGiaDinh/GetDataDoanhThuGanDay",this.timKiemModel).subscribe((result:any)=>{
      this.barChartDoanhThuLabels=result.NgayThus;
      this.barChartDoanhThuData.datasets[0].data=result.SoTiens;
      this.barChartDoanhThuData.labels=result.NgayThus;
      this.chartDoanhThuGanDay.type=this.barChartDoanhThuType;
      if(this.chartDoanhThuGanDay.chart!=null)
      {
        this.chartDoanhThuGanDay.chart.destroy();
      }
      this.chartDoanhThuGanDay.chart= new Chart("chartDoanhThuGanDay",{
        type:this.barChartDoanhThuType,
        data:this.barChartDoanhThuData,
        plugins:this.barChartDoanhThuDataLabels,
        options:this.barChartDoanhThuOptions  
      });
      this.closePopupLoadingData();
    },(err:any) => {
      console.log(err);
      this.closePopupLoadingData();
    });

  }
  formatChartDoanhThuHeight() {
    if ($(".chart-doanh-thu") != null && $(".chart-doanh-thu").length > 0) {
      $(".chart-doanh-thu").css({ "height":$(window).width()>575? $(window).height() - 160 : 400 });
    }
  }
  // events
  chartDoanhThuClicked(event?: any, active?: any): void {
    var ngayThu= event.chart.data.labels[active[0].index];
    console.log(ngayThu)
  }

  chartDoanhThuHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    event;active;
  }

  randomizeDoanhThu(): void {
    this.barChartDoanhThuType = this.barChartDoanhThuType === 'bar' ? 'line' : 'bar';
  }

  //#endregion

  //#region LỊch hẹn khám
  
  barChartLichHenKhamOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio:0.1,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero:true
      }
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        formatter: (_value, ctx) => {
          if (ctx.chart.data.datasets) {
            return ctx.chart.data.datasets[0].data[ctx.dataIndex];
          }
        },
      }
    },
    onClick:(event:any,active:any)=>{
      var ngayHenKham= event.chart.data.labels[active[0].index];
      
      this.dialog.open(LichHenKhamChiTietComponent,{
        disableClose: true,
        width: ($(window).width()-50>1700?1700:$(window).width()-50)+"px",
        data: { NgayHenKham: ngayHenKham }
      }).afterClosed().subscribe(_result => {/* result is a boolean:true,false,null*/
       });
    }
  };
  barChartLichHenKhamDataLabels=[ChartDataLabels];
  barChartLichHenKhamLabels: string[] = [ ];
  barChartLichHenKhamType: ChartType = 'bar';

  barChartLichHenKhamData: ChartData<'bar'> = {
    labels: this.barChartLichHenKhamLabels,
    datasets: [
      { data: [ ], label: 'Tổng người bệnh', backgroundColor:"#b39ddb",hoverBackgroundColor:"#e6ceff" }
    ]
  };
  chartLichHenKham:any={};
  
  
  initLichHenKham(){
    this.formatChartLichHenKhamHeight();
    var self=this;
    setTimeout(function(){      
      self.getDataLichHenKham();
    });
  }
  formatChartLichHenKhamHeight() {
    if ($(".chart-lich-hen-kham") != null && $(".chart-lich-hen-kham").length > 0) {
      $(".chart-lich-hen-kham").css({ "height":$(window).width()>575? $(window).height() - 536 : 400 });
    }
  }
  getDataLichHenKham(){
    this.showPopupLoadingData();
    this.apiService.post("TrangChuBacSiGiaDinh/GetDataLichHenKham",this.timKiemModel).subscribe((result:any)=>{
      this.barChartLichHenKhamLabels=result.NgayHenKhams;
      this.barChartLichHenKhamData.datasets[0].data=result.SoLuongs;
      this.barChartLichHenKhamData.labels=result.NgayHenKhams;
      if(this.chartLichHenKham.chart!=null)
      {
        this.chartLichHenKham.chart.destroy();
      }
      this.chartLichHenKham.chart= new Chart("chartLichHenKham",{
        type:this.barChartLichHenKhamType,
        data:this.barChartLichHenKhamData,
        plugins:this.barChartLichHenKhamDataLabels,
        options:this.barChartLichHenKhamOptions  
      });
      this.closePopupLoadingData();
    },(err:any) => {
      console.log(err);
      this.closePopupLoadingData();
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
  // events
  chartLichHenKhamClicked(event?: any, active?: any): void {
    var ngayHenKham= event.chart.data.labels[active[0].index];
    this.dialog.open(LichHenKhamChiTietComponent,{
      disableClose: true,
      width: ($(window).width()-50>1500?1500:$(window).width()-50)+"px",
      data: { NgayHenKham: ngayHenKham }
    })
  }

  chartLichHenKhamHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    event;active;
  }

  randomizeLichHenKham(): void {
    this.barChartLichHenKhamType = this.barChartLichHenKhamType === 'bar' ? 'line' : 'bar';
  }

  //#endregion
}
