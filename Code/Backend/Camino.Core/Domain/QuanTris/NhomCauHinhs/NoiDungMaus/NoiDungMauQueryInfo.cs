
using static Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus.NoiDungMauEnum;

namespace Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus
{
    public class NoiDungMauQueryInfo : QueryInfo
    {
        public LoaiNoiDungMauEnum? Loai { get; set; }
        public string? NoiDung { get; set; }
    }
    public class NoiDungMauLookupQueryInfo : LookupQueryInfo
    {
        public LoaiNoiDungMauEnum Loai { get; set; }
    }
}
