using Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocs;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucDanhs;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongNhanViens;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;
using Camino.Core.Domain.ThuNgans.PhieuChis;
using Camino.Core.Domain.ThuNgans.PhieuThus;
using Camino.Core.Domain.TiepNhans;

namespace Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public class NhanVien : BaseEntity
    {
        public string? HocViHocHam { get; set; }
        public string? SoChungChiHanhNghe { get; set; }
        public string? PhamViChuyenMon { get; set; }
        public long? ChucDanhId { get; set; }

        public virtual User? User { get; set; }
        public virtual ChucDanh? ChucDanh { get; set; }

        private ICollection<NhanVienRole>? _nhanVienRoles;
        public virtual ICollection<NhanVienRole> NhanVienRoles
        {
            get => _nhanVienRoles ??= new List<NhanVienRole>();
            protected set => _nhanVienRoles = value;
        }
        private ICollection<YeuCauTiepNhan>? _yeuCauTiepNhanNhanVienTiepNhans;
        public virtual ICollection<YeuCauTiepNhan> YeuCauTiepNhanNhanVienTiepNhans
        {
            get => _yeuCauTiepNhanNhanVienTiepNhans ??= new List<YeuCauTiepNhan>();
            protected set => _yeuCauTiepNhanNhanVienTiepNhans = value;
        }
        private ICollection<YeuCauTiepNhan>? _yeuCauTiepNhanNhanVienHuys;
        public virtual ICollection<YeuCauTiepNhan> YeuCauTiepNhanNhanVienHuys
        {
            get => _yeuCauTiepNhanNhanVienHuys ??= new List<YeuCauTiepNhan>();
            protected set => _yeuCauTiepNhanNhanVienHuys = value;
        }
        private ICollection<YeuCauTiepNhan>? _yeuCauTiepNhanNhanVienCapNhatNguoiBenhDens;
        public virtual ICollection<YeuCauTiepNhan> YeuCauTiepNhanVienCapNhatNguoiBenhDens
        {
            get => _yeuCauTiepNhanNhanVienCapNhatNguoiBenhDens ??= new List<YeuCauTiepNhan>();
            protected set => _yeuCauTiepNhanNhanVienCapNhatNguoiBenhDens = value;
        }


        private ICollection<YeuCauTiepNhanChiSoSinhTon>? _yeuCauTiepNhanChiSoSinhTonNhanVienThucHiens;
        public virtual ICollection<YeuCauTiepNhanChiSoSinhTon> YeuCauTiepNhanChiSoSinhTonNhanVienThucHiens
        {
            get => _yeuCauTiepNhanChiSoSinhTonNhanVienThucHiens ??= new List<YeuCauTiepNhanChiSoSinhTon>();
            protected set => _yeuCauTiepNhanChiSoSinhTonNhanVienThucHiens = value;
        }

        private ICollection<PhieuThu>? _phieuThuNhanVienThucHiens;
        public virtual ICollection<PhieuThu> PhieuThuNhanVienThucHiens
        {
            get => _phieuThuNhanVienThucHiens ??= new List<PhieuThu>();
            protected set => _phieuThuNhanVienThucHiens = value;
        }

        private ICollection<PhieuThu>? _phieuThuNhanVienHuys;
        public virtual ICollection<PhieuThu> PhieuThuNhanVienHuys
        {
            get => _phieuThuNhanVienHuys ??= new List<PhieuThu>();
            protected set => _phieuThuNhanVienHuys = value;
        }
        private ICollection<PhieuChi>? _phieuChiNhanVienThucHiens;
        public virtual ICollection<PhieuChi> PhieuChiNhanVienThucHiens
        {
            get => _phieuChiNhanVienThucHiens ??= new List<PhieuChi>();
            protected set => _phieuChiNhanVienThucHiens = value;
        }
        private ICollection<PhieuChi>? _phieuChiNhanVienHuys;
        public virtual ICollection<PhieuChi> PhieuChiNhanVienHuys
        {
            get => _phieuChiNhanVienHuys ??= new List<PhieuChi>();
            protected set => _phieuChiNhanVienHuys = value;
        }

        private ICollection<ToaThuocMau>? _toaThuocMaus;
        public virtual ICollection<ToaThuocMau> ToaThuocMaus
        {
            get => _toaThuocMaus ??= new List<ToaThuocMau>();
            protected set => _toaThuocMaus = value;
        }
        private ICollection<YeuCauDichVuKyThuat>? _yeuCauDichVuKyThuatNhanVienChiDinhs;
        public virtual ICollection<YeuCauDichVuKyThuat> YeuCauDichVuKyThuatNhanVienChiDinhs
        {
            get => _yeuCauDichVuKyThuatNhanVienChiDinhs ??= new List<YeuCauDichVuKyThuat>();
            protected set => _yeuCauDichVuKyThuatNhanVienChiDinhs = value;
        }
        private ICollection<YeuCauDichVuKyThuat>? _yeuCauDichVuKyThuatNhanVienThucHiens;
        public virtual ICollection<YeuCauDichVuKyThuat> YeuCauDichVuKyThuatNhanVienThucHiens
        {
            get => _yeuCauDichVuKyThuatNhanVienThucHiens ??= new List<YeuCauDichVuKyThuat>();
            protected set => _yeuCauDichVuKyThuatNhanVienThucHiens = value;
        }
        private ICollection<YeuCauDichVuKyThuat>? _yeuCauDichVuKyThuatNhanVienHuys;
        public virtual ICollection<YeuCauDichVuKyThuat> YeuCauDichVuKyThuatNhanVienHuys
        {
            get => _yeuCauDichVuKyThuatNhanVienHuys ??= new List<YeuCauDichVuKyThuat>();
            protected set => _yeuCauDichVuKyThuatNhanVienHuys = value;
        }
        private ICollection<YeuCauKhamBenh>? _yeuCauKhamBenhNhanVienChiDinhs;
        public virtual ICollection<YeuCauKhamBenh> YeuCauKhamBenhNhanVienChiDinhs
        {
            get => _yeuCauKhamBenhNhanVienChiDinhs ??= new List<YeuCauKhamBenh>();
            protected set => _yeuCauKhamBenhNhanVienChiDinhs = value;
        }
        private ICollection<YeuCauKhamBenh>? _yeuCauKhamBenhNhanVienThucHiens;
        public virtual ICollection<YeuCauKhamBenh> YeuCauKhamBenhNhanVienThucHiens
        {
            get => _yeuCauKhamBenhNhanVienThucHiens ??= new List<YeuCauKhamBenh>();
            protected set => _yeuCauKhamBenhNhanVienThucHiens = value;
        }
        private ICollection<YeuCauKhamBenh>? _yeuCauKhamBenhNhanVienHuys;
        public virtual ICollection<YeuCauKhamBenh> YeuCauKhamBenhNhanVienHuys
        {
            get => _yeuCauKhamBenhNhanVienHuys ??= new List<YeuCauKhamBenh>();
            protected set => _yeuCauKhamBenhNhanVienHuys = value;
        }
        private ICollection<YeuCauKhamBenh>? _yeuCauKhamBenhNhanVienHoanThanhKhams;
        public virtual ICollection<YeuCauKhamBenh> YeuCauKhamBenhNhanVienHoanThanhKhams
        {
            get => _yeuCauKhamBenhNhanVienHoanThanhKhams ??= new List<YeuCauKhamBenh>();
            protected set => _yeuCauKhamBenhNhanVienHoanThanhKhams = value;
        }
        private ICollection<YeuCauKhamBenhDonThuoc>? _yeuCauKhamBenhDonThuocs;
        public virtual ICollection<YeuCauKhamBenhDonThuoc> YeuCauKhamBenhDonThuocs
        {
            get => _yeuCauKhamBenhDonThuocs ??= new List<YeuCauKhamBenhDonThuoc>();
            protected set => _yeuCauKhamBenhDonThuocs = value;
        }

        private ICollection<KhoaPhongNhanVien>? _khoaPhongNhanViens;

        public virtual ICollection<KhoaPhongNhanVien> KhoaPhongNhanViens
        {
            get => _khoaPhongNhanViens ?? (_khoaPhongNhanViens = new List<KhoaPhongNhanVien>());
            protected set => _khoaPhongNhanViens = value;
        }
    }
}
