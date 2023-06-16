import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component,  EventEmitter,  Input, OnInit, Output,  ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from 'src/app/core/services/base.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { SystemMessage } from '../../configdata/system-message';
import { SecurityOperation } from '../../enum/security-operation.enum\'';
import { ConfirmComponent } from '../confirm/confirm.component';
import { LoadingComponent } from '../loading/loading.component';
import { Group, SortDescriptor, TableColumn, TableQueryInfo } from './table.model';
declare let $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit,AfterViewInit {

  selection = new SelectionModel<any>(true, []);
  pageSizeOptions: number[] = [5, 10, 20, 50];
  skip:number=0;
  take:number=50;
  isLastPage:boolean=false;
  pageIndex:number=0;
  searchCtrl = new FormControl();
  items:any[];
  statusOpenSearchForm:boolean=false;
  _isLoadingTotalPage: boolean = false;
  _tableDataSource: MatTableDataSource<any> | null;
  _totalRowCount:number=0;
  _itemPerPageFrom:number=0;
  _itemPerPageTo:number=0;

  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown: 'native' | 'hover' | 'always' = 'native';

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();

  //@ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() masterName: string;//Required
  @Input() columns: TableColumn<any>[];//Required
  @Input() createUpdateComponent: any;
  @Input() action: boolean=true;
  @Input() heightToolbar: number=207;
  @Input() height: number=null;
  @Input() heightAuto:  boolean=false;
  @Input() maxHeight: number=null;
  @Input() dataSource:any;
  @Input() showActionImport: boolean=true;
  @Input() showActionExport: boolean=true;
  @Input() hideHeader:  boolean=false;
  @Input() headerTemplate: string;
  @Input() showColumnVisibility: boolean = false;
  @Input() showExportExcel: boolean = false;
  @Input() showImportExcel: boolean = false;
  @Input() useAddDeault: boolean = false;
  @Input() showIconOpenSearchForm: boolean = true;
  @Input() baseRoute: string;
  @Input() documentType: DocumentType;
  @Input() pageSize: number = 50;
  @Input() searchString: string = null;
  @Input() additionalSearchObject: any = null;
  @Input() tableQueryInfo: TableQueryInfo;
  @Input() sortByColumn: SortDescriptor = null;
  @Input() groupByColumns: string[] = null;
  @Input() urlGetData: string = '';
  @Input() urlGetTotalPage: string = '';
  @Input() lazyLoadPage: boolean = false;
  @Input() showIndex: boolean = false;
  @Input() showCheckbox: boolean = false;
  @Input() pageable: boolean = true;
  @Input() pageNotTotal: boolean = false;
  @Input() noBorderTop: boolean = false;
  @Input() noBorderBottom: boolean = true;
  @Input() noBorderLeft: boolean = true;
  @Input() noBorderRight: boolean = true;
  @Input() disabledLoadWhenOpeningPage: boolean = false;
  @Input() dragable: boolean = false;
  @Input() totalPageLabel: string = null;
  @Input() hasFooter: boolean = false;
  @Input() hasSticky: boolean = false;
  //Import
  @Input() importColumns: TableColumn<any>[];
  @Input() importDataSource: TableColumn<any>[];
  @Output() extDataItemSelected = new EventEmitter<any>();
  @Output() extImportExcel = new EventEmitter<any>();
  @Output() extExportExcel = new EventEmitter<any>();
  @Output() extOnDataBound = new EventEmitter<any>();
  @Output() getDataSource: EventEmitter<any> = new EventEmitter<any>();
  @Output() extOnSearch = new EventEmitter<any>();
  @Output() extCheckboxSelection = new EventEmitter<any>();
  @Output() extDragItem = new EventEmitter<any>();
  @Output() extRowSelect = new EventEmitter<any>();


  constructor(private dialog: MatDialog,private baseService: BaseService, private authService: AuthService, private router: Router,
    private snackBar:MatSnackBar,private route: ActivatedRoute, private cdref: ChangeDetectorRef) {
     }

  ngOnInit() {
    this.skip = 0;
    this.take = (this.pageSize * this.skip) + this.pageSize;
    this._tableDataSource=new MatTableDataSource<any>([]);
    this._tableDataSource.sort = this.sort;
    //this._tableDataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    var self=this;
    setTimeout(function(){
      self.formatHeight();
      self.formatWidth();
    });
    // $(window).resize(function(){
    //   self.formatContent();
    //   self.cdref.detectChanges();
    // });
    if(!this.disabledLoadWhenOpeningPage)
    {
      this.setDataSource(this.dataSource);
    }
    this.cdref.detectChanges();
  }
 formatHeight(){
  if ($("#"+this.masterName) != null && $("#"+this.masterName).length > 0 && this.heightAuto!=true) {
    if(this.maxHeight!=null)
    {
      $("#"+this.masterName).css({ "max-height": this.maxHeight+'px'});
    }
    else{
      if(this.height!=null && this.height>0)
      {
        $("#"+this.masterName).css({ "height": this.height });
      }
      else{
        if(this.heightToolbar!=null && this.heightToolbar>0)
        {
          $("#"+this.masterName).css({ "height": $(window).height() - this.heightToolbar + (this.pageable?0:55)});
        }
        else{
          $("#"+this.masterName).css({ "height": $(window).height() - 220 + (this.pageable?0:50)});
        }
      }

    }
  }
 }
 getTotalWidth(){
  var totalWidth=0;
  this.columns.forEach(element=>{
    if(element.width!=null && element.width>0)
    {
      totalWidth+=element.width;
    }
    else{
      if(element.minWidth!=null && element.minWidth>0)
      {
        totalWidth+=element.minWidth;
      }
    }
  });
  return totalWidth;
 }
  formatWidth() {
    if ($("#"+this.masterName) != null && $("#"+this.masterName).length > 0) {
      var totalWidth=this.getTotalWidth();
      if (totalWidth>0 && $("#"+this.masterName+" > table") != null && $("#"+this.masterName+" > table").length > 0) {
        this.columns.filter(o=>o.minWidth!=null && o.minWidth>0).forEach(element=>{
          if($("#"+this.masterName).parent().width()>totalWidth+48)
          {            
            element.width=$("#"+this.masterName).parent().width()-totalWidth-48+element.minWidth-(this.columns.length*12)>element.minWidth?$("#"+this.masterName).parent().width()-totalWidth-48+element.minWidth-(this.columns.length*12):element.minWidth;
          }
          else{
            if($("#"+this.masterName).parent().width()<totalWidth+48)
            {
              element.width=element.minWidth;
            }
          }
        });
        $("#"+this.masterName+" > table").css({ "width": this.getTotalWidth() });
      }
    }
    // else {
    //   var self = this;
    //   setTimeout(function () {
    //     console.log(3);
    //     self.formatContent();
    //   }, 100);
    // }
  }
  setDataSource(dataSource:any) {
    if(this.showCheckbox==true && this.columns.filter(o=>o.type=="checkbox").length<=0)
    {
      this.columns.unshift({ label: 'CHỌN', property: 'Checkbox', type: 'checkbox',width:30, visible: true ,hideFilter:true });
    }
    if (dataSource == null) {
        this.getDataForGrid();
    }
    else {
      if(dataSource.Data!=null && dataSource.Data.length<this.pageSize)
      {
        this.isLastPage=true;
      }

      this.setUpSearchQueryInfo();
      if (this.groupByColumns != null && this.groupByColumns.length>0 && this.groupByColumns.length>0) {
        this._tableDataSource.data = this.addGroups(
          dataSource.Data,
          this.groupByColumns
        );
        if(this.showIndex)
        {
          if(this.columns.filter(o=>o.type=="index").length<=0)
          {
            this.columns.unshift({ label: 'STT', property: 'Index', type: 'index',width:30, visible: true ,hideFilter:true});
          }
          var i=0;
          this._tableDataSource.data.forEach((item) => {
            if(item.level==undefined)
            {
              item.Index =this.skip+ i + 1;
              i++;
            }
          });
        }
        this._tableDataSource.filterPredicate = this.customFilterPredicate.bind(this);
        this._tableDataSource.filter = performance.now().toString(); // bug here need to fix
      }
      else {
        this._tableDataSource = new MatTableDataSource<any>(dataSource.Data);
        if(this.showIndex)
        {
          if(this.columns.filter(o=>o.type=="index").length<=0)
          {
            this.columns.unshift({ label: 'STT', property: 'Index', type: 'index',width:30, visible: true ,hideFilter:true});
          }
          var i=0;
          this._tableDataSource.data.forEach((item) => {
            if(item.level==undefined)
            {
              item.Index =this.skip+ i + 1;
              i++;
            }
          });
        }
      }
      var self=this;
      setTimeout(function(){
        self._totalRowCount=dataSource.TotalRowCount;
        self._itemPerPageFrom=dataSource.TotalRowCount>0?(self.skip+1):0;
        self._itemPerPageTo=self._totalRowCount>self.skip+self.take?self.skip+self.take:self._totalRowCount;
      });
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this.sortByColumn =
        {
          field:sortState.active,
          dir:sortState.direction=='asc'?'asc':'desc'
        }
      ;
    } else {
      this.sortByColumn =null;
    }
    this.search();
  }
  groupBy(event, column) {
    event.stopPropagation();
    this.checkGroupByColumn(column.field, true);
    this._tableDataSource.data = this.addGroups(this.dataSource.Data, this.groupByColumns);
    this._tableDataSource.filter = performance.now().toString();
  }

  checkGroupByColumn(field, add) {
    let found = null;
    for (const column of this.groupByColumns) {
      if (column === field) {
        found = this.groupByColumns.indexOf(column, 0);
      }
    }
    if (found != null && found >= 0) {
      if (!add) {
        this.groupByColumns.splice(found, 1);
      }
    } else {
      if (add) {
        this.groupByColumns.push(field);
      }
    }
  }

  unGroupBy(event, column) {
    event.stopPropagation();
    this.checkGroupByColumn(column.field, false);
    this._tableDataSource.data = this.addGroups(this.dataSource.Data, this.groupByColumns);
    this._tableDataSource.filter = performance.now().toString();
  }

  // below is for grid row grouping
  customFilterPredicate(data: any | Group, _filter: string): boolean {
    return data instanceof Group ? data.visible : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: any): boolean {
    const groupRows = this._tableDataSource.data.filter((row) => {
      if (!(row instanceof Group)) {
        return false;
      }
      let match = true;
      this.groupByColumns.forEach((column) => {
        if (!row[column] || !data[column] || row[column] !== data[column]) {
          match = false;
        }
      });
      return match;
    });

    if (groupRows.length === 0) {
      return true;
    }
    const parent = groupRows[0] as Group;
    return parent.visible && parent.expanded;
  }

  groupHeaderClick(row) {
    row.expanded = !row.expanded;
    this._tableDataSource.filter = performance.now().toString(); // bug here need to fix
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(
    data: any[],
    level: number,
    groupByColumns: string[],
    parent: Group
  ): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map((row) => {
        const result = new Group();
        result.level = level + 1;
        result.parent = parent;
        for (let i = 0; i <= level; i++) {
          result[groupByColumns[i]] = row[groupByColumns[i]];
        }
        return result;
      }),
      JSON.stringify
    );

    const currentColumn = groupByColumns[level];
    let subGroups = [];
    groups.forEach((group) => {
      const rowsInGroup = data.filter(
        (row) => group[currentColumn] === row[currentColumn]
      );
      group.totalCounts = rowsInGroup.length;
      const subGroup = this.getSublevel(
        rowsInGroup,
        level + 1,
        groupByColumns,
        group
      );
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }

  uniqueBy(a, key) {
    const seen = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isGroup(index, item): boolean {
    item.index=index;
    return item.level;
  }
  setUpSearchQueryInfo(){
    // let searchText = this.searchString != undefined ? this.searchString : '';
    // searchText = CommonService.convertSpecialXML(searchText);
    // searchText = '<SearchTerms>' + searchText + '</SearchTerms>';
    // searchText = btoa(unescape(encodeURIComponent('<AdvancedQueryParameters>' + searchText + '</AdvancedQueryParameters>')));


    this.tableQueryInfo = { skip: this.skip, take: this.take, pageSize: this.pageSize, searchString: this.searchString,  sort: (this.sortByColumn!=null?[this.sortByColumn]:null), lazyLoadPage: this.lazyLoadPage };
    if(this.additionalSearchObject!=null)
    {
      this.tableQueryInfo={...this.tableQueryInfo,...this.additionalSearchObject};
    }
  }

  getDataForGrid() {
    this.setUpSearchQueryInfo();
    let dialogLoading = this.dialog.open(LoadingComponent);
    // if (this.tableQueryInfo.additionalSearchString != undefined) {
    //     this.tableQueryInfo.additionalSearchString = this.tableQueryInfo.additionalSearchString.toString();
    // }
    this.baseService.getDataForGrid(this.tableQueryInfo, this.urlGetData)
        .subscribe(
            (resultData: any) => {
                if (resultData != undefined && resultData != null) {
                    if(resultData.Data!=null && resultData.Data.length<this.pageSize)
                    {
                      this.isLastPage=true;
                    }
                    if(resultData.Data==null)
                    {
                        resultData.Data=[];
                    }
                    if (this.groupByColumns != null && this.groupByColumns.length>0) {
                      this._tableDataSource.data = this.addGroups(
                        resultData.Data,
                        this.groupByColumns
                      );
                      if(this.showIndex && this.columns.filter(o=>o.type=="index").length<=0)
                      {
                        this.columns.unshift({ label: 'STT', property: 'Index', type: 'index',width:30, visible: true ,hideFilter:true});
                        var i=0;
                        this._tableDataSource.data.forEach((item) => {
                          if(item.level==undefined)
                          {
                            item.Index =this.skip+ i + 1;
                            i++;
                          }
                        });
                      }
                      this._tableDataSource.filterPredicate = this.customFilterPredicate.bind(this);
                      this._tableDataSource.filter = performance.now().toString(); // bug here need to fix
                    } else {
                        this._tableDataSource = new MatTableDataSource<any>(resultData.Data);
                        if(this.showIndex && this.columns.filter(o=>o.type=="index").length<=0)
                        {
                          this.columns.unshift({ label: 'STT', property: 'Index', type: 'index',width:30, visible: true ,hideFilter:true});
                        }
                        var i=0;
                        this._tableDataSource.data.forEach((item) => {
                          if(item.level==undefined)
                          {
                            item.Index =this.skip+ i + 1;
                            i++;
                          }
                        });
                    }
                    var self=this;
                    setTimeout(function(){
                      self._totalRowCount=resultData.TotalRowCount;
                      self._itemPerPageFrom=resultData.TotalRowCount>0?(self.skip+1):0;
                      self._itemPerPageTo=self._totalRowCount>self.skip+self.take?self.skip+self.take:self._totalRowCount;
                    });

                    //set datasource emit
                    this.getDataSource.emit(resultData.Data);
                }
                this.extOnDataBound.emit(resultData);
                dialogLoading.close();
                if (resultData != undefined && resultData != null && this.lazyLoadPage == true && this.pageNotTotal!=true) {
                    this._isLoadingTotalPage = true;
                    this.baseService.getTotalPageForGrid(this.tableQueryInfo, this.urlGetTotalPage)
                        .subscribe(
                            (resultData: any) => {
                                if (resultData != undefined && resultData != null) {
                                    var self=this;
                                    setTimeout(function(){
                                      self._totalRowCount=resultData.TotalRowCount;
                                      self._itemPerPageFrom=resultData.TotalRowCount>0?(self.skip+1):0;
                                      self._itemPerPageTo=self._totalRowCount>self.skip+self.take?self.skip+self.take:self._totalRowCount;
                                    });
                                }
                                this._isLoadingTotalPage = false;
                            },
                            () => {
                                this._isLoadingTotalPage = false;
                            }
                        );
                }
            },
            (err:any) => {
              dialogLoading.close();
                if(err.Message=="The wait operation timed out")
                {
                  CommonService.openSnackBar(this.snackBar,"Có lỗi xảy ra trong quá trình trả về dữ liệu. Bạn hãy giới hạn tìm kiếm lại. Cảm ơn.","error");
                }
                else
                {
                    //console.log(err);
                    //this.notificationService.showError("Có lỗi xảy ra trong quá trình gửi yêu cầu lên server. Bạn hãy tải lại trang. Cảm ơn.");
                }
            });
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  formatFormContent() {
    if ($(".form-content") != null && $(".form-content").length > 0) {
      $(".form-content").css({ "height": $(window).height() - 161 });
    }
  }
  back() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        id: null
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // trigger navigation
    });
    if($(".panel").length>0)
    {
      $(".panel").removeClass("has-detail");
    }
  }
  view(id:number) {
    const self = this;
    if (self.authService.hasPermission(self.documentType, SecurityOperation.View)) {
      self.router.navigate([], {
        relativeTo: self.route,
        queryParams: {
          id: id
        },
        queryParamsHandling: 'merge',
        // preserve the existing query params in the route
        skipLocationChange: false
        // trigger navigation
      });
      if($(".panel").length>0)
      {
        $(".panel").addClass("has-detail");
      }
      self.extDataItemSelected.emit({Id:id});
      this.formatFormContent();

    } else {
        CommonService.openSnackBar(self.snackBar,SystemMessage.UnAuthorizedMessage,"error");
    }
  }

  create() {
    const self = this;
    if (this.authService.hasPermission(self.documentType, SecurityOperation.Add)) {
      this.view(0);
    } else {
        CommonService.openSnackBar(self.snackBar,SystemMessage.UnAuthorizedMessage,"error");
    }
  }
  removeItemFromSelectlist(item: any){
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    if(this.items!=null && this.items.length>0)
    {
      this.items.splice(this.items.findIndex((existingItem) => existingItem.id === item.id), 1);
      this.selection.deselect(item);
      this.subject$.next(this.items);
    }
  }

  delete(item: any) {
    const self = this;
    if (self.authService.hasPermission(self.documentType, SecurityOperation.Delete)) {

        self.dialog.open(ConfirmComponent, {
            disableClose: false,
            width: '400px',
            data: { message: CommonService.format(SystemMessage.MessConfirm, ['xóa']),yesColor:"warn"  }
        }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
            if (result) {
                self.baseService.deleteById(item.Id)
                    .subscribe(
                        () => {
                          self.removeItemFromSelectlist(item);
                          self.search();
                          CommonService.openSnackBar(this.snackBar,CommonService.format(SystemMessage.ActionSuccessfully, ['Xóa']));
                        },
                        (err: any) => {
                          CommonService.openSnackBar(this.snackBar,err.Message,"error");
                        });
            }
        });
    } else {
      CommonService.openSnackBar(this.snackBar,SystemMessage.UnAuthorizedMessage,"error");
    }
  }

  deletes(items: any[]) {
    const self = this;
    if (this.authService.hasPermission(this.documentType, SecurityOperation.Delete)) {

        if (items != null && items.length > 0) {

            this.dialog.open(ConfirmComponent, {
                disableClose: false,
                width: '400px',
                data: { message: CommonService.format(SystemMessage.MessConfirm, ['xóa những']), yesColor:"warn" }
            }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
                if (result) {
                    self.baseService.deleteByIds(items.map(t=>t.Id))
                        .subscribe(
                            () => {
                              items.forEach(c => self.removeItemFromSelectlist(c));

                              self.search();
                              CommonService.openSnackBar(this.snackBar,CommonService.format(SystemMessage.ActionSuccessfully, ['Xóa']));
                            },
                            (err: any) => {
                              CommonService.openSnackBar(this.snackBar,err.Message,"error");
                            });
                }
            });
        }
    } else {
        CommonService.openSnackBar(this.snackBar,SystemMessage.UnAuthorizedMessage,"error");
    }

  }
  dangTimKiem:boolean=false;
  search(){
    this.onFilterChange(this.searchString);
    this.dangTimKiem=true;
  }
  cancelSearch(){
    this.searchString=null;
    this.search();
    this.dangTimKiem=false;
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
        this.onFilterChange(this.searchString);
    }
  }
  onFilterChange(_value: string) {
    if (this.dataSource == null) {
      this.getDataForGrid();
    } else {
        this.extOnSearch.emit(this.searchString);
    }
    // if (!this.dataSource) {
    //   return;
    // }
    // value = value.trim();
    // value = value.toLowerCase();
    // this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this._tableDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this._tableDataSource.data.forEach(row => this.selection.select(row));
      this.extCheckboxSelection.emit(this.selection.selected.filter(row=>row.level==null));
  }
  selectionToggle(row:any){
    this.selection.toggle(row);
    this.extCheckboxSelection.emit(this.selection.selected.filter(row=>row.level==null));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    column.index=index;
    return column.property;
  }

  importExcel() {
      this.extImportExcel.emit();
  }
  exportExcel() {
      this.extExportExcel.emit();
  }
  refresh(){
    this.search();
  }
  paginatorPrev(){
    this.pageIndex=this.pageIndex-1;
    this.skip = this.skip-this.take;
    this.take = this.pageSize;
    this.setUpSearchQueryInfo();
    this.search();
  }
  paginatorNext(){
    this.pageIndex=this.pageIndex+1;
    this.skip = this.skip+this.take;
    this.take = this.pageSize;
    this.setUpSearchQueryInfo();
    this.search();
  }
  paginatorNotTotalPrev(){
    this.pageIndex=this.pageIndex-1;
    this.skip = this.skip-this.take;
    this.take = this.pageSize;
    this.setUpSearchQueryInfo();
    this.search();
  }
  paginatorNotTotalNext(){
    this.pageIndex=this.pageIndex+1;
    this.skip = this.skip+this.take;
    this.take = this.pageSize;
    this.setUpSearchQueryInfo();
    this.search();
  }

  //#region drag and drop
  drop(_event: CdkDragDrop<any[]>) {
    // moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    // console.log(event.container.data);
    console.log(_event);
    this.extDragItem.emit(_event);
  }

  //#endregion
  getRecord(row:any){
    this.extRowSelect.emit(row);
  }
}

