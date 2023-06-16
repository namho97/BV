
using static Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus.NoiDungMauEnum;

namespace Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus
{
    public class NoiDungMau : BaseEntity
    {
        public LoaiNoiDungMauEnum Loai { get; set; }
        public string NoiDung { get; set; } = null!;
    }
}
