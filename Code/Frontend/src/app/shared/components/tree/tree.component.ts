import { FlatTreeControl } from "@angular/cdk/tree";
import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTreeFlattener, MatTreeFlatDataSource } from "@angular/material/tree";
import { BaseService } from "src/app/core/services/base.service";
import { CommonService } from "src/app/core/utilities/common.helper";
import { LoadingComponent } from "src/app/shared/components/loading/loading.component";
import { TreeQueryInfo, TreeViewFlatNode, TreeViewNode } from "./tree.model";
declare let $: any;

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, AfterViewInit {
  dataSourceBackup: any;
  searchString: string;
  nodeSelected: any;

  popupLoadingData: any;
  validationErrors: any;
  searchNodeString: string = null;
  statusOpenSearchForm: boolean = false;
  getDataTimeout:any=null;
  @Input() id: string;//Required
  @Input() model: any = null;
  @Input() onlyIds:any[]=null;//Khi muốn hiển thị cây chỉ có những node có Id này
  @Input() dataSource: any = null;
  @Input() urlGetData: string = null;
  @Input() treeQueryInfo: TreeQueryInfo;
  @Input() additionalSearchObject: any = null;
  @Input() headerTemplate: any = null;
  @Input() heightToolbar: number = 173;
  @Input() height: number = null;
  @Input() maxHeight: number = null;
  @Input() isExpandAll: boolean = false;
  @Input() nodeTemplate: any = null;
  @Input() useAddDeault: boolean = false;
  @Input() addLabel: string = "Thêm";
  @Input() showIconOpenSearchForm: boolean = true;
  @Input() menuContextTemplate: any = null;//Chỉ apply cho node ko dùng template
  @Input() useCheckbox: boolean = false;
  @Input() hideHeader: boolean = false;
  @Input() searchOnLocal: boolean = false;
  @Input() loadDataWhenModelChange: boolean = false;
  @Input() disableIfNoAccess: boolean = false;
  @Output() extOnSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() extOnCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() extOnGetChildForNode: EventEmitter<any> = new EventEmitter<any>();
  @Output() extOnSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() extOnCheckboxSelection: EventEmitter<any> = new EventEmitter<any>();
  @Output() extOnSaveAddNode: EventEmitter<any> = new EventEmitter<any>();
  @Output() extOnDataBound = new EventEmitter<any>();


  //#region tree khu vực khai báo
  nestedNodeMap = new Map<TreeViewNode, TreeViewFlatNode>();
  flatNodeMap = new Map<TreeViewFlatNode, TreeViewNode>();
  private _transformer = (node: TreeViewNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      (existingNode && existingNode.nodeId === node.NodeId && existingNode.nodeId === node.NodeId)
        ? existingNode : new TreeViewFlatNode();
    flatNode.expandable = !!node.NodeChilds && node.NodeChilds.length > 0;
    flatNode.name = node.NodeName;
    flatNode.level = level;
    flatNode.nodeId = node.NodeId;
    flatNode.parentNodeId = node.ParentNodeId;
    flatNode.disabled = node.Disabled;
    flatNode.hide = node.Hide;
    flatNode.selected = node.Selected;
    flatNode.icon = node.Icon;
    flatNode.iconColorClass = node.IconColorClass;
    flatNode.useTemplate = node.UseTemplate;
    flatNode.hasChild = (!!node.NodeChilds && node.NodeChilds.length > 0) || node.LazyLoadChild;
    flatNode.totalChild = node.TotalChild;
    flatNode.lazyLoadChild = node.LazyLoadChild;
    flatNode.showMenuContext = node.ShowMenuContext;
    flatNode.additionalObject = node.AdditionalObject;
    flatNode.indeterminate = node.Indeterminate;
    flatNode.addNode = node.AddNode;
    flatNode.addNodeTitle = node.AddNodeTitle;
    flatNode.iconTooltip = node.IconTooltip;
    flatNode.parentNodeNoAccess=node.ParentNodeNoAccess;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };


  public treeControl = new FlatTreeControl<TreeViewFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.NodeChilds
  );
  dataSourceFlat = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  //=============================================================================
  //#endregion

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private baseService: BaseService) {
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    var self = this;
    setTimeout(function () {
      self.formatHeight();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.model && changes.model.currentValue) {    
     
      if(this.loadDataWhenModelChange)
      {
        var self=this;
        if(this.getDataTimeout!=null)
        {
          clearTimeout(this.getDataTimeout);
        }
        this.getDataTimeout=setTimeout(function(){
          self.getData();
        },1000);
      }
    }
  }
  formatHeight() {
    if ($("#" + this.id).find(".content") != null && $("#" + this.id).find(".content").length > 0) {
      if (this.maxHeight != null) {
        $("#" + this.id).css({ "max-height": this.maxHeight + 'px' });
      }
      else {
        if (this.height != null && this.height > 0) {
          $("#" + this.id).find(".content").css({ "height": this.height });
        }
        else {
          if (this.heightToolbar != null && this.heightToolbar > 0) {
            $("#" + this.id).find(".content").css({ "height": $(window).height() - this.heightToolbar });
          }
          else {
            $("#" + this.id).find(".content").css({ "height": $(window).height() - 220 });
          }
        }
      }
    }
  }
  //#region tree khu vực xử lý
  onKeyChangeTimKiem(event) {
    if (event.key == "Enter") {
      this.getData();
    }
  }
  setUpSearchQueryInfo(){
    let searchText = this.searchString != undefined ? this.searchString : '';
    this.treeQueryInfo = { SearchString: searchText,Ids:(Array.isArray(this.model)?this.model:[]),OnlyIds:this.onlyIds};
    if(this.additionalSearchObject!=null)
    {
      this.treeQueryInfo={...this.treeQueryInfo,...this.additionalSearchObject};
    }
  }

  getData() {
    if (this.dataSource != null) {
      this.dataSourceFlat.data = this.dataSource;
      this.dataSourceBackup = this.dataSource;
      if (this.isExpandAll) {
        this.treeControl.expandAll();
      }
      var self=this;
      setTimeout(function(){
        self.setSelectNodeFromModel();
      })
    }
    else {
      this.setUpSearchQueryInfo();
      let dialogLoading = this.dialog.open(LoadingComponent);
      this.baseService.getDataForTree(this.treeQueryInfo, this.urlGetData)
        .subscribe(
          (resultData: any) => {
            if (resultData != undefined && resultData != null) {
              this.dataSourceFlat.data = resultData;
              this.dataSourceBackup = resultData;
            }
            else{
              this.dataSourceFlat.data = [];
              this.dataSourceBackup = [];
            }
            // if(this.model!=null)
            // {
            //   this.expandItem(this.model);
            // }
            var self=this;
            setTimeout(function(){
              self.setSelectNodeFromModel();
            })
            this.extOnDataBound.emit(resultData);
            dialogLoading.close();
          },
          (err: any) => {
            dialogLoading.close();
            if (err.Message == "The wait operation timed out") {
              CommonService.openSnackBar(this.snackBar, "Có lỗi xảy ra trong quá trình trả về dữ liệu. Bạn hãy giới hạn tìm kiếm lại. Cảm ơn.", "error");
            }
            else {
              //console.log(err);
              //this.notificationService.showError("Có lỗi xảy ra trong quá trình gửi yêu cầu lên server. Bạn hãy tải lại trang. Cảm ơn.");
            }
          });
    }
  }
  setSelectNodeFromModel(){
    if(Array.isArray(this.model))
    {
      this.model.forEach(item=>{        
        var nodeReturn=this.expandItem(item);
        if(nodeReturn!=null)
        {
          this.checkNode(true,nodeReturn);
        }
      });
    }
    else{
      var nodeReturn=this.expandItem(this.model);
      if(nodeReturn!=null)
      {
        this.checkNode(true,nodeReturn);
      }
    }
    if (this.isExpandAll) {
      this.treeControl.expandAll();
    }
  }

  expandItem(nodeId) {
    var nodeReturn=null;
    if(this.treeControl.dataNodes!=undefined)
    {
      var nodes = this.treeControl.dataNodes.filter(x => x.nodeId == nodeId);
      if (nodes != undefined && nodes.length > 0) {
        nodeReturn=nodes[0];
        this.treeControl.expand(nodes[0]);
        if (nodes[0].parentNodeId != null) {
          this.expandItem(nodes[0].parentNodeId);
        }
      }
    }
    return nodeReturn;
  }

  hasChild = (_: number, node: TreeViewFlatNode) => node.hasChild;
  hasNoContent = (_: number, node: TreeViewFlatNode) => node.name === '';
  nodeSelectedBreadcrumbs: string = "";
  parentNodeIds:any[]=[];
  findNodeAllParent(parentNodeId: any) {
    var items = this.treeControl.dataNodes.filter(o => o.nodeId == parentNodeId);
    if (items != null && items.length > 0) {
      var item = items[0];
      this.nodeSelectedBreadcrumbs = item.name + " > " + this.nodeSelectedBreadcrumbs;
      this.parentNodeIds.push(parentNodeId);
      if (item.parentNodeId != null) {
        return this.findNodeAllParent(item.parentNodeId);
      }
    }
    if(this.nodeSelectedBreadcrumbs.substring(this.nodeSelectedBreadcrumbs.length-3,this.nodeSelectedBreadcrumbs.length)===" > ")
    {
      this.nodeSelectedBreadcrumbs=this.nodeSelectedBreadcrumbs.slice(0,-3);
    }
    return this.nodeSelectedBreadcrumbs;
  }
  toggleLazyLoadNode(node: any) {
    this.extOnGetChildForNode.emit(node);
  }
  onRightClick(event: MouseEvent, node: any, actionMenuTrigger) {
    if (event.type === "contextmenu" && this.menuContextTemplate != null) {
      actionMenuTrigger.openMenu();
      setTimeout(function(){
        $(".cdk-overlay-connected-position-bounding-box").css({'left':event.clientX + 'px','top':event.clientY + 'px'});
      })
      this.selectNode(node);
    }
  }
  @HostListener('document:contextmenu', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.type === "contextmenu") {
      if (this.menuContextTemplate != null) {
        event.preventDefault();
        setTimeout(function () {
        }, 100);
      }
    }
  }
  selectNode(node: TreeViewFlatNode) {
    if (node != undefined && node != null) {
      this.model = node.nodeId;
      this.nodeSelectedBreadcrumbs="";
      this.parentNodeIds=[];
      node.breadcrumbs=this.findNodeAllParent(node.nodeId);
      node.parentNodeIds=this.parentNodeIds.reverse();
      this.extOnSelected.emit(node);
      this.nodeSelected = { ...node };
      // if(node.lazyLoadChild)
      // {        
      //   this.extOnGetChildForNode.emit(node);
      // }
    }
  }
  getChildForNode(node: TreeViewFlatNode, childs: TreeViewNode[]) {
    if (!node.expandable) {
      const parentNode = this.flatNodeMap.get(node);
      parentNode.Selected = node.selected;
      parentNode.NodeChilds = childs;
      var self = this;
      parentNode.NodeChilds.forEach(item => {
        const index: number = self.treeControl.dataNodes.findIndex(o => o.nodeId == item.NodeId);
        if (index !== -1) {
          self.treeControl.dataNodes.splice(index, 1);
        }
        item.Selected = node.selected;
        var flat = self._transformer(item, node.level + 1);
        if (flat) {
          flat.selected = node.selected;
          self.treeControl.dataNodes.push(flat);
        }
      });
      this.treeControl.expand(node);
      this.dataSourceFlat.data = this.dataSourceFlat.data.slice();
      this.submitCheckboxSelection();
    }
    else {
      const parentNode = this.flatNodeMap.get(node);
      parentNode.NodeChilds = [];
      var self = this;
      childs.forEach(item => {
        const index: number = self.treeControl.dataNodes.findIndex(o => o.nodeId == item.NodeId);
        if (index !== -1) {
          self.treeControl.dataNodes.splice(index, 1);
        }
      });
      this.dataSourceFlat.data = this.dataSourceFlat.data.slice();
    }
    // if(node.expandable)
    // {
    //   const parentNode = this.flatNodeMap.get(node);
    //   parentNode.NodeChilds=childs;
    //   const data = this.dataSourceFlat.data
    //   this.dataSourceFlat.data = [];
    //   this.dataSourceFlat = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener, data);
    //   this.expandItem(node.nodeId);
    // }
  }
  findNode(item: any, newData: any) {

    if (item.NodeChilds!=null && item.NodeChilds.length > 0) {
      item.NodeChilds.forEach(itemChild => {
        return this.findNode(itemChild, newData);
      });
      if (new RegExp(this.searchString, 'i').test(item.NodeName) === false) {
        if (item.NodeChilds.filter(o => o.Hide == null).length > 0) {
          item.Hide = null;
        }
        else {
          item.Hide = true;
        }
      } else {
        item.Hide = null;
      }
    }
    else {
      if (new RegExp(this.searchString, 'i').test(item.NodeName) === false) {
        item.Hide = true;
      } else {
        item.Hide = null;
      }
    }
  }

  tim() {
    if(this.searchOnLocal)
    {
      
      this.showPopupLoadingData("Đang tìm dữ liệu...");
      var newData= [];
      this.dataSourceBackup.forEach(val => newData.push(Object.assign({}, val)));
      this.dataSourceFlat=null;
      this.dataSourceFlat = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      var self=this;
      setTimeout(function(){
        newData.forEach(item => {
          item.Hide=null;
          self.findNode(item,newData);
        });
        self.dataSourceFlat.data=newData;
        if(self.searchString!=null && self.searchString!="")
        {
          self.treeControl.expandAll();
        }
        else{
          self.treeControl.collapseAll();
        }
        self.closePopupLoadingData();
      });

    }
    else{
      if (this.dataSource == null) {
        this.getData();
      } else {
          this.extOnSearch.emit(this.searchString);
      }
    }
  }
  huyTimKiem() {
    this.searchString = "";
    this.tim();
  }
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
  //#endregion
  create() {
    this.extOnCreated.emit(true);
  }
  //#region  checkbox

  checkNode(event, node: TreeViewFlatNode) {
    // xử lý chọn node hiện tại
    node.selected = event;
    node.indeterminate = false;
    const nestedNode = this.flatNodeMap.get(node);
    nestedNode.Selected = event;
    nestedNode.Indeterminate = false;

    this.processNodeChild(node, event);
    this.checkAllParentsSelection(node);
    this.refreshDataTree();
    this.submitCheckboxSelection();
  }
  submitCheckboxSelection() {
    var listSelectionParentOnly = [];
    const data = this.dataSourceFlat.data.filter(o=>o.Indeterminate==true || o.Selected==true);
    this.getAllCheckParentOnly(data,listSelectionParentOnly);

    var listSelectionParentAccessOnly = [];
    const dataAccess = this.dataSourceFlat.data.filter(o=>o.Indeterminate==true || o.Selected==true);
    this.getAllCheckParentAccessOnly(dataAccess,listSelectionParentAccessOnly);

    var listSelection = [];
    var dataNodesSelection = this.treeControl.dataNodes.filter(o => o.selected == true);
    dataNodesSelection.forEach((item) => {
      const nestedNode = this.flatNodeMap.get(item);
      listSelection.push(nestedNode.NodeId);
    })
    this.extOnCheckboxSelection.emit({SelectionAll:listSelection,SelectionParentOnly:listSelectionParentOnly,SelectionParentAccessOnly:listSelectionParentAccessOnly});
  }
  getAllCheckParentOnly(data:any[],listSelection:any[]){
    if(data!=null && data.length>0)
    {
      data.forEach(item=>{
        if(item.Selected)
        {
          listSelection.push(item.NodeId);
        }
        else{
          if(item.NodeChilds!=null && item.NodeChilds.filter(o=>o.Indeterminate==true || o.Selected==true).length>0)
          {
            this.getAllCheckParentOnly(item.NodeChilds.filter(o=>o.Indeterminate==true || o.Selected==true),listSelection);
          }
        }
      });
    }
  }
  getAllCheckParentAccessOnly(data:any[],listSelection:any[]){
    if(data!=null && data.length>0)
    {
      data.forEach(item=>{
        if(item.Selected && item.ParentNodeNoAccess!=true)
        {
          listSelection.push(item.NodeId);
        }
        else{
          if(item.NodeChilds!=null && item.NodeChilds.filter(o=>o.Indeterminate==true || o.Selected==true).length>0)
          {
            this.getAllCheckParentAccessOnly(item.NodeChilds.filter(o=>o.Indeterminate==true || o.Selected==true),listSelection);
          }
        }
      });
    }
  }
  processNodeChild(node: TreeViewFlatNode, isSelected: boolean = true) {
    var self = this;
    // xử lý chọn node con
    var lstNodeChild = this.treeControl.dataNodes.filter(x => x != node
      && x.selected != isSelected
      && ((x.nodeId == node.nodeId) || x.parentNodeId == node.nodeId));
    if (lstNodeChild.length > 0) {
      lstNodeChild.forEach(element => {
        element.selected = isSelected;
        node.indeterminate = false;
        const nestedNode = this.flatNodeMap.get(element);
        nestedNode.Selected = isSelected;
        nestedNode.Indeterminate = false;    
        if (nestedNode.NodeChilds!=null && nestedNode.NodeChilds.length > 0) {
          self.processNodeChild(element, isSelected);
        }
      });
    }
  }
  processNodeParent(node: TreeViewFlatNode, isSelected: boolean = true) {
    var self = this;
    // xử lý chọn node con
    var lstNodeChild = this.treeControl.dataNodes.filter(x => x != node
      && x.selected != isSelected
      && ((x.nodeId == node.nodeId) || x.parentNodeId == node.nodeId));
    if (lstNodeChild.length > 0) {
      lstNodeChild.forEach(element => {
        element.selected = isSelected;
        const nestedNode = this.flatNodeMap.get(element);
        nestedNode.Selected = isSelected;
        if (nestedNode.NodeChilds.length > 0) {
          self.processNodeChild(element, isSelected);
        }
      });
    }
  }
  refreshDataTree() {
    const data = this.dataSourceFlat.data
    this.dataSourceFlat.data = [];
    this.dataSourceFlat = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener, data);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TreeViewFlatNode): void {
    let parent: TreeViewFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TreeViewFlatNode): void {

    const nodeSelected = node.selected;
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return child.selected;
      });
    const descAtLeastSelected =
      descendants.length > 0 &&
      descendants.filter(child => {
        return child.selected;
      });
    if (!descAllSelected && descAtLeastSelected.length > 0) {
      node.indeterminate = true;
      const nestedNode = this.flatNodeMap.get(node);
      nestedNode.Indeterminate = true;
    }
    else {
      node.indeterminate = null;
      const nestedNode = this.flatNodeMap.get(node);
      nestedNode.Indeterminate = null;
    }
    if (nodeSelected && !descAllSelected) {
      node.selected = false;
      const nestedNode = this.flatNodeMap.get(node);
      nestedNode.Selected = false;
    } else if (!nodeSelected && descAllSelected) {
      node.selected = true;
      const nestedNode = this.flatNodeMap.get(node);
      nestedNode.Selected = true;
    }
  }

  /* Get the parent node of a node */
  getLevel = (node: TreeViewFlatNode) => node.level;
  getParentNode(node: TreeViewFlatNode): TreeViewFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
  //#endregion checkbox

  /** Select the category so we can insert the new item. */
  addNewItem(node: TreeViewFlatNode) {
    if (this.treeControl.dataNodes.findIndex(x => x.name == null || x.name == '') != -1) {
      CommonService.openSnackBar(this.snackBar, "Có " + node.addNodeTitle + " chưa lưu", "error");
      return;
    }

    const parentNode = this.flatNodeMap.get(node);
    if (parentNode.NodeChilds) {
      var newNode = { ParentNodeId: node.nodeId, NodeName: '' } as TreeViewNode;
      parentNode.NodeChilds.push(newNode);
      var nestedNode = this.nestedNodeMap.get(newNode);
      this.treeControl.dataNodes.push(nestedNode);
      this.refreshDataTree();
    }
  }

  /** Save the node to database */
  saveNode(node: TreeViewFlatNode, itemValue: string) {
    if (itemValue == null || itemValue == "") {
      CommonService.openSnackBar(this.snackBar, "Tên yêu cầu nhập", "error");
      return;
    }
    node.name = itemValue;
    const nestedNode = this.flatNodeMap.get(node);
    nestedNode.NodeName = itemValue;
    this.refreshDataTree();
    this.extOnSaveAddNode.emit(nestedNode);
  }
  deleteNode(node: TreeViewFlatNode) {
    if (node.parentNodeId != null) {
      var parentFlatNodes = this.treeControl.dataNodes.filter(x => x.nodeId == node.parentNodeId);
      if (parentFlatNodes != undefined && parentFlatNodes != null && parentFlatNodes.length > 0) {
        const parentNode = this.flatNodeMap.get(parentFlatNodes[0]);
        if (parentNode != undefined && parentNode != null) {
          parentNode.NodeChilds = parentNode.NodeChilds.filter(x => x.NodeId != null);
        }
      }
    }
    else {
      this.dataSourceFlat.data = this.dataSourceFlat.data.filter(x => x.NodeId != null);
    }
    this.refreshDataTree();
  }

}
