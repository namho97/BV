using AutoMapper;
using Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams;
using Camino.Core.Domain.TiepNhans;

namespace Camino.Api.Models.MappingProfile
{
    public class ThuNganMappingOrofile : Profile
    {
        public ThuNganMappingOrofile()
        {
            CreateMap<YeuCauTiepNhan, ThongTinHanhChinhViewModel>().AfterMap((s, d) =>
            {
                d.TenTinhThanh = s.TinhThanh?.Ten;
                d.TenQuanHuyen = s.QuanHuyen?.Ten;
                d.TenPhuongXa = s.PhuongXa?.Ten;
                d.TenKhomAp = s.KhomAp?.Ten;
            });
        }
    }
}
