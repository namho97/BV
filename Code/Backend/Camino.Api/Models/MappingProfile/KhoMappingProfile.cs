using AutoMapper;
using Camino.Api.Models.QuanTri.NhomKho.Khos;
using Camino.Core.Domain.QuanTris.NhomKhos.Khos;


namespace Camino.Api.Models.MappingProfile
{
    public class KhoMappingProfile : Profile
    {
        public KhoMappingProfile()
        {
            CreateMap<Kho, KhoViewModel>();

            CreateMap<KhoViewModel, Kho>()
                .ForMember(d => d.KhoaPhong, o => o.Ignore())
                .ForMember(d => d.PhongBenhVien, o => o.Ignore())
                .ForMember(d => d.Id, o => o.Ignore());
        }
    }
}
