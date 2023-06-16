import { ChangeDetectorRef, Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-don-vi-hanh-chinh',
  templateUrl: './don-vi-hanh-chinh.component.html',
  styleUrls: ['./don-vi-hanh-chinh.component.scss']
})
export class DonViHanhChinhComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  columnsTinhThanh: TableColumn<any>[] = [];
  columnsQuanHuyen: TableColumn<any>[] = [];
  columnsPhuongXa: TableColumn<any>[] = [];
  columnsKhomAp: TableColumn<any>[] = [];

  @ViewChild("tabledDonViHanhChinh", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initDonViHanhChinh();
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
  donViHanhChinhQueryInfo:any={};
  donViHanhChinhSearching:boolean=false;
  columnsDonViHanhChinh: TableColumn<any>[] = [];
  groupByColumnsDonViHanhChinh: string[] = [];
  sortByColumnDonViHanhChinh: SortDescriptor = { field: 'Ma', dir: 'asc' };
  documentTypeDonViHanhChinh: DocumentType;

  initDonViHanhChinh() {
    this.documentTypeDonViHanhChinh = DocumentType.QuanTriNhomHanhChinhDonViHanhChinh;
    this.columnsTinhThanh = [
      { label: 'Mã đơn vị', property: 'Ma', type: 'text', width: 100, visible: true, isLink: true, sortable: true },
      { label: 'Tên viết tắt', property: 'TenVietTat', type: 'text', width: 100, visible: true },
      { label: 'Tên đơn vị', property: 'Ten', type: 'text', minWidth: 350, visible: true },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];
    this.columnsQuanHuyen = [
      { label: 'Mã đơn vị', property: 'Ma', type: 'text', width: 100, visible: true, isLink: true, sortable: true },
      { label: 'Tên viết tắt', property: 'TenVietTat', type: 'text', width: 100, visible: true },
      { label: 'Tên đơn vị', property: 'Ten', type: 'text', minWidth: 350, visible: true },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];
    this.columnsPhuongXa = [
      { label: 'Mã đơn vị', property: 'Ma', type: 'text', width: 100, visible: true, isLink: true, sortable: true },
      { label: 'Tên viết tắt', property: 'TenVietTat', type: 'text', width: 100, visible: true },
      { label: 'Tên đơn vị', property: 'Ten', type: 'text', minWidth: 350, visible: true },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];
    this.columnsKhomAp = [
      { label: 'Mã đơn vị', property: 'Ma', type: 'text', width: 100, visible: true, isLink: true, sortable: true },
      { label: 'Tên viết tắt', property: 'TenVietTat', type: 'text', width: 100, visible: true },
      { label: 'Tên đơn vị', property: 'Ten', type: 'text', minWidth: 350, visible: true },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];

  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.donViHanhChinhQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.donViHanhChinhSearching=true;
  }
  huyTimKiem(){
    this.donViHanhChinhQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.donViHanhChinhSearching=false;
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
  //#region actions
  extDataItemSelected(event)
  {
    this.dataChon = event;
    this.cdref.detectChanges();

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
  //#endregion actions

}
