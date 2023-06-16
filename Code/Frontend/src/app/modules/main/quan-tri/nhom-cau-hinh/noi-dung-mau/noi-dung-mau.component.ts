import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-noi-dung-mau',
  templateUrl: './noi-dung-mau.component.html',
  styleUrls: ['./noi-dung-mau.component.scss']
})
export class NoiDungMauComponent implements OnInit {

  id: number = null;
  dataChon: any;
  now:Date=new Date();
  @ViewChild("tableNoiDungMau", { static: true }) table:TableComponent;
  constructor(private cdref: ChangeDetectorRef,private route: ActivatedRoute){
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.initNoiDungMau();
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
  noiDungMauQueryInfo:any={};
  columnsNoiDungMau: TableColumn<any>[] = [];
  groupByColumnsNoiDungMau: string[] = ["LoaiHienThi"];
  sortByColumnNoiDungMau: SortDescriptor = { field: 'Loai', dir: 'asc' };
  documentTypeNoiDungMau: DocumentType;
  dataItemNoiDungMauSelected:any;
  @ViewChild('tinhTrangTemplate', { static: true }) tinhTrangTemplate: TemplateRef<any>;

  initNoiDungMau() {
    this.documentTypeNoiDungMau = DocumentType.QuanTriNhomCauHinhNoiDungMau;
    this.columnsNoiDungMau = [
      // { label: 'LOẠI', property: 'LoaiHienThi', type: 'text', width: 160, visible: true,sticky:true },
      { label: 'NỘI DUNG', property: 'NoiDung', type: 'text', minWidth: 200, visible: true,isLink:true },
      { label: '', property: 'Action', type: 'text', visible: true,width:50,useActionDefault:true }
    ];
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.noiDungMauQueryInfo;
    this.table.search();
    this.dangTimKiem=true;
  }
  huyTimKiem(){
    this.noiDungMauQueryInfo={};
    this.timKiem();
    this.dangTimKiem=false;
  }
  chonNguoiBenhXemChiTiet(dataItem:any){
    this.dataItemNoiDungMauSelected=dataItem;
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
