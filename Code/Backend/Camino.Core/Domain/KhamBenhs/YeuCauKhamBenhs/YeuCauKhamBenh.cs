
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocs;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.BenhViens;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds;
using Camino.Core.Domain.ThuNgans.PhieuChis;
using Camino.Core.Domain.TiepNhans;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;

namespace Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs
{
    public class YeuCauKhamBenh : BaseEntity
    {
        public long YeuCauTiepNhanId { get; set; }
        public long DichVuKhamBenhId { get; set; }
        public string? MaDichVu { get; set; }
        public string TenDichVu { get; set; } = "";
        public decimal? SoLuong { get; set; }
        public decimal? Gia { get; set; }
        public string? MoTa { get; set; }
        public TrangThaiDichVuKhamEnum TrangThai { get; set; }
        public long NhanVienChiDinhId { get; set; }
        public long? NoiChiDinhId { get; set; }
        public DateTime ThoiDiemChiDinh { get; set; }
        public long? NhanVienThucHienId { get; set; }
        public long? NoiThucHienId { get; set; }
        public DateTime? ThoiDiemThucHien { get; set; }
        public TrangThaiThanhToanEnum TrangThaiThanhToan { get; set; }
        public decimal? SoTienBenhNhanDaChi { get; set; }
        public string? LyDoKhamBenh { get; set; }
        public string? TongTrang { get; set; }
        public bool? CoKhamChiTietCacBoPhan { get; set; }
        public string? BoPhanTimMach { get; set; }
        public string? BoPhanHoHap { get; set; }
        public string? BoPhanTieuHoa { get; set; }
        public string? BoPhanTietNieu { get; set; }
        public string? BoPhanThanKinh { get; set; }
        public string? BoPhanPhuKhoa { get; set; }
        public string? BoPhanDaLieu { get; set; }
        public string? BoPhanTaiMuiHong { get; set; }
        public string? BoPhanMat { get; set; }
        public string? BoPhanCoXuongKhop { get; set; }
        public string? TienSuBenhBanThan { get; set; }
        public string? TienSuBenhGiaDinh { get; set; }
        public string? TienSuDiUng { get; set; }
        public string? CanLamSangNoiDungKetQuaXetNghiem { get; set; }
        public string? CanLamSangNoiDungKetQuaXQuang { get; set; }
        public string? CanLamSangNoiDungKetQuaSieuAm { get; set; }
        public string? CanLamSangNoiDungKetQuaDienTim { get; set; }
        public string? CanLamSangNoiDungKetQuaThuThuatKhac { get; set; }
        public long? IcdChinhId { get; set; }
        public string? NoiDungChanDoan { get; set; }
        public CachGiaiQuyetEnum? CachGiaiQuyet { get; set; }
        public string? LoiDan { get; set; }
        public bool? CoHenTaiKham { get; set; }
        public int? KhamLaiSau { get; set; }
        public DateTime? NgayHenTaiKham { get; set; }
        public string? GhiChuHenTaiKham { get; set; }
        public long? BenhVienChuyenDenId { get; set; }
        public string? LyDoNhapVien { get; set; }
        public long? NhanVienHoanThanhKhamId { get; set; }
        public long? NoiHoanThanhKhamId { get; set; }
        public DateTime? ThoiDiemHoanThanh { get; set; }
        public decimal? SoTienMienGiam { get; set; }
        public string? GhiChuMienGiam { get; set; }
        public long? NhanVienHuyId { get; set; }
        public DateTime? ThoiDiemHuy { get; set; }
        public string? LyDoHuy { get; set; }


        public virtual YeuCauTiepNhan? YeuCauTiepNhan { get; set; }
        public virtual DichVuKhamBenh? DichVuKhamBenh { get; set; }
        public virtual NhanVien? NhanVienChiDinh { get; set; }
        public virtual NhanVien? NhanVienThucHien { get; set; }
        public virtual NhanVien? NhanVienHuy { get; set; }
        public virtual NhanVien? NhanVienHoanThanhKham { get; set; }
        public virtual Icd? IcdChinh { get; set; }
        public virtual BenhVien? BenhVienChuyenDen { get; set; }

        private ICollection<PhieuChi>? _phieuChis;
        public virtual ICollection<PhieuChi> PhieuChis
        {
            get => _phieuChis ??= new List<PhieuChi>();
            protected set => _phieuChis = value;
        }

        private ICollection<YeuCauKhamBenhDonThuoc>? _yeuCauKhamBenhDonThuocs;
        public virtual ICollection<YeuCauKhamBenhDonThuoc> YeuCauKhamBenhDonThuocs
        {
            get => _yeuCauKhamBenhDonThuocs ??= new List<YeuCauKhamBenhDonThuoc>();
            protected set => _yeuCauKhamBenhDonThuocs = value;
        }
        private ICollection<YeuCauKhamBenhHinhAnhCanLamSang>? _yeuCauKhamBenhHinhAnhCanLamSangs;
        public virtual ICollection<YeuCauKhamBenhHinhAnhCanLamSang> YeuCauKhamBenhHinhAnhCanLamSangs
        {
            get => _yeuCauKhamBenhHinhAnhCanLamSangs ??= new List<YeuCauKhamBenhHinhAnhCanLamSang>();
            protected set => _yeuCauKhamBenhHinhAnhCanLamSangs = value;
        }
        private ICollection<YeuCauKhamBenhLichSuTrangThai>? _yeuCauKhamBenhLichSuTrangThais;
        public virtual ICollection<YeuCauKhamBenhLichSuTrangThai> YeuCauKhamBenhLichSuTrangThais
        {
            get => _yeuCauKhamBenhLichSuTrangThais ??= new List<YeuCauKhamBenhLichSuTrangThai>();
            protected set => _yeuCauKhamBenhLichSuTrangThais = value;
        }
    }
}
