import { ChangeDetectorRef, Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';


@Component({
  selector: 'app-nha-cung-cap',
  templateUrl: './nha-cung-cap.component.html',
  styleUrls: ['./nha-cung-cap.component.scss']
})
export class NhaCungCapComponent implements OnInit {

 
  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableNhaCungCap", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute
    ) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initNhaCungCap();
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
  nhaCungCapQueryInfo:any={};
  nhaCungCapSearching:boolean=false;
  columnsNhaCungCap: TableColumn<any>[] = [];
  groupByColumnsNhaCungCap: string[] = [];
  sortByColumnNhaCungCap: SortDescriptor = { field: 'Ten', dir: 'desc' };
  documentTypeNhaCungCap: DocumentType;

  initNhaCungCap() {
    this.documentTypeNhaCungCap = DocumentType.QuanTriNhomKhoNhaCungCap;
    this.columnsNhaCungCap = [
      { label: 'TÊN', property: 'Ten', type: 'text', width: 78, visible: true,isLink:true,sticky:true },
      { label: 'ĐỊA CHỈ', property: 'DiaChi', type: 'text', minWidth: 300, visible: true,isLink:true,sticky:true },
      { label: 'MÃ SỐ THUẾ', property: 'MaSoThue', type: 'text', width: 100, visible: true },
      { label: 'TÀI KHOẢN NGÂN HÀNG', property: 'TaiKhoanNganHang', type: 'text', width: 100, visible: true },
      { label: 'NGƯỜI ĐẠI DIỆN', property: 'NguoiDaiDien', type: 'text', width: 100, visible: true },
      { label: 'NGƯỜI LIÊN HỆ', property: 'NguoiLienHe', type: 'text', width: 100, visible: true },
      { label: 'SỐ ĐIỆN THOẠI NGƯỜI LIÊN HỆ', property: 'SoDienThoaiLienHe', type: 'text', width: 100, visible: true },
      { label: 'EMAIL LIÊN HỆ', property: 'EmailLienHe', type: 'text', width: 100, visible: true },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];

  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.nhaCungCapQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.nhaCungCapSearching=true;
  }
  huyTimKiem(){
    this.nhaCungCapQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.nhaCungCapSearching=false;
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
