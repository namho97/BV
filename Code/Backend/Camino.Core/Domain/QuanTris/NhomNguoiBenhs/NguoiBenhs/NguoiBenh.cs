using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DanTocs;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.ThuNgans.PhieuChis;
using Camino.Core.Domain.ThuNgans.PhieuThus;
using Camino.Core.Domain.TiepNhans;

namespace Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs
{
    public class NguoiBenh : BaseEntity
    {
        public string HoTen { get; set; } = "";
        public int? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public int NamSinh { get; set; }
        public string? SoChungMinhThu { get; set; }
        public LoaiGioiTinh GioiTinh { get; set; }
        public string SoDienThoai { get; set; } = "";
        public string? NgheNghiep { get; set; }
        public long? TinhThanhId { get; set; }
        public long? QuanHuyenId { get; set; }
        public long? PhuongXaId { get; set; }
        public long? KhomApId { get; set; }

        public string? SoNha { get; set; }
        public string? HoTenNguoiGiamHo { get; set; }

        public long? DanTocId { get; set; }
        public long? QuocTichId { get; set; }
        public string? NoiLamViec { get; set; }
        public string? Email { get; set; }
        public string? TienSuBenhBanThan { get; set; }
        public string? TienSuBenhGiaDinh { get; set; }
        public string? TienSuDiUng { get; set; }

        public string MaNguoiBenh { get; set; } = "";
        public virtual DonViHanhChinh? TinhThanh { get; set; }
        public virtual DonViHanhChinh? QuanHuyen { get; set; }
        public virtual DonViHanhChinh? PhuongXa { get; set; }
        public virtual DonViHanhChinh? KhomAp { get; set; }
        public virtual DanToc? DanToc { get; set; }
        public virtual QuocGia? QuocTich { get; set; }

        private ICollection<YeuCauTiepNhan>? _yeuCauTiepNhans;
        public virtual ICollection<YeuCauTiepNhan> YeuCauTiepNhans
        {
            get => _yeuCauTiepNhans ??= new List<YeuCauTiepNhan>();
            protected set => _yeuCauTiepNhans = value;
        }

        private ICollection<PhieuThu>? _phieuThus;
        public virtual ICollection<PhieuThu> PhieuThus
        {
            get => _phieuThus ??= new List<PhieuThu>();
            protected set => _phieuThus = value;
        }
        private ICollection<PhieuChi>? _phieuChis;
        public virtual ICollection<PhieuChi> PhieuChis
        {
            get => _phieuChis ??= new List<PhieuChi>();
            protected set => _phieuChis = value;
        }
    }
}
