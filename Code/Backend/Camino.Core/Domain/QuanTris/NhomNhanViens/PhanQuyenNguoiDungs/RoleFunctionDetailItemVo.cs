namespace Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs
{
    public class RoleFunctionDetailItemVo
    {
        public RoleFunctionDetailItemVo()
        {
            Quyens = new List<ChiTietQuyenVo>();
        }

        public int Id { get; set; }
        public bool IsDocumentType { get; set; }
        public string Name { get; set; } = null!;
        public int GroupLevel { get; set; }
        public int? IdParent { get; set; }
        public string ExpandClass => $"{Id}{IdParent}";
        public bool IsExpand { get; set; } = true;
        public List<ChiTietQuyenVo> Quyens { get; set; }

        public bool IsInsertAll { get; set; }
        public bool IsEditAll { get; set; }
        public bool IsDeleteAll { get; set; }
        public bool IsViewAll { get; set; }
        public bool IsProcessAll { get; set; }
    }

    public class ChiTietQuyenVo
    {
        public SecurityOperation SecurityOperation { get; set; }
        public bool Disabled { get; set; }
        public bool Value { get; set; }
    }
}
