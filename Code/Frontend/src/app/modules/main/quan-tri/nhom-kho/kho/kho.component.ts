import { ChangeDetectorRef, Component, OnInit,ViewChild,TemplateRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';


@Component({
  selector: 'app-kho',
  templateUrl: './kho.component.html',
  styleUrls: ['./kho.component.scss']
})
export class KhoComponent implements OnInit {
  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableKho", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initKho();
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
  khoQueryInfo:any={};
  khoSearching:boolean=false;
  columnsKho: TableColumn<any>[] = [];
  groupByColumnsKho: string[] = [];
  sortByColumnKho: SortDescriptor = { field: 'TenKho', dir: 'desc' };
  documentTypeKho: DocumentType;

  initKho() {
    this.documentTypeKho = DocumentType.QuanTriNhomKhoKho;
    this.columnsKho = [
      { label: 'Tên kho', property: 'TenKho', type: 'text', width: 78, visible: true,isLink:true,sticky:true },
      { label: 'Khoa', property: 'KhoaPhong', type: 'text', width: 150, visible: true,isLink:true,sticky:true },
      { label: 'Phòng', property: 'PhongBenhVien', type: 'text', minWidth: 100, visible: true },
      { label: 'Loại kho', property: 'LoaiKho', type: 'text',width:150, visible: true  },
      { label: 'Kho chứa', property: 'KhoChua', type: 'text',width:150, visible: true  },
      { label: 'Kho mặc định', property: 'KhoMacDinh', type: 'text',width:150, visible: true  },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];

  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.khoQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.khoSearching=true;
  }
  huyTimKiem(){
    this.khoQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.khoSearching=false;
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
