using AutoMapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.DanTocs;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DanTocs;

namespace Camino.Api.Models.MappingProfile
{
    public class DanTocMappingProfile : Profile
    {
        public DanTocMappingProfile()
        {
            CreateMap<DanToc, DanTocViewModel>();
            CreateMap<DanTocViewModel, DanToc>();
        }
    }
}
