import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { AccessUser } from 'src/app/shared/models/access-user.model';
declare let $: any;

@Component({
  selector: 'app-huong-dan-su-dung',
  templateUrl: './huong-dan-su-dung.component.html',
  styleUrls: ['./huong-dan-su-dung.component.scss']
})
export class HuongDanSuDungComponent implements OnInit {

  id: number = null;
  loaiView:number=2;
  accessUser:AccessUser;
  loaiUserSystem:boolean = false;
  dataChon: any;
  hideLeft:boolean=false;
  bacSiKhamQueryInfo:any={};
  bacSiKhamSearching:boolean=false;
  columns: TableColumn<any>[] = [];
  dataSource: any;
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor = { field: 'SoThuTu', dir: 'asc' };
  documentType: DocumentType;
  @ViewChild('table', { static: true }) table: TableComponent;

  constructor(private route: ActivatedRoute,private authService: AuthService) { 
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.init();
    this.formatMiddle();

    this.accessUser=this.authService.getAccessUser();
    if(this.accessUser.Id == 1){
     this.loaiUserSystem = true;
    }else{
      this.loaiUserSystem = false;
    }
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.id != null) {
      var self=this;
      setTimeout(function(){
        self.table.view(self.id);
      });
    }
  }
  formatMiddle(){
   if ($(".middle") != null && $(".middle").length > 0) {
    $(".middle").css({ "height": $(window).height()-93+'px'});
   }
  }
  init() {
    this.documentType = DocumentType.HuongDanSuDungBacSiGiaDinh;
    this.columns = [
      { label: 'STT', property: 'SoThuTu', type: 'text', width: 50, visible: true},
      { label: 'TÊN', property: 'Ten', type: 'text', minWidth: 212, visible: true ,isLink:true},
      { label: '', property: 'Action', type: 'text', width: 50, visible: true,useActionDefault:true }
    ];
  }
  extDataItemSelected(event)
  {
    this.dataChon = event;
  }
  quayLaiChange() {
    this.dataChon = null;
    this.table.back();
  }
  quayLaiVaTaiLaiChange(){
    this.dataChon = null;
    this.table.back();
    this.table.refresh();
  }
  dataChange(event) {
    if (event) {
      this.table.search();
    }
  }
  
  chon(event:any){
    this.loaiView = event.value;
  }
}
