using AutoMapper;
using Camino.Api.Models.QuanTri.NhomKho.NhaCungCaps;
using Camino.Core.Domain.QuanTris.NhomKhos.NhaCungCaps;

namespace Camino.Api.Models.MappingProfile
{
    public class NhaCungCapMappingProfile : Profile
    {
        public NhaCungCapMappingProfile()
        {
            CreateMap<NhaCungCap, NhaCungCapViewModel>();
            CreateMap<NhaCungCapViewModel, NhaCungCap>();
        }
    }
}
