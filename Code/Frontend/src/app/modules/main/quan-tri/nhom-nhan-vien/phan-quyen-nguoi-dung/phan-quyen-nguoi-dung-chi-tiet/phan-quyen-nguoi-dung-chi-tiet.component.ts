import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { SecurityOperation } from 'src/app/shared/enum/security-operation.enum\'';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { ApiError } from 'src/app/shared/models/api-error.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { BaseService } from 'src/app/core/services/base.service';
import { ErrorService } from 'src/app/core/error/error.service';
declare let $: any;

@Component({
  selector: 'app-phan-quyen-nguoi-dung-chi-tiet',
  templateUrl: './phan-quyen-nguoi-dung-chi-tiet.component.html',
  styleUrls: ['./phan-quyen-nguoi-dung-chi-tiet.component.scss']
})
export class PhanQuyenNguoiDungChiTietComponent implements OnInit {

  phanQuyenVo: any={};
  validationErrors: any[] = [];
  danhSachNamSinhs: any = [];
  danhSachNgaySinhs: any = [];
  danhSachThangSinhs: any = [];
  isUpdate: boolean = false;
  accessUser: AccessUser;
  dataDanhSachPhanQuyens: any[];
  IsExpand: boolean = true;
  phanQuyenQueryInfo:any={};
  idPhanQuyen :number = 0;
  gridDatas:any[] =[];

  @Input() data: any;
  @Input() documentType: DocumentType;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private baseService:BaseService,
    private cdref: ChangeDetectorRef,
    private errorService:ErrorService
  ) { }

  //#region init
  ngOnInit(): void {
    this.documentType = DocumentType.QuanTriNhomNhanVienPhanQuyenNguoiDung;
    this.phanQuyenVo = {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.phanQuyenVo = {};
        this.getById(0);
        this.idPhanQuyen =0;
      }
      else {
        this.isUpdate = true;
        this.getById(changes.data.currentValue.Id);
        this.idPhanQuyen =changes.data.currentValue.Id;
      }
    }
  }

  getById(id) {
    if (id != null ) {
      let dialogLoading = this.dialog.open(LoadingComponent);
      this.baseService.getById(id).subscribe((data: any) => {
        if (data) {
          this.phanQuyenVo = data;
          this.gridDatas = this.phanQuyenVo.RoleFunctionGrids;

          this.loadDsIsAllView(this.phanQuyenVo.RoleFunctionGrids);
          this.loadDsIsAllInsert(this.phanQuyenVo.RoleFunctionGrids);

          this.loadDsIsAllEdit(this.phanQuyenVo.RoleFunctionGrids);
          this.loadDsIsAllDelete(this.phanQuyenVo.RoleFunctionGrids);

          this.loadDsIsAllProcess(this.phanQuyenVo.RoleFunctionGrids);

      


        }
        //MỞ ra khi muốn cập nhật quyền mặc định
        //this.phanQuyenVo.IsCheckRoleDefaultOnCreate=false;
        dialogLoading.close();
      }, (err: ApiError) => {
        CommonService.openSnackBar(this._snackBar, err.Message, "error")
        dialogLoading.close();
      });
    }
  }
  loadIsCheckAllQuyen(items:any){
    if(items != null){
      this.phanQuyenQueryInfo.TatCa = true;
      // kiểm tra tất cả item quyền mà xuất hiện false  => gán phanQuyenQueryInfo.TatCa = false : phanQuyenQueryInfo.TatCa true
      items.filter(d=>d.IsDocumentType == true).forEach(element => {
         let gridQuyen =  element.Quyens.filter(d=>d.Value == false);
         if(gridQuyen != null && gridQuyen.length != 0){
          this.phanQuyenQueryInfo.TatCa = false;
         }
      });
    }
  }

  ngAfterContentInit(): void {
    this.formatContent();
  }

  formatContent() {
    var self = this;
    if ($(".form-content") != null && $(".form-content").length > 0) {
      $(".form-content").css({ "height": $(window).height() - 185});
    }
    else {
      var self = this;
      setTimeout(function () {
        self.formatContent();
      }, 100);
    }
    $(window).resize(function () {
      self.formatContent();
    });

  }
  //#endregion init

  //#region actions
  quayLai() {
    this.quayLaiChange.emit(true);
  }
  nhapLai() {
    // if(this.phanQuyenVo.Id != null && this.phanQuyenVo.Id != 0)
    // {
    //   this.getById(this.phanQuyenVo.Id);
    // }
    // else{
    //   this.phanQuyenVo = {};
    // }
    // nếu phanQuyenVo thì bộ quyền mất
    this.getById(this.phanQuyenVo.Id);
  }

  luu() {
    if (this.authService.hasPermission(this.documentType, SecurityOperation.Add)) {
      this.validationErrors = [];
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn lưu phân quyền này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          let dialogLoading = this.dialog.open(LoadingComponent);
          this.baseService.create(this.phanQuyenVo).subscribe(() => {
            this.phanQuyenVo = {};
            dialogLoading.close();
            CommonService.openSnackBar(this._snackBar, CommonService.format(SystemMessage.ActionSuccessfully, ["Lưu"]));
            this.taiLaiDanhSach();
            this.getById(0);
          },
            (err: ApiError) => {
              this.validationErrors = err.ValidationErrors;
              if (err.Message != "Validation Failed") {
                CommonService.openSnackBar(this._snackBar, err.Message, "error");
              }
              else{
                const mess = this.errorService.getValidationErrors(err);
                if (mess != null) {
                  CommonService.openSnackBar(this._snackBar, mess, "error",null,7000)  ;
                }
              }
              dialogLoading.close();
            })
        }
      });
    }
    else {
      CommonService.openSnackBar(this._snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }
  }

  capNhat() {
    if (this.authService.hasPermission(this.documentType, SecurityOperation.Update)) {
      this.validationErrors = [];
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn cập nhật tài khoản này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          let dialogLoading = this.dialog.open(LoadingComponent);
          this.baseService.update(this.phanQuyenVo).subscribe(() => {
            dialogLoading.close();
            CommonService.openSnackBar(this._snackBar, CommonService.format(SystemMessage.ActionSuccessfully, ["Cập nhật"]));
            this.taiLaiDanhSach();
          },
            (err: ApiError) => {
              
              this.validationErrors = err.ValidationErrors;
              if (err.Message != "Validation Failed") {
                CommonService.openSnackBar(this._snackBar, err.Message, "error");
              }
              else{
                const mess = this.errorService.getValidationErrors(err);
                if (mess != null) {
                  CommonService.openSnackBar(this._snackBar, mess, "error",null,7000)  ;
                }
              }
              dialogLoading.close();
            })
        }
      });
    }
    else {
      CommonService.openSnackBar(this._snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }
  }

  taiLaiDanhSach() {
    this.dataChange.emit(true);
  }
  //#endregion actions

  //#region phân quyền
  huyTimKiem(){
    this.phanQuyenQueryInfo.Ten = null;
    let dataGridDefault  = [...this.gridDatas];
    this.phanQuyenVo.RoleFunctionGrids = [...dataGridDefault];
    this.loadDsIsAllView(this.phanQuyenVo.RoleFunctionGrids);
    this.loadDsIsAllInsert(this.phanQuyenVo.RoleFunctionGrids);

    this.loadDsIsAllEdit(this.phanQuyenVo.RoleFunctionGrids);
    this.loadDsIsAllDelete(this.phanQuyenVo.RoleFunctionGrids);

    this.loadDsIsAllProcess(this.phanQuyenVo.RoleFunctionGrids);
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
  timKiem() {
    this.cdref.detectChanges();

    let dataGridDefault  = [...this.gridDatas];

    // tìm con -> tim cha => truy ngược lại
    let data: any[] = [];
    let dataSearch: any[] = [];
    if (this.phanQuyenQueryInfo.Ten != null && this.phanQuyenQueryInfo.Ten != "") {
      data = dataGridDefault.filter(d => d.Name == this.phanQuyenQueryInfo.Ten); // test bình thường

      if (data == null || data.length == 0) { // chuyển sang không dấu
        data = dataGridDefault.filter(d => CommonService.tranferTextKhongDau(d.Name).toUpperCase().includes(CommonService.tranferTextKhongDau(this.phanQuyenQueryInfo.Ten).toUpperCase()));
      }

      if (data == null || data.length == 0) { // chuyển sang không dấu -> chữ thường
        data = dataGridDefault.filter(d => CommonService.tranferTextKhongDau(d.Name).toUpperCase().includes(CommonService.tranferTextKhongDau(this.phanQuyenQueryInfo.Ten).toUpperCase()));
      }

      // if (data == null || data.length == 0) { // full-text-search
      //   data = this.find(this.phanQuyenVo.RoleFunctionGrids,this.phanQuyenQueryInfo.Ten);
      // }

      if (data != null && data.length != null) {
        data.forEach(element => {
           
          if(dataGridDefault.filter(d => d.Id == element.IdParent && d.GroupLevel < element.GroupLevel) != null){
            dataSearch.push(dataGridDefault.filter(d => d.Id == element.IdParent && d.GroupLevel < element.GroupLevel)[0]);
          }
          dataSearch.push(element);

          var itemChilds = dataGridDefault.filter(d => d.IdParent == element.Id);
          if (itemChilds != null && itemChilds.length != 0) {
            itemChilds.forEach(element => {
              data.push(element);
              dataSearch.push(element);
              let datas = this.parent(element)
              datas.forEach(itemCha => {
                data.push(itemCha);
                dataSearch.push(itemCha);
              });
            });
          }
        });
      }



      dataSearch = this.clearDuplicate(dataSearch);

      this.phanQuyenVo.RoleFunctionGrids = [...dataSearch];
      // console.log("data search fd:",dataSearch);
    } else {
      this.phanQuyenVo.RoleFunctionGrids = [...dataGridDefault];
      // console.log("data search:",this.phanQuyenVo.RoleFunctionGrids);
    }
    
    this.loadDsIsAllView(this.phanQuyenVo.RoleFunctionGrids);
    this.loadDsIsAllInsert(this.phanQuyenVo.RoleFunctionGrids);

    this.loadDsIsAllEdit(this.phanQuyenVo.RoleFunctionGrids);
    this.loadDsIsAllDelete(this.phanQuyenVo.RoleFunctionGrids);

    this.loadDsIsAllProcess(this.phanQuyenVo.RoleFunctionGrids);
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
    // full- text -search -- chức năng chưa test => kiểm tra lại
  find(items, text) {
      text = text.split(' ');
      return items.filter(item => {
        return text.every(el => {
          return CommonService.tranferTextKhongDau(item.Name).toUpperCase().includes(CommonService.tranferTextKhongDau(el.toUpperCase()));
        });
      });
    }

  clearDuplicate(data:any){
    var uniqueNames = [];
    if(data != null ){
      data.forEach(item => {
        if(item != undefined && item != null){
          if(uniqueNames.length == 0){
            uniqueNames.push(item);
          }else{
            var index = uniqueNames.filter(d => d.Id == item.Id && d.ExpandClass ==  item.ExpandClass);
            if(index.length == 0 ||  index == null){
              uniqueNames.push(item);
            }
          }
        }
      });
    }
  
    return uniqueNames;
  }
  parent(itemCha: any) {
    let data: any[] = [];

    let dataGridDefault  = [...this.gridDatas];
    var items = dataGridDefault.filter(d => d.IdParent == itemCha.Id && d.GroupLevel > itemCha.GroupLevel);
    if (items != null && items.length != 0) {
      items.forEach(element => {
        data.push(element);
      });
    
    }
    if (items != null && items.length != 0) {
      items.forEach(element => {
        this.parent(element);
      });
    }
    return data;
  }

  changegroup(event: any, item: any, capNhom: any) {
    event
    capNhom
    var itemIndex = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.Id && d.GroupLevel > item.GroupLevel);
    if (itemIndex != null && itemIndex.length != 0) {
      this.phanQuyenVo.RoleFunctionGrids;
      this.expandandExpanded(item);
    }
    console.log("info quyền :", itemIndex)
  }
  expandandExpanded(item: any) {
    let expandCha = null;
    this.cdref.detectChanges();

    var itemIndex = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.Id && d.ExpandClass == item.ExpandClass); //change Cha
    if (item.Id == itemIndex[0].Id) {
      itemIndex[0].IsExpand = !itemIndex[0].IsExpand;

      expandCha = itemIndex[0].IsExpand;

      this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemIndex[0].Id)[0] = itemIndex[0];




      let ArrItemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.Id); // change con

      if (ArrItemChilds != null && ArrItemChilds.length != 0) {
        ArrItemChilds.forEach(elements => {

          elements.IsExpand = expandCha;
          if (elements.IsExpand == true) {
            this.expanded(elements);
          } else {
            this.expand(elements);
          }
          let itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == elements.Id &&  d.GroupLevel > elements.GroupLevel); // change con
          if (itemChilds != null && itemChilds.length != 0) {
            itemChilds.forEach(child => {
              this.resultChild(child, expandCha);
            });

          }
        });
      }
      this.phanQuyenVo.RoleFunctionGrids = [...this.phanQuyenVo.RoleFunctionGrids];
    }

  }
  //#region
  resultChild(event: any, value: any) {

    event.IsExpand = value;
    if (event.IsExpand == true) {
      this.expanded(event);
    } else {
      this.expand(event);
    }

    let ArrItemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == event.Id &&  d.GroupLevel > event.GroupLevel); // change con

    if (ArrItemChilds != null && ArrItemChilds.length != 0) {
      ArrItemChilds.forEach(elements => {

        elements.IsExpand = value;
        if (elements.IsExpand == true) {
          this.expanded(elements);
        } else {
          this.expand(elements);
        }
        let itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == elements.Id &&  d.GroupLevel > elements.GroupLevel); // change con
        if (itemChilds != null && itemChilds.length != 0) {
          itemChilds.forEach(child => {
            this.resultChild(child, value);
          });

        }
      });
    }
    this.phanQuyenVo.RoleFunctionGrids = [...this.phanQuyenVo.RoleFunctionGrids];
  }
  expand(item) {
    $('tr.child-row' + item.ExpandClass).hide().children('td');
  }
  expanded(item) {
    $('tr.child-row' + item.ExpandClass).toggle();
  }

  valueClass(event: any, item: any) {
    if (event == 1) {
      return 'level-'+event+' parent' +(this.checkChild(item)== 0?' no-child':'');
    } else {
      return ('level-'+event+' child-row' + item.ExpandClass);
    }
  }
  valueId(event: any, item: any) {
    if (event == 1) {
      return 'row' + event + item.ExpandClass;
    }
    if (event != 1) {
      return '';
    }
  }
  valueStyle(event: any) {
    if (event == 1) {
      return 'cursor: pointer;';
    }
    if (event != 1) {
      return '';
    }
  }
  check(event: any) {
    if (event != null) {
      var itemIndex = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == event.Id && d.GroupLevel > event.GroupLevel);
      if (itemIndex != null && itemIndex.length != 0) {
        return true;
      } else {
        return false;
      }
    }
  }
  checkChild(event: any) {
    if (event != null) {
      var itemIndex = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == event.Id && d.GroupLevel > event.GroupLevel);
      if (itemIndex != null && itemIndex.length != 0) {
        return itemIndex.length;
      } else {
        return itemIndex.length;
      }
    }
  }
  //#endregion
  changeTatCa(event: any) {
    this.cdref.detectChanges();
    this.phanQuyenVo.RoleFunctionGrids.forEach(element => {
      element.IsViewAll = event;
      element.IsInsertAll = event;
      element.IsEditAll = event;
      element.IsDeleteAll = event;
      element.IsProcessAll = event;
      element.Quyens.forEach(item => {
        item.Value = event;
      });
    });
    this.phanQuyenVo.RoleFunctionGrids = [...this.phanQuyenVo.RoleFunctionGrids];
  }

  //#region  all  load Ds lần đầu
  // 0 view
  // 1 insert
  // 2 edit
  // 3 delete
  // 4 process
  checkAllMucIsDocumentType(item:any){
    let itemArrs = [];
    let items = this.phanQuyenVo.RoleFunctionGrids.filter(d=>d.IdParent == item.Id && d.GroupLevel > item.GroupLevel);
    itemArrs= [...items];
   
    itemArrs.forEach(element => {
      itemArrs = this.itemChild(element,itemArrs)
    });
    return itemArrs;
  }
  itemChild(event: any,itemArrs:any) {
    if (event != null) {
      var datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == event.Id && d.GroupLevel > event.GroupLevel);
      if (datas != null && datas.length != 0) {
        datas.forEach(element => {
          itemArrs.push(element);
        });
        datas.forEach(item => {
          this.itemChild(item,itemArrs);
        });
      } 
    }
    return itemArrs;
  }

  loadDsIsAllView(data: any){
    data.forEach(element => {
      var items  = this.checkAllMucIsDocumentType(element);
      
      let checkExitValueFalse = items.filter(d=>d.Quyens[0].Value == false && d.Quyens[0].Disabled == false && d.IsDocumentType == true);
      if(checkExitValueFalse != null && checkExitValueFalse.length != 0){
        element.IsViewAll = false;
      }else{
        element.IsViewAll = true;
      }
      
    });
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
 

  loadDsIsAllInsert(data: any){
    data.forEach(element => {
      var items  = this.checkAllMucIsDocumentType(element);

       let checkExitValueFalse = items.filter(d=>d.Quyens[1].Value == false  && d.Quyens[1].Disabled == false && d.IsDocumentType == true); // 1 insert
      if(checkExitValueFalse != null && checkExitValueFalse.length != 0){
        element.IsInsertAll = false;
      }else{
        element.IsInsertAll = true;
      }
    });
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }

  loadDsIsAllEdit(data: any){
   
    data.forEach(element => {
      var items  = this.checkAllMucIsDocumentType(element);
       
       let checkExitValueFalse = items.filter(d=>d.Quyens[2].Value == false   && d.Quyens[2].Disabled == false && d.IsDocumentType == true); // 2 edit
      if(checkExitValueFalse != null && checkExitValueFalse.length != 0){
        element.IsEditAll = false;
      }else{
        element.IsEditAll = true;
      }
    });
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  loadDsIsAllDelete(data: any){
   
    data.forEach(element => {
      var items  = this.checkAllMucIsDocumentType(element);

       let checkExitValueFalse = items.filter(d=>d.Quyens[3].Value == false  && d.Quyens[3].Disabled == false && d.IsDocumentType == true); // 3 delete
       if(checkExitValueFalse != null && checkExitValueFalse.length != 0){
         element.IsDeleteAll = false;
       }else{
         element.IsDeleteAll = true;
       }
    });
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }

  loadDsIsAllProcess(data: any){
   
    data.forEach(element => {
      var items  = this.checkAllMucIsDocumentType(element);
      
       let checkExitValueFalse = items.filter(d=>d.Quyens[4].Value == false   && d.Quyens[4].Disabled == false && d.IsDocumentType == true); // 4 process
       if(checkExitValueFalse != null && checkExitValueFalse.length != 0){
         element.IsProcessAll = false;
       }else{
         element.IsProcessAll = true;
       }
    });
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  //#endregion


  //#region  xử lý check box IsView -------------------------------------------------------------
  viewAllSelect(event: any, item: any) {
    this.cdref.detectChanges();
    let data = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.Id && d.ExpandClass == item.ExpandClass);
    // fist 
    // con 1 : gán con item bằng event 
    this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == data[0].Id ).forEach(element => {
      element.IsViewAll = event;
      
      if(element.Quyens != null && element.Quyens[0].SecurityOperation == SecurityOperation.View){
        // 0 view 
        element.Quyens[0].Value = event
        // element.IsView = event;
      } 
    });

  // con 1 :tìm con và gán tiếp
    this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == data[0].Id ).forEach(element => {
      let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == element.Id && d.GroupLevel > element.GroupLevel);
      if (datas != null && datas.length != 0) {
        datas.forEach(child => {
          this.checkAllIsView(child, event)
        });
      }
      else {
        this.checkSelectIsViewAll(element, event);
      }
    });

    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  checkAllIsView(child: any, value: any) {
    let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == child.Id && d.IsDocumentType == true);
    if(datas != null && datas.length != 0 ){
      // 
      datas.forEach(elements => {
        elements.IsViewAll = value;
  
        if(elements.Quyens != null && elements.Quyens[0].SecurityOperation == SecurityOperation.View){
          // 0 view 
          elements.Quyens[0].Value = value
          // element.IsView = event;
        } 
      });
    }else{
      child.Quyens[0].Value =value;
    }
   

    if(datas != null && datas.length != 0 ){
      // 
      datas.forEach(elements => {
        let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == elements.Id && d.GroupLevel > elements.GroupLevel);
        if (datas != null && datas.length != 0) {
          datas.forEach(child => {
            this.checkAllIsView(child, value)
          });
        }
      });
    }

    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }



  viewSelect(event: any, item: any) {
    this.checkSelectIsViewAll(item, event);

  }

  checkSelectIsViewAll(item: any, event: any) {
    // kkhi change 1 check box change data . item thuôc nhóm cha Id
    // get tất cả các nhóm con đang có nhóm IdParent
    // kiểm tra length sl check == sl length nhom => gán checkallview == true
    var itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.IdParent );

    if (itemChilds != null && itemChilds.length != 0) {
      let rowSelecteds = 0;
      itemChilds.forEach(element => {
        if(element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.View && d.Value == true) != null && 
           element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.View && d.Value == true).length != 0){
            rowSelecteds++;
           }
      });
      
      
      
      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent && d.IsDocumentType == false);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsViewAll = event;
         

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[0].SecurityOperation == SecurityOperation.View){
            // 0 view 
            itemCha[0].Quyens[0].Value = event;
             // itemCha[0].IsView = event; 
          } 
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent && d.IsDocumentType == false);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsViewAll = false;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[0].SecurityOperation == SecurityOperation.View){
            // 0 view 
            itemCha[0].Quyens[0].Value = false;
             // itemCha[0].IsView = false;
          } 
        }
      }


      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {

          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent && d.GroupLevel > itemCha[0].GroupLevel);
          if (items != null && items.length != 0) {
            this.checkAllIsViewTrees(itemCha[0], event);
          }
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent && d.GroupLevel > itemCha[0].GroupLevel);
          if (items != null && items.length != 0) {
            this.checkAllIsViewTrees(itemCha[0], event);
          }
        }
      }
    }

    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  checkAllIsViewTrees(item: any, event: any) {
    // kkhi change 1 check box change data . item thuôc nhóm cha Id
    // get tất cả các nhóm con đang có nhóm IdParent
    // kiểm tra length sl check == sl length nhom => gán checkallview == true
    var itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.IdParent);

    if (itemChilds != null && itemChilds.length != 0) {

      let rowSelecteds = 0;
      itemChilds.forEach(element => {
        if(element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.View && d.Value == true) != null && 
           element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.View && d.Value == true).length != 0){
            rowSelecteds++;
           }
      });

      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsViewAll = event;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[0].SecurityOperation == SecurityOperation.View){
            // 0 view 
            itemCha[0].Quyens[0].Value = event;
             // itemCha[0].IsView = event;
          } 


         
        
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsViewAll = false;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[0].SecurityOperation == SecurityOperation.View){
            // 0 view 
            itemCha[0].Quyens[0].Value = false;
             // itemCha[0].IsView = false;
          } 
        }
      }

      ///////
      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent);
          if (items != null && items.length != 0) {
            this.checkSelectIsViewAll(itemCha[0], event);
          }
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
       
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent);
          if (items != null && items.length != 0) {
            this.checkAllIsViewTrees(itemCha[0], event);
          }
        }
      }
    }

    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  //#endregion --------------------------------------------------------------------

  //#region  xử lý check box IsInsert -------------------------------------------------------------
  addAllSelect(event: any, item: any) {
    this.cdref.detectChanges();
    let data = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.Id && d.ExpandClass == item.ExpandClass);
    // fist 
    // con 1 : gán con item bằng event 
    this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == data[0].Id ).forEach(element => {
      element.IsInsertAll = event;
      
      if(element.Quyens != null && element.Quyens[1].SecurityOperation == SecurityOperation.Add){
        // 1 add 
        element.Quyens[1].Value = event
      } 
    });

  // con 1 :tìm con và gán tiếp
    this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == data[0].Id ).forEach(element => {
      let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == element.Id && d.GroupLevel > element.GroupLevel);
      if (datas != null && datas.length != 0) {
        datas.forEach(child => {
          this.checkAllIsInsert(child, event)
        });
      }
      else {
        this.checkSelectIsInsertAll(element, event);
      }
    });

    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  checkAllIsInsert(child: any, value: any) {
    let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == child.Id && d.IsDocumentType == true);
    if(datas != null && datas.length != 0 ){
      // 
      datas.forEach(elements => {
        elements.IsInsertAll = value;
  
        if(elements.Quyens != null && elements.Quyens[1].SecurityOperation == SecurityOperation.Add){
          // 1 add 
          elements.Quyens[1].Value = value
          
        } 
      });
    }else{
      child.Quyens[1].Value =value;
    }
   

    if(datas != null && datas.length != 0 ){
      // 
      datas.forEach(elements => {
        let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == elements.Id && d.GroupLevel > elements.GroupLevel);
        if (datas != null && datas.length != 0) {
          datas.forEach(child => {
            this.checkAllIsInsert(child, value)
          });
        }
      });
    }

    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }

  addSelect(event: any, item: any) {
    this.checkSelectIsInsertAll(item, event);

  }

  checkSelectIsInsertAll(item: any, event: any) {
     // kkhi change 1 check box change data . item thuôc nhóm cha Id
    // get tất cả các nhóm con đang có nhóm IdParent
    // kiểm tra length sl check == sl length nhom => gán checkallview == true
    var itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.IdParent );

    if (itemChilds != null && itemChilds.length != 0) {
      let rowSelecteds = 0;
      itemChilds.forEach(element => {
        if(element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Add && d.Value == true) != null && 
           element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Add && d.Value == true).length != 0){
            rowSelecteds++;
           }
      });
      
      
      
      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent && d.IsDocumentType == false);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsInsertAll = event;
         

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[1].SecurityOperation == SecurityOperation.Add){
            // 1 add 
            itemCha[0].Quyens[1].Value = event;
          } 
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent && d.IsDocumentType == false);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsInsertAll = false;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[1].SecurityOperation == SecurityOperation.Add){
            // 1 add
            itemCha[0].Quyens[1].Value = false;
          } 
        }
      }


      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {

          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent && d.GroupLevel > itemCha[0].GroupLevel);
          if (items != null && items.length != 0) {
            this.checkAllIsInsertTrees(itemCha[0], event);
          }
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent && d.GroupLevel > itemCha[0].GroupLevel);
          if (items != null && items.length != 0) {
            this.checkAllIsInsertTrees(itemCha[0], event);
          }
        }
      }
    }

    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  checkAllIsInsertTrees(item: any, event: any) {
    // kkhi change 1 check box change data . item thuôc nhóm cha Id
    // get tất cả các nhóm con đang có nhóm IdParent
    // kiểm tra length sl check == sl length nhom => gán checkallview == true
    var itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.IdParent);

    if (itemChilds != null && itemChilds.length != 0) {

      let rowSelecteds = 0;
      itemChilds.forEach(element => {
        if(element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Add && d.Value == true) != null && 
           element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Add && d.Value == true).length != 0){
            rowSelecteds++;
           }
      });

      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsInsertAll = event;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[1].SecurityOperation == SecurityOperation.Add){
            // 1 add
            itemCha[0].Quyens[1].Value = event;
          } 


         
        
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsViewAll = false;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[1].SecurityOperation == SecurityOperation.Add){
            // 0 view 
            itemCha[0].Quyens[1].Value = false;
             // itemCha[0].IsView = false;
          } 
        }
      }

      ///////
      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent);
          if (items != null && items.length != 0) {
            this.checkSelectIsInsertAll(itemCha[0], event);
          }
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
       
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent);
          if (items != null && items.length != 0) {
            this.checkAllIsInsertTrees(itemCha[0], event);
          }
        }
      }
    }
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  //#endregion --------------------------------------------------------------------

  //#region  xử lý check box IsEdit -------------------------------------------------------------
  editAllSelect(event: any, item: any) {
    this.cdref.detectChanges();
    let data = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.Id && d.ExpandClass == item.ExpandClass);
    // fist 
    // con 1 : gán con item bằng event 
    this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == data[0].Id ).forEach(element => {
      element.IsEditAll = event;
      
      if(element.Quyens != null && element.Quyens[2].SecurityOperation == SecurityOperation.Update){
        // 0 view 
        element.Quyens[2].Value = event
        // element.IsView = event;
      } 
    });

  // con 1 :tìm con và gán tiếp
    this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == data[0].Id ).forEach(element => {
      let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == element.Id && d.GroupLevel > element.GroupLevel);
      if (datas != null && datas.length != 0) {
        datas.forEach(child => {
          this.checkAllIsEdit(child, event)
        });
      }
      else {
        this.checkSelectIsEditAll(element, event);
      }
    });
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  checkAllIsEdit(child: any, value: any) {
    let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == child.Id && d.IsDocumentType == true);
    if(datas != null && datas.length != 0 ){
      // 
      datas.forEach(elements => {
        elements.IsEditAll = value;
  
        if(elements.Quyens != null && elements.Quyens[2].SecurityOperation == SecurityOperation.Update){
          // 2 view 
          elements.Quyens[2].Value = value
        } 
      });
    }else{
      child.Quyens[2].Value =value;
    }
   

    if(datas != null && datas.length != 0 ){
      // 
      datas.forEach(elements => {
        let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == elements.Id && d.GroupLevel > elements.GroupLevel);
        if (datas != null && datas.length != 0) {
          datas.forEach(child => {
            this.checkAllIsEdit(child, value)
          });
        }
      });
    }
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }


  editSelect(event: any, item: any) {
    item.IsEdit = event;
    this.checkSelectIsEditAll(item, event);

  }

  checkSelectIsEditAll(item: any, event: any) {
     // kkhi change 1 check box change data . item thuôc nhóm cha Id
    // get tất cả các nhóm con đang có nhóm IdParent
    // kiểm tra length sl check == sl length nhom => gán checkallview == true
    var itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.IdParent );

    if (itemChilds != null && itemChilds.length != 0) {
      let rowSelecteds = 0;
      itemChilds.forEach(element => {
        if(element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Update && d.Value == true) != null && 
           element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Update && d.Value == true).length != 0){
            rowSelecteds++;
           }
      });
      
      
      
      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent && d.IsDocumentType == false);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsEditAll = event;
         

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[2].SecurityOperation == SecurityOperation.Update){
            // 0 view 
            itemCha[0].Quyens[2].Value = event;
          } 
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent && d.IsDocumentType == false);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsEditAll = false;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[2].SecurityOperation == SecurityOperation.Update){
            // 0 view 
            itemCha[0].Quyens[2].Value = false;
          } 
        }
      }


      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {

          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent && d.GroupLevel > itemCha[0].GroupLevel);
          if (items != null && items.length != 0) {
            this.checkAllIsEditTrees(itemCha[0], event);
          }
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent && d.GroupLevel > itemCha[0].GroupLevel);
          if (items != null && items.length != 0) {
            this.checkAllIsEditTrees(itemCha[0], event);
          }
        }
      }
    }
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  checkAllIsEditTrees(item: any, event: any) {
     // kkhi change 1 check box change data . item thuôc nhóm cha Id
    // get tất cả các nhóm con đang có nhóm IdParent
    // kiểm tra length sl check == sl length nhom => gán checkallview == true
    var itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.IdParent);

    if (itemChilds != null && itemChilds.length != 0) {

      let rowSelecteds = 0;
      itemChilds.forEach(element => {
        if(element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.View && d.Value == true) != null && 
           element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.View && d.Value == true).length != 0){
            rowSelecteds++;
           }
      });

      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsEditAll = event;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[2].SecurityOperation == SecurityOperation.Update){
            // 2 edit 
            itemCha[0].Quyens[2].Value = event;
          } 


         
        
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsEditAll = false;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[2].SecurityOperation == SecurityOperation.Update){
            // 2 edit 
            itemCha[0].Quyens[2].Value = false;
          } 
        }
      }

      ///////
      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent);
          if (items != null && items.length != 0) {
            this.checkSelectIsEditAll(itemCha[0], event);
          }
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
       
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent);
          if (items != null && items.length != 0) {
            this.checkAllIsEditTrees(itemCha[0], event);
          }
        }
      }
    }
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  //#endregion --------------------------------------------------------------------
  //#region  xử lý check box IsDelete -------------------------------------------------------------
  deleteAllSelect(event: any, item: any) {
    this.cdref.detectChanges();
    let data = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.Id && d.ExpandClass == item.ExpandClass);
    // fist 
    // con 1 : gán con item bằng event 
    this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == data[0].Id ).forEach(element => {
      element.IsDeleteAll = event;
      
      if(element.Quyens != null && element.Quyens[3].SecurityOperation == SecurityOperation.Delete){
        // 3 Delete 
        element.Quyens[3].Value = event
        // element.IsView = event;
      } 
    });

  // con 1 :tìm con và gán tiếp
    this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == data[0].Id ).forEach(element => {
      let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == element.Id && d.GroupLevel > element.GroupLevel);
      if (datas != null && datas.length != 0) {
        datas.forEach(child => {
          this.checkAllIsDelete(child, event)
        });
      }
      else {
        this.checkSelectIsDeleteAll(element, event);
      }
    });
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  checkAllIsDelete(child: any, value: any) {
    let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == child.Id && d.IsDocumentType == true);
    if(datas != null && datas.length != 0 ){
      // 
      datas.forEach(elements => {
        elements.IsDeleteAll = value;
  
        if(elements.Quyens != null && elements.Quyens[3].SecurityOperation == SecurityOperation.Delete){
          // 3 Delete
          elements.Quyens[3].Value = value
        } 
      });
    }else{
      child.Quyens[3].Value =value;
    }
   

    if(datas != null && datas.length != 0 ){
      // 
      datas.forEach(elements => {
        let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == elements.Id && d.GroupLevel > elements.GroupLevel);
        if (datas != null && datas.length != 0) {
          datas.forEach(child => {
            this.checkAllIsDelete(child, value)
          });
        }
      });
    }
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }


  deleteSelect(event: any, item: any) {
    item.IsDelete = event;
    this.checkSelectIsDeleteAll(item, event);

  }

  checkSelectIsDeleteAll(item: any, event: any) {
    // kkhi change 1 check box change data . item thuôc nhóm cha Id
    // get tất cả các nhóm con đang có nhóm IdParent
    // kiểm tra length sl check == sl length nhom => gán checkallview == true
    var itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.IdParent );

    if (itemChilds != null && itemChilds.length != 0) {
      let rowSelecteds = 0;
      itemChilds.forEach(element => {
        if(element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Delete && d.Value == true) != null && 
           element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Delete && d.Value == true).length != 0){
            rowSelecteds++;
           }
      });
      
      
      
      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent && d.IsDocumentType == false);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsDeleteAll = event;
         

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[3].SecurityOperation == SecurityOperation.Delete){
              // 3 Delete 
            itemCha[0].Quyens[3].Value = event;
          } 
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent && d.IsDocumentType == false);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsDeleteAll = false;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[3].SecurityOperation == SecurityOperation.Delete){
            // 3 Delete 
            itemCha[0].Quyens[3].Value = false;
          } 
        }
      }


      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {

          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent && d.GroupLevel > itemCha[0].GroupLevel);
          if (items != null && items.length != 0) {
            this.checkAllIsDeleteTrees(itemCha[0], event);
          }
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent && d.GroupLevel > itemCha[0].GroupLevel);
          if (items != null && items.length != 0) {
            this.checkAllIsDeleteTrees(itemCha[0], event);
          }
        }
      }
    }
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  checkAllIsDeleteTrees(item: any, event: any) {
    // kkhi change 1 check box change data . item thuôc nhóm cha Id
    // get tất cả các nhóm con đang có nhóm IdParent
    // kiểm tra length sl check == sl length nhom => gán checkallview == true
    var itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.IdParent);

    if (itemChilds != null && itemChilds.length != 0) {

      let rowSelecteds = 0;
      itemChilds.forEach(element => {
        if(element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Delete && d.Value == true) != null && 
           element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Delete && d.Value == true).length != 0){
            rowSelecteds++;
           }
      });

      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsDeleteAll = event;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[3].SecurityOperation == SecurityOperation.Delete){
            // 3 delete 
            itemCha[0].Quyens[3].Value = event;
          } 
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsViewAll = false;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[3].SecurityOperation == SecurityOperation.Delete){
             // 3 delete 
            itemCha[0].Quyens[3].Value = false;
          } 
        }
      }

      ///////
      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent);
          if (items != null && items.length != 0) {
            this.checkSelectIsDeleteAll(itemCha[0], event);
          }
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
       
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent);
          if (items != null && items.length != 0) {
            this.checkAllIsDeleteTrees(itemCha[0], event);
          }
        }
      }
    }
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  //#endregion --------------------------------------------------------------------
  //#region  xử lý check box IsProcess -------------------------------------------------------------
  xuLyKhacAllSelect(event: any, item: any) {
    this.cdref.detectChanges();
    let data = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.Id && d.ExpandClass == item.ExpandClass);
    // fist 
    // con 1 : gán con item bằng event 
    this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == data[0].Id ).forEach(element => {
      element.IsProcessAll = event;
      
      if(element.Quyens != null && element.Quyens[4].SecurityOperation == SecurityOperation.Process){
        // 4 Process 
        element.Quyens[4].Value = event
      } 
    });

  // con 1 :tìm con và gán tiếp
    this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == data[0].Id ).forEach(element => {
      let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == element.Id && d.GroupLevel > element.GroupLevel);
      if (datas != null && datas.length != 0) {
        datas.forEach(child => {
          this.checkAllIsProcess(child, event)
        });
      }
      else {
        this.checkSelectIsProcessAll(element, event);
      }
    });
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  checkAllIsProcess(child: any, value: any) {
    let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == child.Id && d.IsDocumentType == true);
    if(datas != null && datas.length != 0 ){
      // 
      datas.forEach(elements => {
        elements.IsProcessAll = value;
  
        if(elements.Quyens != null && elements.Quyens[4].SecurityOperation == SecurityOperation.Process){
          // 4 Process 
          elements.Quyens[4].Value = value
        } 
      });
    }else{
      child.Quyens[4].Value =value;
    }
   

    if(datas != null && datas.length != 0 ){
      // 
      datas.forEach(elements => {
        let datas = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == elements.Id && d.GroupLevel > elements.GroupLevel);
        if (datas != null && datas.length != 0) {
          datas.forEach(child => {
            this.checkAllIsProcess(child, value)
          });
        }
      });
    }
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }

  xuLyKhacSelect(event: any, item: any) {
    item.IsProcess = event;
    this.checkSelectIsProcessAll(item, event);

  }

  checkSelectIsProcessAll(item: any, event: any) {
     // kkhi change 1 check box change data . item thuôc nhóm cha Id
    // get tất cả các nhóm con đang có nhóm IdParent
    // kiểm tra length sl check == sl length nhom => gán checkallview == true
    var itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.IdParent );

    if (itemChilds != null && itemChilds.length != 0) {
      let rowSelecteds = 0;
      itemChilds.forEach(element => {
        if(element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Process && d.Value == true) != null && 
           element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Process && d.Value == true).length != 0){
            rowSelecteds++;
           }
      });
      
      
      
      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent && d.IsDocumentType == false);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsProcessAll = event;
         

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[4].SecurityOperation == SecurityOperation.Process){
            // 4 Process 
            itemCha[0].Quyens[4].Value = event;
          } 
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent && d.IsDocumentType == false);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsProcessAll = false;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[0].SecurityOperation == SecurityOperation.Process){
            // 4 Process 
            itemCha[0].Quyens[4].Value = false;
          } 
        }
      }


      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {

          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent && d.GroupLevel > itemCha[0].GroupLevel);
          if (items != null && items.length != 0) {
            this.checkAllIsProcessTrees(itemCha[0], event);
          }
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent && d.GroupLevel > itemCha[0].GroupLevel);
          if (items != null && items.length != 0) {
            this.checkAllIsProcessTrees(itemCha[0], event);
          }
        }
      }
    }
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  checkAllIsProcessTrees(item: any, event: any) {
    // kkhi change 1 check box change data . item thuôc nhóm cha Id
    // get tất cả các nhóm con đang có nhóm IdParent
    // kiểm tra length sl check == sl length nhom => gán checkallview == true
    var itemChilds = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.IdParent == item.IdParent);

    if (itemChilds != null && itemChilds.length != 0) {

      let rowSelecteds = 0;
      itemChilds.forEach(element => {
        if(element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Process && d.Value == true) != null && 
           element.Quyens.filter(d=>d.SecurityOperation == SecurityOperation.Process && d.Value == true).length != 0){
            rowSelecteds++;
           }
      });

      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsProcessAll = event;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[4].SecurityOperation == SecurityOperation.Process){
            // 4 Process 
            itemCha[0].Quyens[4].Value = event;
          } 


         
        
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          itemCha[0].IsProcessAll = false;

          if( itemCha[0].Quyens != null &&  itemCha[0].Quyens[4].SecurityOperation == SecurityOperation.Process){
            // 4 Process 
            itemCha[0].Quyens[4].Value = false;
          } 
        }
      }

      ///////
      if (rowSelecteds == itemChilds.length) {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent);
          if (items != null && items.length != 0) {
            this.checkSelectIsProcessAll(itemCha[0], event);
          }
        }

      }
      else {
        var itemCha = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == item.IdParent);
        if (itemCha != null && itemCha.length != 0) {
       
          let items = this.phanQuyenVo.RoleFunctionGrids.filter(d => d.Id == itemCha[0].IdParent);
          if (items != null && items.length != 0) {
            this.checkAllIsProcessTrees(itemCha[0], event);
          }
        }
      }
    }
    this.loadIsCheckAllQuyen(this.phanQuyenVo.RoleFunctionGrids);
  }
  //#endregion --------------------------------------------------------------------

}
