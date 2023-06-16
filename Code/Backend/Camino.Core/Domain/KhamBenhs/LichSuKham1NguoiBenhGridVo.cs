using Camino.Core.Helpers;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Core.Domain.KhamBenhs
{
    public class LichSuKham1NguoiBenhGridVo : GridItem
    {

        public string? LyDoKhamBenh { get; set; }
        public string? NoiDungChanDoan { get; set; }
        public CachGiaiQuyetEnum? CachGiaiQuyet { get; set; }
        public string? CachGiaiQuyetHienThi => CachGiaiQuyet?.GetDescription();
        public string? BacSiKham { get; set; }
        public DateTime? NgayHoanThanhKham { get; set; }
        public string? NgayHoanThanhKhamHienThi => NgayHoanThanhKham?.ApplyFormat();
    }

}
