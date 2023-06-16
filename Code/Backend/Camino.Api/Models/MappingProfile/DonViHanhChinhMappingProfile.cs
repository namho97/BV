using AutoMapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.DonViHanhChinhs;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs;

namespace Camino.Api.Models.MappingProfile
{
    public class DonViHanhChinhMappingProfile : Profile
    {
        public DonViHanhChinhMappingProfile()
        {
            CreateMap<DonViHanhChinh, DonViHanhChinhViewModel>();
            CreateMap<DonViHanhChinhViewModel, DonViHanhChinh>();
        }
    }
}
