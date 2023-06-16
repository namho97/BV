using Camino.Core.Helpers;
using static Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus.NoiDungMauEnum;

namespace Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus
{
    public class NoiDungMauGridVo : GridItem
    {
        public LoaiNoiDungMauEnum Loai { get; set; }
        public string LoaiHienThi => Loai.GetDescription();
        public string NoiDung { get; set; }
    }
}
