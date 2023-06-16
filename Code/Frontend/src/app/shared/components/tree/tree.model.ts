
export class TreeViewNode{
  ParentNodeId?: any = null;
  NodeId?: any = null;
  NodeName: string = null;
  Disabled?: boolean = false;
  Hide?: boolean = false;
  Icon?:string=null;
  IconColorClass?:string=null;
  IconTooltip?:string=null;
  UseTemplate?:boolean=false;
  TotalChild?:number=null;
  LazyLoadChild?:boolean=false;
  ShowMenuContext?:boolean=false;
  AdditionalObject?: any = null;
  Selected?:boolean=false;
  Indeterminate?:boolean=false;
  AddNode?:boolean=false;
  AddNodeTitle?:string=null;
  ParentNodeNoAccess?:boolean=false;//Parent node không quản lý của nhân viên
  NodeChilds: TreeViewNode[] = [];
}

export class TreeViewFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  nodeId?: any;
  parentNodeId?: any = null;
  selected?: boolean = false;
  disabled?: boolean = false;
  hide?: boolean = false;
  icon?:string=null;
  iconColorClass?:string=null;
  iconTooltip?:string=null;
  useTemplate:boolean=false;
  hasChild:boolean=false;
  totalChild:number=null;
  lazyLoadChild:boolean=false;
  showMenuContext:boolean=false;
  additionalObject: any = null;
  indeterminate:boolean=false;
  addNode?:boolean=false;
  addNodeTitle?:string=null;
  isUpdate?:boolean = false;
  breadcrumbs?:string=null;
  parentNodeNoAccess?:boolean=false;//Parent node không quản lý của nhân viên
  parentNodeIds?:any[]=[];
}
export class TreeQueryInfo {
  constructor(
    public SearchString: string = null,
    public Ids:any[]=[],
    public OnlyIds:any[]=[]
  ) {
  }
}