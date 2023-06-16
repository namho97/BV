using AutoMapper;
using Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams;
using Camino.Api.Models.TiepNhanNguoiBenh.BacSiGiaDinh.DangKyKhams;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Camino.Core.Domain.TiepNhans;
using Camino.Core.Infrastructure.Mapper;

namespace Camino.Api.Models.MappingProfile
{
    public class YeuCauTiepNhanMappingProfile : Profile
    {
        public YeuCauTiepNhanMappingProfile()
        {
            CreateMap<YeuCauTiepNhan, DangKyKhamViewModel>().AfterMap((s, d) =>
            {
                d.NgayThangNamSinh = (s.NgaySinh != null ? s.NgaySinh.ToString() : "") + (s.NgaySinh != null && s.ThangSinh != null ? "/" : "") +
                (s.ThangSinh != null ? s.ThangSinh.ToString() : "") + (s.NamSinh != null && s.ThangSinh != null ? "/" : "") + (s.NamSinh != null ? s.NamSinh.ToString() : "");
                d.TenNhanVienTiepNhan = s.NhanVienTiepNhan?.User?.HoTen;
                d.DoChiSoSinhTon = s.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans.Any();
                d.ChiSoSinhTonViewModel = s.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans.LastOrDefault()?.Map<ChiSoSinhTonViewModel>();
                if (d.ChiSoSinhTonViewModel == null)
                {
                    d.ChiSoSinhTonViewModel = new ChiSoSinhTonViewModel();
                }
            });
            CreateMap<DangKyKhamViewModel, YeuCauTiepNhan>().AfterMap((s, d) =>
            {
                if (!string.IsNullOrEmpty(s.NgayThangNamSinh))
                {
                    DateTime date;
                    if (DateTime.TryParse(s.NgayThangNamSinh, out date))
                    {
                        d.NgaySinh = date.Day;
                        d.ThangSinh = date.Month;
                    }
                }
            });
            CreateMap<DangKyKhamViewModel, NguoiBenh>().AfterMap((s, d) =>
            {
                if (!string.IsNullOrEmpty(s.NgayThangNamSinh))
                {
                    DateTime date;
                    if (DateTime.TryParse(s.NgayThangNamSinh, out date))
                    {
                        d.NgaySinh = date.Day;
                        d.ThangSinh = date.Month;
                    }
                }
            });
            CreateMap<YeuCauTiepNhanChiSoSinhTon, ChiSoSinhTonViewModel>().AfterMap((s, d) =>
            {
            });
        }
    }
}
