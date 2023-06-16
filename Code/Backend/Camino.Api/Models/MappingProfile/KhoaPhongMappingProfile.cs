using AutoMapper;
using Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongs;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs;

namespace Camino.Api.Models.MappingProfile
{
    public class KhoaPhongMappingProfile : Profile
    {
        public KhoaPhongMappingProfile()
        {
            CreateMap<KhoaPhong, KhoaPhongViewModel>();
            CreateMap<KhoaPhongViewModel, KhoaPhong>();
        }
    }
}
