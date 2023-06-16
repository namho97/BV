using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs
{
    public  class EnumMucDoChuYKhiChiDinh
    {
        public enum MucDoChuYKhiChiDinh
        {
            [Description("Cần theo dõi")]
            TheoDoi = 1,
            [Description("Cần thận trọng")]
            ThanTrong = 2,
            [Description("Cân nhắc nguy cơ/ lợi ích")]
            CanNhac = 3,
            [Description("Chống chỉ định")]
            ChongChiDinh = 4
        }
        public enum MucDoTuongTac
        {
            [Description("Cần theo dõi")]
            TheoDoi = 1,
            [Description("Cần thận trọng")]
            ThanTrong = 2,
            [Description("Cân nhắc nguy cơ/ lợi ích")]
            CanNhac = 3,
            [Description("Phối hợp nguy hiểm")]
            NguyHiem = 4
        }
    }
}
