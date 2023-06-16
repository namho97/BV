using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs.EnumMucDoChuYKhiChiDinh;

namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs
{
    public class TuongTacThuoc:BaseEntity
    {
        public long ThuocHoacHoatChat1Id { get; set; }
        public long ThuocHoacHoatChat2Id { get; set; }

        public MucDoChuYKhiChiDinh? MucDoChuYKhiChiDinh { get; set; }
        public MucDoTuongTac? MucDoTuongTac { get; set; }
        public bool? DuocDongHoc { get; set; }
        public bool? DuocLucHoc { get; set; }
        public bool? ThuocThucAn { get; set; }
        public bool? QuyTac { get; set; }
        public string? TuongTacHauQua { get; set; }
        public string? CachXuLy { get; set; }
        public string? GhiChu { get; set; }

        public virtual ThuocHoacHoatChat? ThuocHoacHoatChat1 { get; set; }
        public virtual ThuocHoacHoatChat? ThuocHoacHoatChat2 { get; set; }
    }
}
