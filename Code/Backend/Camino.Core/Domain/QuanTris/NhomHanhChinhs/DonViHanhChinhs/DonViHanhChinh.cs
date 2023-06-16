using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Camino.Core.Domain.TiepNhans;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs
{
    public class DonViHanhChinh : BaseEntity
    {
        public string Ten { get; set; } = null!;
        public string? Ma { get; set; }
        public long? TrucThuocDonViHanhChinhId { get; set; }
        public CapHanhChinh CapHanhChinh { get; set; }
        public string TenDonViHanhChinh { get; set; } = null!;
        public VungDiaLy? VungDiaLy { get; set; }
        public string? TenVietTat { get; set; }
        public virtual DonViHanhChinh? TrucThuocDonViHanhChinh { get; set; }

        private ICollection<DonViHanhChinh>? _trucThuocDonViHanhChinhs;
        public virtual ICollection<DonViHanhChinh> TrucThuocDonViHanhChinhs
        {
            get => _trucThuocDonViHanhChinhs ??= new List<DonViHanhChinh>();
            protected set => _trucThuocDonViHanhChinhs = value;
        }
        private ICollection<YeuCauTiepNhan>? _yeuCauTiepNhanTinhThanhs;
        public virtual ICollection<YeuCauTiepNhan> YeuCauTiepNhanTinhThanhs
        {
            get => _yeuCauTiepNhanTinhThanhs ??= new List<YeuCauTiepNhan>();
            protected set => _yeuCauTiepNhanTinhThanhs = value;
        }
        private ICollection<YeuCauTiepNhan>? _yeuCauTiepNhanQuanHuyens;
        public virtual ICollection<YeuCauTiepNhan> YeuCauTiepNhanQuanHuyens
        {
            get => _yeuCauTiepNhanQuanHuyens ??= new List<YeuCauTiepNhan>();
            protected set => _yeuCauTiepNhanQuanHuyens = value;
        }
        private ICollection<YeuCauTiepNhan>? _yeuCauTiepNhanPhuongXas;
        public virtual ICollection<YeuCauTiepNhan> YeuCauTiepNhanPhuongXas
        {
            get => _yeuCauTiepNhanPhuongXas ??= new List<YeuCauTiepNhan>();
            protected set => _yeuCauTiepNhanPhuongXas = value;
        }
        private ICollection<YeuCauTiepNhan>? _yeuCauTiepNhanKhomAps;
        public virtual ICollection<YeuCauTiepNhan> YeuCauTiepNhanKhomAps
        {
            get => _yeuCauTiepNhanKhomAps ??= new List<YeuCauTiepNhan>();
            protected set => _yeuCauTiepNhanKhomAps = value;
        }


        private ICollection<NguoiBenh>? _nguoiBenhTinhThanhs;
        public virtual ICollection<NguoiBenh> NguoiBenhTinhThanhs
        {
            get => _nguoiBenhTinhThanhs ??= new List<NguoiBenh>();
            protected set => _nguoiBenhTinhThanhs = value;
        }
        private ICollection<NguoiBenh>? _nguoiBenhQuanHuyens;
        public virtual ICollection<NguoiBenh> NguoiBenhQuanHuyens
        {
            get => _nguoiBenhQuanHuyens ??= new List<NguoiBenh>();
            protected set => _nguoiBenhQuanHuyens = value;
        }
        private ICollection<NguoiBenh>? _nguoiBenhPhuongXas;
        public virtual ICollection<NguoiBenh> NguoiBenhPhuongXas
        {
            get => _nguoiBenhPhuongXas ??= new List<NguoiBenh>();
            protected set => _nguoiBenhPhuongXas = value;
        }
        private ICollection<NguoiBenh>? _nguoiBenhKhomAps;
        public virtual ICollection<NguoiBenh> NguoiBenhKhomAps
        {
            get => _nguoiBenhKhomAps ??= new List<NguoiBenh>();
            protected set => _nguoiBenhKhomAps = value;
        }
    }
}
