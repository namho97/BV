import { ChangeDetectorRef, Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-nguoi-benh',
  templateUrl: './nguoi-benh.component.html',
  styleUrls: ['./nguoi-benh.component.scss']
})
export class NguoiBenhComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableNguoiBenh", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initNguoiBenh();
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
  nguoiBenhQueryInfo:any={};
  nguoiBenhSearching:boolean=false;
  columnsNguoiBenh: TableColumn<any>[] = [];
  groupByColumnsNguoiBenh: string[] = [];
  sortByColumnNguoiBenh: SortDescriptor = { field: 'MaNguoiBenh', dir: 'desc' };
  documentTypeNguoiBenh: DocumentType;

  initNguoiBenh() {
    this.documentTypeNguoiBenh = DocumentType.QuanTriNhomNguoiBenhNguoiBenh;
    this.columnsNguoiBenh = [
      { label: 'Mã người bệnh', property: 'MaNguoiBenh', type: 'text', width: 78, visible: true,isLink:true,sticky:true },
      { label: 'Họ tên', property: 'HoTen', type: 'text', minWidth: 150, visible: true,isLink:true,sticky:true },
      { label: 'Năm sinh', property: 'NgayThangNamSinh', type: 'text',width:50, visible: true },
      { label: 'Số chứng minh thư', property: 'SoChungMinhThu', type: 'text',width:100, visible: true },
      { label: 'Giới tính', property: 'GioiTinhHienThi', type: 'text',width:120, visible: true },
      { label: 'Số điện thoại', property: 'SoDienThoai', type: 'text',width:100, visible: true },
      { label: 'Nghề nghiệp', property: 'NgheNghiep', type: 'text',width:100, visible: true },
      { label: 'Địa chỉ ', property: 'DiaChiDayDu', type: 'text',width:100, visible: true },
      { label: 'Họ tên người giám hộ', property: 'HoTenNguoiGiamHo', type: 'text',width:100, visible: true },
      { label: 'Dân tộc', property: 'DanToc', type: 'text',width:100, visible: true },
      { label: 'Quốc tịch', property: 'QuocTich', type: 'text',width:100, visible: true },
      { label: 'Nơi làm việc', property: 'NoiLamViec', type: 'text',width:100, visible: true },
      { label: 'Email', property: 'Email', type: 'text',width:100, visible: true },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];

  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.nguoiBenhQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.nguoiBenhSearching=true;
  }
  huyTimKiem(){
    this.nguoiBenhQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.nguoiBenhSearching=false;
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
