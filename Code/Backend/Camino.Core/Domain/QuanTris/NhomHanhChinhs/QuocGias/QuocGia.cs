using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DanTocs;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Camino.Core.Domain.TiepNhans;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias
{
    public class QuocGia : BaseEntity
    {

        public string Ma { get; set; } = null!;
        public string Ten { get; set; } = null!;
        public string TenVietTat { get; set; } = null!;
        public string QuocTich { get; set; } = null!;
        public string? MaDienThoaiQuocTe { get; set; }
        public string ThuDo { get; set; } = "";
        public int ChauLuc { get; set; }
        public bool? HieuLuc { get; set; }

        private ICollection<YeuCauTiepNhan>? _yeuCauTiepNhans;
        public virtual ICollection<YeuCauTiepNhan> YeuCauTiepNhans
        {
            get => _yeuCauTiepNhans ??= new List<YeuCauTiepNhan>();
            protected set => _yeuCauTiepNhans = value;
        }
        private ICollection<DanToc>? _danTocs;
        public virtual ICollection<DanToc> DanTocs
        {
            get => _danTocs ??= new List<DanToc>();
            protected set => _danTocs = value;
        }
        private ICollection<NguoiBenh>? _nguoiBenhs;
        public virtual ICollection<NguoiBenh> NguoiBenhs
        {
            get => _nguoiBenhs ??= new List<NguoiBenh>();
            protected set => _nguoiBenhs = value;
        }
        private ICollection<YeuCauKhamBenhDonThuocChiTiet>? _yeuCauKhamBenhDonThuocChiTiets;
        public virtual ICollection<YeuCauKhamBenhDonThuocChiTiet> YeuCauKhamBenhDonThuocChiTiets
        {
            get => _yeuCauKhamBenhDonThuocChiTiets ??= new List<YeuCauKhamBenhDonThuocChiTiet>();
            protected set => _yeuCauKhamBenhDonThuocChiTiets = value;
        }
        private ICollection<DuocPham>? _duocPhams;
        public virtual ICollection<DuocPham> DuocPhams
        {
            get => _duocPhams ??= new List<DuocPham>();
            protected set => _duocPhams = value;
        }
    }
}
