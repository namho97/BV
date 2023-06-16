using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs
{
    public class TuongTacThuocGridVo:GridItem
    {
        public string? HoatChat1 { get; set; }
        public string? HoatChat2 { get; set; }
        public string? MucDoChuYKhiChiDinh{ get; set; }
        public string? MucDoTuongTac { get; set; }
        public string? DuocDongHoc { get; set; }
        public string? DuocLucHoc { get; set; }
        public string? ThuocThucAn { get; set; }
        public string? QuyTac { get; set; }
        public string? TuongTacHauQua { get; set; }
        public string? CachXuLy { get; set; }
    }
}
