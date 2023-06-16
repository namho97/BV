using Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DanTocs;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.ThuNgans.PhieuChis;
using Camino.Core.Domain.ThuNgans.PhieuThus;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Core.Domain.TiepNhans
{
    public class YeuCauTiepNhan : BaseEntity
    {
        public long NguoiBenhId { get; set; }
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
        public string MaYeuCauTiepNhan { get; set; } = "";
        public DateTime ThoiDiemTiepNhan { get; set; }
        public long NhanVienTiepNhanId { get; set; }
        public int SoThuTu { get; set; }
        public string? LyDoTiepNhan { get; set; }
        public bool? LaTaiKham { get; set; }
        public bool? LaDangKyHenKham { get; set; }
        public DateTime? ThoiDiemHoanThanh { get; set; }
        public int? GioHenKham { get; set; }
        public HinhThucHenEnum? HinhThucHen { get; set; }
        public long? NhanVienHuyId { get; set; }
        public long? NoiHuyId { get; set; }
        public DateTime? ThoiDiemHuy { get; set; }
        public string? LyDoHuy { get; set; }
        public TrangThaiYeuCauTiepNhanEnum TrangThai { get; set; }
        public DateTime? NgayHenKham { get; set; }
        public DateTime? ThoiDiemNguoiBenhDen { get; set; }
        public long? NhanVienCapNhatNguoiBenhDenId { get; set; }
        public virtual NguoiBenh? NguoiBenh { get; set; }
        public virtual DonViHanhChinh? TinhThanh { get; set; }
        public virtual DonViHanhChinh? QuanHuyen { get; set; }
        public virtual DonViHanhChinh? PhuongXa { get; set; }
        public virtual DonViHanhChinh? KhomAp { get; set; }
        public virtual DanToc? DanToc { get; set; }
        public virtual QuocGia? QuocTich { get; set; }
        public virtual NhanVien? NhanVienTiepNhan { get; set; }
        public virtual NhanVien? NhanVienHuy { get; set; }
        public virtual NhanVien? NhanVienCapNhatNguoiBenhDen { get; set; }

        private ICollection<YeuCauTiepNhanChiSoSinhTon>? _yeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans;
        public virtual ICollection<YeuCauTiepNhanChiSoSinhTon> YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans
        {
            get => _yeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans ??= new List<YeuCauTiepNhanChiSoSinhTon>();
            protected set => _yeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans = value;
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
        private ICollection<YeuCauDichVuKyThuat>? _yeuCauDichVuKyThuats;
        public virtual ICollection<YeuCauDichVuKyThuat> YeuCauDichVuKyThuats
        {
            get => _yeuCauDichVuKyThuats ??= new List<YeuCauDichVuKyThuat>();
            protected set => _yeuCauDichVuKyThuats = value;
        }
        private ICollection<YeuCauKhamBenh>? _yeuCauKhamBenhs;
        public virtual ICollection<YeuCauKhamBenh> YeuCauKhamBenhs
        {
            get => _yeuCauKhamBenhs ??= new List<YeuCauKhamBenh>();
            protected set => _yeuCauKhamBenhs = value;
        }
        private ICollection<YeuCauTiepNhanLichSuTrangThai>? _yeuCauTiepNhanLichSuTrangThais;
        public virtual ICollection<YeuCauTiepNhanLichSuTrangThai> YeuCauTiepNhanLichSuTrangThais
        {
            get => _yeuCauTiepNhanLichSuTrangThais ??= new List<YeuCauTiepNhanLichSuTrangThai>();
            protected set => _yeuCauTiepNhanLichSuTrangThais = value;
        }
    }

}
