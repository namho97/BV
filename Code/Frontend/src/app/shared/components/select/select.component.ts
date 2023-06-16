import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { LookupQueryInfo } from '../../models/common.model';
import { AddComponent } from './add/add.component';
declare let $;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterContentInit {
  public filterCtrl: UntypedFormControl = new UntypedFormControl();
  filteredOptions: any[] = [];
  private _onDestroy = new Subject<void>();
  popupAdd:any=null;
  @Input() id: string;
  @Input() label: string;
  @Input() model: any;
  @Input() modelText: any;
  @Input() placeHolder: string = "";
  @Input() placeHolderSearch: string = "Nhập từ khóa tìm kiếm...";
  @Input() type: string = "text";
  @Input() items: any[] = [];
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() upperCase: boolean = false;
  @Input() minHeight: number = 20;
  @Input() validationerror: string = "";
  @Input() multiple: boolean = false;
  @Input() url: string = "";
  @Input() required:boolean=false;
  @Input() showNoneItem: boolean = true;
  @Input() queryInfo: LookupQueryInfo = new LookupQueryInfo();
  @Input() bind: boolean = true;
  @Input() showIconClear: boolean = true;
  @Input() customClass: string = "";

  @Input() showIconAddOrEdit: boolean = false;
  @Input() componentAddOrEdit: any = null;
  @Input() componentAddOrEditContext: any = null;
  @Input() componentAddOrEditWidth: string = "600px";

  @Input() tooltipIconAdd: string = "Thêm";
  @Input() componentAddTitle: string = "THÊM MỚI VÀO DANH MỤC";

  @Input() tooltipIconEdit: string = "Sửa";
  @Input() componentEditTitle: string = "CẬP NHẬT";

  @Input() iconCustom: string = null;
  @Input() iconCustomTooltip: string = null;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataBound: EventEmitter<any> = new EventEmitter<any>();
  @Output() addEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() modelObjectChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onIconCustomClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiService: ApiService,private dialog:MatDialog) { }

  ngOnInit() {
    this.filteredOptions = this.items;

    // listen for search field value changes
    this.filterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDropDowns(this.filterCtrl.value);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items != undefined && changes.items.currentValue != null) {
      this.filteredOptions = this.items;
    }
    if (this.bind == false && (changes.modelText != undefined && changes.modelText.currentValue != null)) {
      this.items=[{ "KeyId": changes.model.currentValue, "DisplayName": changes.modelText.currentValue }];
      this.filteredOptions = this.items;
      this.bind =true;
    }
    else{
      if ((changes.model != undefined && changes.model.currentValue != null) || (changes.modelText != undefined && changes.modelText.currentValue != null)) {
        this.getDataForLookup();
      }
      if (changes.queryInfo != undefined && changes.queryInfo.currentValue != null) {
        this.getDataForLookup();
      }
    }
  }

  ngAfterContentInit() {
    if (this.bind == true) {
      //this.getDataForLookup();
    }
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  getDataForLookup() {
    if (this.url != null && this.url != "") {
      if (this.model != null && parseInt(this.model) > 0) {
        this.queryInfo.Id = parseInt(this.model);
      }
      else {
        this.queryInfo.Id = 0;
      }
      this.apiService.post<any>(this.url, this.queryInfo)
        .subscribe(resultData => {
          if (resultData !== undefined && resultData != null) {
            this.items = resultData;
            this.filteredOptions = this.items;
          }
          this.dataBound.emit(resultData);
        })
    }
    this.bind = true;
  }
  emit(event: any) {
    this.validationerror = "";
    if (this.upperCase == true && event != null) {
      event = event.toString().toUpperCase();
    }
    this.modelChange.emit(event);
  }
  openedChange(event:any){
    if(event)
    {
      this.getDataForLookup();
    }
  }
  selectionChange(event:any){
    var items=this.items.filter(o=>o.KeyId==event.value);
    if(items!=null && items.length>0)
    {
      this.modelObjectChange.emit(items[0]);
      this.modelText=items[0].DisplayName;
    }
  }
  reset(){
    this.model=null;
    this.emit(this.model);
  }
  blur() {
    this.blurChange.emit(true);
  }
  timeoutFilter: any = null;
  filterDropDowns(event: any) {
    var self = this;
    self.queryInfo.Query = event;
    if (this.timeoutFilter != null) {
      clearTimeout(this.timeoutFilter);
    }
    this.timeoutFilter = setTimeout(function () {

      if (self.url != null && self.url != "") {
        self.getDataForLookup();
      }
      else {
        if (event != null && event != "") {
          self.filteredOptions = self.items.filter(option => option.DisplayName.toString().toLowerCase().indexOf(event.toLocaleLowerCase()) >= 0 ||
            CommonService.removeVietnamese(option.DisplayName.toString().toLowerCase()).indexOf(CommonService.removeVietnamese(event.toLocaleLowerCase())) >= 0);
        }
        else {
          self.filteredOptions = self.items;
        }
      }
    }, 500);

  }
  add(){
    if(this.popupAdd!=null)
    {
      this.dialog.closeAll();
      this.popupAdd=null;
    }
    this.popupAdd=this.dialog.open(AddComponent, {
      disableClose: false,
      width: this.componentAddOrEditWidth,
      data: {
        Title:this.componentAddTitle,
        Component:this.componentAddOrEdit,
        Context:this.componentAddOrEditContext
      }
    }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
        if (result) {
          //this.addEvent.emit(result);
        }
    });
  }

  edit(){
    if(this.popupAdd!=null)
    {
      this.dialog.closeAll();
      this.popupAdd=null;
    }
    this.popupAdd=this.dialog.open(AddComponent, {
      disableClose: false,
      width: this.componentAddOrEditWidth,
      data: {
        Title:this.componentEditTitle,
        Component:this.componentAddOrEdit,
        Context:this.componentAddOrEditContext,
        IsUpdate:true
      }
    }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
        if (result) {
          //this.addEvent.emit(result);
        }
    });
  }
  iconCustomClick(){
    this.onIconCustomClick.emit();
  }
}
