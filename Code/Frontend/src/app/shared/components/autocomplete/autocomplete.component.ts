import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { LookupQueryInfo } from '../../models/common.model';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, AfterContentInit {
  public filterCtrl: UntypedFormControl = new UntypedFormControl();
  filteredOptions: any[] = [];
  private _onDestroy = new Subject<void>();
  firstLoad:boolean=true;
  @Input() id: string;
  @Input() label: string;
  @Input() model: any;
  @Input() placeHolder: string = "";
  @Input() placeHolderSearch: string = "Nhập từ khóa tìm kiếm...";
  @Input() type: string = "text";
  @Input() items: any[] = [];
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() upperCase: boolean = false;
  @Input() minHeight: number = 15;
  @Input() validationerror: string = "";
  @Input() multiple: boolean = false;
  @Input() url: string = "";
  @Input() urlSave: string = "";
  @Input() required:boolean=false;
  @Input() showNoneItem: boolean = true;
  @Input() queryInfo: LookupQueryInfo = new LookupQueryInfo();
  @Input() bind: boolean = false;
  @Input() showIconClear: boolean = true;
  @Input() customClass: string = "";
  @Input() icon: string = null;
  @Input() iconTooltip: string = null;
  @Input() iconSuffix: boolean = true;
  @Input() paramSaveAutocomplete: any = null;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataBound: EventEmitter<any> = new EventEmitter<any>();
  @Output() modelObjectChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onIconClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiService: ApiService,private dialog:MatDialog,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.filteredOptions = this.items;

    // listen for search field value changes
    this.filterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items != undefined && changes.items.currentValue != null) {
      this.filteredOptions = this.items;
    }
    if (changes.queryInfo != undefined && changes.queryInfo.currentValue != null && this.bind == true) {
      this.getDataForLookup();
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
          this.firstLoad=false;
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
    var items=this.items.filter(o=>o.DisplayName==event);
    if(items!=null && items.length>0)
    {
      this.modelObjectChange.emit(items[0]);
    }
  }
  reset(){
    this.model=null;
    this.emit(this.model);
  }
  blur() {
    this.blurChange.emit(true);
  }
  iconClick(){
    this.onIconClick.emit(event);

  }
  onKey(_event)
  {
    this.filterDropDowns(this.filterCtrl.value);
  }
  onFocus(_event)
  {
    this.filterDropDowns(this.model);
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
          this.firstLoad=false;
        }
      }, 500);
  }
  showIconSave(){
    return this.model!=null && this.model!="" && !this.firstLoad && this.items.filter(o=>o.DisplayName==this.model).length==0 && this.urlSave!=null && this.urlSave!="";
  }
  save(){
    if(this.urlSave!=null && this.urlSave!="")
    {
      this.showPopupLoadingData("Đang lưu dữ liệu...");
      this.apiService.post(this.urlSave,this.paramSaveAutocomplete!=null?this.paramSaveAutocomplete: {Value:this.model}).subscribe((result)=>{
        if(result)
        {
          this.items.push({DisplayName:this.model});
          CommonService.openSnackBar(this.snackBar, "Lưu thành công", "success");
        }
        else{
          CommonService.openSnackBar(this.snackBar, "Lưu không thành công", "error");
        }
        this.closePopupLoadingData();
      },(err:any) => {
        if (err.Message != "Validation Failed") {
          CommonService.openSnackBar(this.snackBar, err.Message, "error");
        }
        else{
          console.log(err);
        }
        this.closePopupLoadingData();
      });
    }
  }
  popupLoadingData:any;
  showPopupLoadingData(mess: string = 'Đang tải dữ liệu...') {
    this.popupLoadingData = this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '200px',
      height: '130px',
      data: { Title: mess }
    });
  }
  closePopupLoadingData() {
    if (this.popupLoadingData != undefined && this.popupLoadingData != null) {
      this.popupLoadingData.close();
    }
  }
}

