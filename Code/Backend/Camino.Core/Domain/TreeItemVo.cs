namespace Camino.Core.Domain
{
    public class TreeItemVo
    {
        public long? ParentNodeId { get; set; }
        public long? NodeId { get; set; }
        public string? NodeName { get; set; }
        public bool? Disabled { get; set; }
        public bool? Hide { get; set; }
        public string? Icon { get; set; }
        public string? IconColorClass { get; set; }
        public string? IconTooltip { get; set; }
        public bool? UseTemplate { get; set; }
        public int? TotalChild { get; set; }
        public bool? LazyLoadChild { get; set; }
        public bool? ShowMenuContext { get; set; }
        public dynamic? AdditionalObject { get; set; }
        public bool? Selected { get; set; }
        public bool? Indeterminate { get; set; }
        public bool? AddNode { get; set; }
        public string? AddNodeTitle { get; set; }
        public bool? ParentNodeNoAccess { get; set; }//Parent node không quản lý của nhân viên
        public List<TreeItemVo>? NodeChilds { get; set; }
    }
}
