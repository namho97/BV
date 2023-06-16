import { AfterViewInit, Component, OnInit,  ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
declare let $: any;

@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class TrangChuComponent implements OnInit,AfterViewInit {
  
  startDate:Date=new Date();
  endDate:Date=new Date();
  constructor() {
  }

  ngOnInit() {
    this.initDoanhThu();
    this.initTinhTrangKham();
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
    if (document.hidden) {
    } else {
      //this.gridChild.search();
    }
  }

  //#region Chart TÌnh Trang KHám
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  chartDataLabels=[ChartDataLabels];
  barChartOptions: ChartConfiguration['options'] = {
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
      legend: { display: true }
    }
  };
  barChartLabels: string[] = [ 'Khám nội', 'Khám ngoại', 'Khám phụ sản', 'Khám nhi', 'Khám mắt', 'Khám răng', 'Khám da liễu' ];
  barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Chưa khám', backgroundColor: "#ef9a9a",hoverBackgroundColor:"#ffcccb"},
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Đang khám',backgroundColor:"#ffe082",hoverBackgroundColor:"#ffffb3" },
      { data: [ 1, 12, 25, 20, 75, 56, 45 ], label: 'Đã khám',backgroundColor:"#a5d6a7",hoverBackgroundColor:"#d7ffd9" }
    ]
  };
  initTinhTrangKham(){
    this.formatChartHeight();
  }
  
  formatChartHeight() {
    if ($(".chart-tinh-trang-kham") != null && $(".chart-tinh-trang-kham").length > 0) {
      $(".chart-tinh-trang-kham").css({ "height":$(window).width()>575? $(window).height() - 483 : 400 });
    }
  }
  // events
  chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  //#endregion

  //#region Doanh thu
  
  initDoanhThu(){
    this.formatChartDoanhThuHeight();
  }
  formatChartDoanhThuHeight() {
    if ($(".chart-doanh-thu") != null && $(".chart-doanh-thu").length > 0) {
      $(".chart-doanh-thu").css({ "height":$(window).width()>575? $(window).height() - 160 : 400 });
    }
  }
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
      legend: { display: true }
    }
  };
  barChartDoanhThuLabels: string[] = [ '01/08/2022', '02/08/2022', '03/08/2022', '04/08/2022', '05/08/2022', '06/08/2022', '07/08/2022' ];
  barChartDoanhThuType: ChartType = 'bar';

  barChartDoanhThuData: ChartData<'bar'> = {
    labels: this.barChartDoanhThuLabels,
    datasets: [
      { data: [ 65000000, 59000000, 80000000, 81000000, 56000000, 55000000, 40000000 ], label: 'Doanh thu', backgroundColor:"#a5d6a7",hoverBackgroundColor:"#d7ffd9" }
    ]
  };
  // events
  chartDoanhThuClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  chartDoanhThuHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  randomizeDoanhThu(): void {
    this.barChartDoanhThuType = this.barChartDoanhThuType === 'bar' ? 'line' : 'bar';
  }

  //#endregion
}
