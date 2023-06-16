import { ChangeDetectorRef, Component, OnInit,ViewChild,TemplateRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';


@Component({
  selector: 'app-tuong-tac-thuoc',
  templateUrl: './tuong-tac-thuoc.component.html',
  styleUrls: ['./tuong-tac-thuoc.component.scss']
})
export class TuongTacThuocComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableThuocTuongTac", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute, ) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initThuocTuongTac();
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
  thuocTuongTacQueryInfo:any={};
  thuocTuongTacSearching:boolean=false;
  columnsThuocTuongTac: TableColumn<any>[] = [];
  groupByColumnsThuocTuongTac: string[] = [];
  sortByColumnThuocTuongTac: SortDescriptor = { field: 'Id', dir: 'desc' };
  documentTypeThuocTuongTac: DocumentType;

  initThuocTuongTac() {
    this.documentTypeThuocTuongTac = DocumentType.QuanTriNhomDuocPhamTuongTacThuoc;
    this.columnsThuocTuongTac = [
      { label: 'Tên hoạt chất 1', property: 'HoatChat1', type: 'text', width: 78, visible: true,isLink:true,sticky:true },
      { label: 'Tên hoạt chất 2', property: 'HoatChat2', type: 'text', width: 300, visible: true,isLink:true,sticky:true },
      { label: 'Mức độ chú ý khi chỉ định', property: 'MucDoChuYKhiChiDinh', type: 'text', width: 150, visible: true },
      { label: 'Mức độ tương tác', property: 'MucDoTuongTac', type: 'text',minWidth:150, visible: true },
      { label: 'Dược động học', property: 'DuocDongHoc', type: 'text',width:150, visible: true },
      { label: 'Dược lực học', property: 'DuocLucHoc', type: 'text',width:150, visible: true },
      { label: 'Thuốc thức ăn', property: 'ThuocThucAn', type: 'text',width:150, visible: true },
      { label: 'Quy tắt', property: 'QuyTac', type: 'text',width:150, visible: true },
      { label: 'Tương tác hậu quả', property: 'TuongTacHauQua', type: 'text',width:150, visible: true },
      { label: 'Cách xử lý', property: 'CachXuLy', type: 'text',width:150, visible: true },
      { label: '', property: 'action', type: 'button', visible: true, width: 50,useActionDefault:true }
    ];

  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.thuocTuongTacQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.thuocTuongTacSearching=true;
  }
  huyTimKiem(){
    this.thuocTuongTacQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
    this.thuocTuongTacSearching=false;
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
