using static Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus.NoiDungMauEnum;

namespace Camino.Core.Domain
{
    public class SaveAutocompleteVo
    {
        public string? Value { get; set; }
    }
    public class SaveAutocompleteNoiDungMauVo
    {
        public LoaiNoiDungMauEnum Loai { get; set; }
        public string? Value { get; set; }
    }
}
