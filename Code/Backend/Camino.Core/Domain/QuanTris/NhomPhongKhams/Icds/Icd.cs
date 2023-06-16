using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds
{
    public class Icd : BaseEntity
    {
        public string Ma { get; set; } = "";
        public string TenTiengViet { get; set; } = "";
        public string TenTiengAnh { get; set; } = "";

        public LoaiGioiTinh? GioiTinh { get; set; }

        public bool? ManTinh { get; set; }
        public bool? BenhThuongGap { get; set; }
        public bool? BenhNam { get; set; }
        public bool? KhongBaoHiem { get; set; }
        public bool? NgoaiDinhSuat { get; set; }

        public string? MoTa { get; set; }
        public string? NoiDungChanDoan { get; set; }
        public bool HieuLuc { get; set; }

        private ICollection<ToaThuocMau>? _toaThuocMaus;
        public virtual ICollection<ToaThuocMau> ToaThuocMaus
        {
            get => _toaThuocMaus ??= new List<ToaThuocMau>();
            protected set => _toaThuocMaus = value;
        }
        private ICollection<YeuCauKhamBenh>? _yeuCauKhamBenhs;
        public virtual ICollection<YeuCauKhamBenh> YeuCauKhamBenhs
        {
            get => _yeuCauKhamBenhs ??= new List<YeuCauKhamBenh>();
            protected set => _yeuCauKhamBenhs = value;
        }
    }
}
