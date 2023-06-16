import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { TableColumn, SortDescriptor } from '../table/table.model';
declare let $: any;


@Component({
  selector: 'app-textbox-search-table',
  templateUrl: './textbox-search-table.component.html',
  styleUrls: ['./textbox-search-table.component.scss']
})
export class TextboxSearchTableComponent implements OnInit {
  timeoutSearch: any = null;
  modelBackup: any = null;
  currentRowSelectedIndex:number = 0;
  @Input() id: string;
  @Input() label: string;
  @Input() model: any;
  @Input() placeHolder: string = "";
  @Input() maxLength: number;
  @Input() type: string = "text";
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() upperCase: boolean = false;
  @Input() required: boolean = false;
  @Input() validationerror: string = "";
  @Input() customClass: string = "";
  @Input() icon: string = null;
  @Input() iconTooltip: string = null;
  @Input() isAutoFocus: boolean = false; // required id
  @Input() floatLabel: string = "auto";  //auto||always
  @Input() columns: TableColumn<any>[];//Required
  @Input() dataSource: any;
  @Input() sortByColumn: SortDescriptor = null;
  @Input() groupByColumns: string[] = null;
  @Input() urlGetData: string = '';
  @Input() fieldSelected: string = "";
  @Input() maxHeight: number = 540;
  @Input() showIconAddOrEdit: boolean = false;
  @Input() tooltipIconAdd: string = "Thêm";
  @ViewChild("tableSearch", { static: true }) table: TableComponent;

  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onIconClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() extRowSelect = new EventEmitter<any>();
  @Output() addEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.model != undefined && changes.model.currentValue != null) {
      this.modelBackup = JSON.parse(JSON.stringify(changes.model.currentValue));
    }
  }
  ngOnDestroy(){
    $(document).unbind("keyup");
    $(document).unbind("mouseup");
    $('#' + this.id + "-search-table.on-body").remove();
  }
  ngAfterViewInit() {
    var self = this;
    if (this.isAutoFocus) {
      setTimeout(function () {
        self.focus();
      },1000);
    }
    $(document).mouseup(function (e) {
      //KHi nhấn ra ben ngoài thì hide table đi
      var container = $(".txt-search-table,.search-table");
      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        self.showSearchTable(false);
        self.model = self.modelBackup;
      }
    });
    $(document).keyup(function (e) {
      if($('#' + self.id + "-search-table").is(":visible"))
      {
        var totalRow = self.table._tableDataSource.data.length;
        switch (e.originalEvent.keyCode) {
          case 13://Enter
            if(self.currentRowSelectedIndex>0)
            {
              self.rowSelect(self.table._tableDataSource.data[self.currentRowSelectedIndex-1]);
              self.showSearchTable(false);
            }
            break;
          case 40://ArrowDown
            if (self.currentRowSelectedIndex < totalRow) {
              if ($('#' + self.id + "-search-table").find("table").find(".mat-row").hasClass("selected")) {
                $('#' + self.id + "-search-table").find("table").find(".mat-row").removeClass("selected");
              }
              self.currentRowSelectedIndex =  self.currentRowSelectedIndex + 1;
              $('#' + self.id + "-search-table").find("table").find(".mat-row:nth-child(" + self.currentRowSelectedIndex + ")").addClass("selected");
            }
            break;

          case 38://ArrowUp
            if (self.currentRowSelectedIndex > 1) {
              if ($('#' + self.id + "-search-table").find("table").find(".mat-row").hasClass("selected")) {
                $('#' + self.id + "-search-table").find("table").find(".mat-row").removeClass("selected");
              }
              self.currentRowSelectedIndex = self.currentRowSelectedIndex -1;
              $('#' + self.id + "-search-table").find("table").find(".mat-row:nth-child(" + self.currentRowSelectedIndex + ")").addClass("selected");
            }
            break;
        }
      }
    });
  }

  emit(event: any) {
    this.validationerror = "";
    if (this.timeoutSearch != null) {
      clearTimeout(this.timeoutSearch);
    }
    var self = this;
    this.timeoutSearch = setTimeout(function () {
      self.table.searchString = event;
      self.table.search();
    }, 500);
  }
  onKey(_event: any) {
    this.showSearchTable(true);
  }
  iconClick() {
    this.onIconClick.emit(event);

  }

  focus() {
    if ($("#" + this.id + "-focus").length > 0) {
      $("#" + this.id + "-focus").focus();
    }
  }
  rowSelect(event: any) {
    if (this.fieldSelected != null && this.fieldSelected != "") {
      this.model=null;
      this.model = event[this.fieldSelected];
      this.modelChange.emit(this.model);
    }
    this.extRowSelect.emit(event);
    this.showSearchTable(false);
  }

  reset(){
    this.model=null;
    this.modelBackup=null;
    this.emit(this.model);
    this.extRowSelect.emit(null);
  }
  showSearchTable(type: boolean) {
    if (type) {
      $('#' + this.id + "-search-table").show();
      var position = $("#mat-form-field-" + this.id).offset();
      if (position != undefined && $('#' + this.id + "-search-table.on-body").length==0) {
        $('#' + this.id + "-search-table").appendTo(document.body);
        $('#' + this.id + "-search-table").addClass("on-body")
        $('#' + this.id + "-search-table").css({ "top": position.top + 60, "left": position.left });
      }
    }
    else {
      $('#' + this.id + "-search-table").hide();
      //Xóa class selected đang chọn
      if ($('#' + this.id + "-search-table").find("table").find(".mat-row").hasClass("selected")) {
        $('#' + this.id + "-search-table").find("table").find(".mat-row").removeClass("selected");
      }
      this.currentRowSelectedIndex=0;
    }
  }
  add(){
    this.addEvent.emit(true);
  }
}
