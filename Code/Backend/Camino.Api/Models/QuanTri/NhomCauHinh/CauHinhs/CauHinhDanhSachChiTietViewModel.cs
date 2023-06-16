using Camino.Core.Domain;

namespace Camino.Api.Models.QuanTri.NhomCauHinh.CauHinhs
{
    public class CauHinhDanhSachChiTietViewModel
    {
        public string KeyId { get; set; }
        public string DisplayName { get; set; }
        public string Value { get; set; }
        public string GhiChu { get; set; }
        public DataType? DataType { get; set; }
        public bool IsDisabled { get; set; }
    }
}
