import { ChangeDetectorRef, Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-duoc-pham',
  templateUrl: './duoc-pham.component.html',
  styleUrls: ['./duoc-pham.component.scss']
})
export class DuocPhamComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableDuocPham", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initDuocPham();
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
  duocPhamQueryInfo:any={};
  duocPhamSearching:boolean=false;
  columnsDuocPham: TableColumn<any>[] = [];
  groupByColumnsDuocPham: string[] = [];
  sortByColumnDuocPham: SortDescriptor = { field: 'Ma', dir: 'desc' };
  documentTypeDuocPham: DocumentType;

  initDuocPham() {
    this.documentTypeDuocPham = DocumentType.QuanTriNhomDuocPhamDuocPham;
    this.columnsDuocPham = [
      { label: 'Mã', property: 'Ma', type: 'text', width: 78, visible: true,isLink:true,sticky:true },
      { label: 'Tên', property: 'Ten', type: 'text', minWidth: 150, visible: true,isLink:true,sticky:true },
      { label: 'Hàm lượng', property: 'HamLuong', type: 'text', width: 100, visible: true },
      { label: 'Hoạt chất', property: 'HoatChat', type: 'text',width:100, visible: true },
      { label: 'DVT', property: 'DonViTinh', type: 'text',width:80, visible: true },
      { label: 'Đường dùng', property: 'DuongDung', type: 'text',width:100, visible: true },
      { label: 'Quy cách', property: 'QuyCachDongGoi', type: 'text',width:120, visible: true },
      { label: 'Nhà sản xuất', property: 'NhaSanXuat', type: 'text',width:100, visible: true },
      { label: 'Nước sản xuất', property: 'NuocSanXuat', type: 'text',width:100, visible: true },
      
    ];

  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.duocPhamQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.duocPhamSearching=true;
  }
  huyTimKiem(){
    this.duocPhamQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.duocPhamSearching=false;
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
