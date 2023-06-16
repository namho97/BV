using static Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus.NoiDungMauEnum;

namespace Camino.Api.Models.QuanTri.NhomCauHinh.NoiDungMaus
{
    public class NoiDungMauViewModel : BaseViewModel
    {
        public LoaiNoiDungMauEnum Loai { get; set; }
        public string NoiDung { get; set; }
    }
}
