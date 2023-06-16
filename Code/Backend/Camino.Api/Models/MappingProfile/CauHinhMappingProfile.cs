using AutoMapper;
using Camino.Api.Models.QuanTri.NhomCauHinh.CauHinhs;
using Camino.Core.Domain.CauHinhs;

namespace Camino.Api.Models.MappingProfile
{
    public class CauHinhMappingProfile : Profile
    {
        public CauHinhMappingProfile()
        {
            CreateMap<CauHinh, CauhinhViewModel>();

            CreateMap<CauhinhViewModel, CauHinh>();

        }
    }
}
