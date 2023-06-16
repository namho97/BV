using AutoMapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.ChucVus;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucVus;

namespace Camino.Api.Models.MappingProfile
{
   
    public class ChucVuViewModelMappingProfile : Profile
    {
        public ChucVuViewModelMappingProfile()
        {
            CreateMap<ChucVu, ChucVuViewModel>();
            CreateMap<ChucVuViewModel, ChucVu>();
        }
    }
}
