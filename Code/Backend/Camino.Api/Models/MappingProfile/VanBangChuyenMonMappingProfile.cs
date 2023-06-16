using AutoMapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.VanBangChuyenMons;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.VanBangChuyenMons;

namespace Camino.Api.Models.MappingProfile
{
    public class VanBangChuyenMonMappingProfile : Profile
    {
        public VanBangChuyenMonMappingProfile()
        {
            CreateMap<VanBangChuyenMon, VanBangChuyenMonViewModel>();
            CreateMap<VanBangChuyenMonViewModel, VanBangChuyenMon>();
        }
    }
}
