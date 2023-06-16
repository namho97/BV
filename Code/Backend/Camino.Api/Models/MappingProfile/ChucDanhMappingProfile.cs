using AutoMapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.ChucDanhs;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucDanhs;

namespace Camino.Api.Models.MappingProfile
{
    public class ChucDanhMappingProfile : Profile
    {
        public ChucDanhMappingProfile()
        {
            CreateMap<ChucDanh, ChucDanhViewModel>();
            CreateMap<ChucDanhViewModel, ChucDanh>();
        }
    }
}
