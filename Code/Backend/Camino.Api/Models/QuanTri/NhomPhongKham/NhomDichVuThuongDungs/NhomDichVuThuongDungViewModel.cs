using Camino.Core.Helpers;
using System.ComponentModel;
using static Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs.EnumBoPhan;
using static Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs.LoaiGoiDichVu;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;

namespace Camino.Api.Models.QuanTri.NhomPhongKham.NhomDichVuThuongDungs
{
    public class NhomDichVuThuongDungViewModel :BaseViewModel
    {
        public NhomDichVuThuongDungViewModel()
        {
            GoiDichVuChiTietDichVuKhamBenhs = new List<GoiDichVuChiTietDichVuKhamBenhViewModel>();
            GoiDichVuChiTietDichVuKyThuats = new List<GoiDichVuChiTietDichVuKyThuatViewModel>();
        }
        public EnumLoaiGoiDichVu LoaiGoiDichVu { get; set; }

        public string? Ten { get; set; } 

        public string? MoTa { get; set; }

        public bool? HieuLuc { get; set; }

        public BoPhan? BoPhan { get; set; }
        public List<GoiDichVuChiTietDichVuKhamBenhViewModel> GoiDichVuChiTietDichVuKhamBenhs { get; set; }
        public List<GoiDichVuChiTietDichVuKyThuatViewModel> GoiDichVuChiTietDichVuKyThuats { get; set; }
    }
    public class GoiDichVuChiTietDichVuKhamBenhViewModel : BaseViewModel
    {
        public long GoiDichVuId { get; set; }

        public long DichVuKhamBenhId { get; set; }

        public long DichVuKhamBenhGiaId { get; set; }

        public int SoLan { get; set; }

        public string? GhiChu { get; set; }
        public string? MaDV { get; set; }
        public string? TenDV { get; set; }

        public LoaiNhomDichVuEnum LoaiDichVu { get; set; }

        public string NhomDisplay => LoaiDichVu.GetDescription();

        public decimal DonGia { get; set; }

        public decimal ThanhTien => DonGia * SoLan;
    }
    public class GoiDichVuChiTietDichVuKyThuatViewModel : BaseViewModel
    {
        public long DichVuKyThuatId { get; set; }

        public long DichVuKyThuatGiaId { get; set; }

        public long GoiDichVuId { get; set; }

        public int SoLan { get; set; }

        public string? GhiChu { get; set; }
        public string? MaDV { get; set; }
        public string? TenDV { get; set; }

        public LoaiNhomDichVuEnum LoaiDichVu { get; set; }

        public string NhomDisplay => LoaiDichVu.GetDescription();

        public decimal DonGia { get; set; }

        public decimal ThanhTien => DonGia * SoLan;

    }
}
