export interface TableColumn<T> {
    index?:number;
    label: string;
    property: keyof T | string;
    type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'index' | 'expanded';
    visible?: boolean;
    cssClasses?: string[];
    template?:any;
    columnHeaderTemplate?:any;
    width?:number;
    minWidth?:number;
    isLink?:boolean;
    useActionDefault?:boolean;
    hideFilter?:boolean;
    disableFilter?:boolean;
    sortable?:boolean;
  }

export class TableQueryInfo {
  constructor(
    public skip: number,
    public take: number,
    public pageSize: number,
    public searchString: string = null,
    //public additionalSearchString: string,
    public sort: SortDescriptor[],
    public lazyLoadPage: boolean,
  ) {
  }
}
export interface SortDescriptor {
  /**
   * The field that is sorted.
   */
  field: string;
  /**
   * The sort direction. If no direction is set, the descriptor will be skipped during processing.
   *
   * The available values are:
   * - `asc`
   * - `desc`
   */
  dir?: 'asc' | 'desc';
}
export class Group {
  level = 0;
  parent: Group;
  expanded = true;
  totalCounts = 0;
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}
