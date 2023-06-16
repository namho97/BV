using AutoMapper;
using Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongPhongKhams;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongPhongKhams;

namespace Camino.Api.Models.MappingProfile
{
    public class KhoaPhongPhongKhamMappingProfile : Profile
    {
        public KhoaPhongPhongKhamMappingProfile()
        {
            CreateMap<KhoaPhongPhongKham, KhoaPhongPhongKhamViewModel>()
                 .AfterMap((s, d) =>
                 {
                     d.TenKhoaPhong = s.KhoaPhong != null ? s.KhoaPhong.Ten : string.Empty;
                 });
            CreateMap<KhoaPhongPhongKhamViewModel, KhoaPhongPhongKham>();
        }
    }
}
