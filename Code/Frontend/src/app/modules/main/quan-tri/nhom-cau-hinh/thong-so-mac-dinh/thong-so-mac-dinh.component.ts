import { ChangeDetectorRef, Component, OnInit,ViewChild,TemplateRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';


@Component({
  selector: 'app-thong-so-mac-dinh',
  templateUrl: './thong-so-mac-dinh.component.html',
  styleUrls: ['./thong-so-mac-dinh.component.scss']
})
export class ThongSoMacDinhComponent implements OnInit {
  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableThongSoMacDinh", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute,) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initThongSoMacDinh();
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
  @ViewChild('trangThaiTemplate', { static: true }) trangThaiTemplate: TemplateRef<any>;
  thongSoMacDinhQueryInfo:any={};
  thongSoMacDinhSearching:boolean=false;
  columnsThongSoMacDinh: TableColumn<any>[] = [];
  groupByColumnsThongSoMacDinh: string[] = ['TenLoaiCauHinh'];
  sortByColumnThongSoMacDinh: SortDescriptor = { field: 'Description', dir: 'desc' };
  documentTypeThongSoMacDinh: DocumentType;

  initThongSoMacDinh() {
    this.documentTypeThongSoMacDinh = DocumentType.QuanTriNhomCauHinhThongSoMacDinh;
    this.columnsThongSoMacDinh = [
      { label: 'Mô tả', property: 'Description', type: 'text', minWidth: 400, visible: true,isLink:true,sticky:true },
      // { label: 'Tên loại cấu hình', property: 'TenLoaiCauHinh', type: 'text', width: 200, visible: true,isLink:true,sticky:true },
      //{ label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];
  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.thongSoMacDinhQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.thongSoMacDinhSearching=true;
  }
  huyTimKiem(){
    this.thongSoMacDinhQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.thongSoMacDinhSearching=false;
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
