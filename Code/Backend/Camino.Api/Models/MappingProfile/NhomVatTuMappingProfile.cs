using AutoMapper;
using Camino.Api.Models.QuanTri.NhomVatTu.NhomVatTus;
using Camino.Core.Domain.QuanTris.NhomVatTus.NhomVatTus;

namespace Camino.Api.Models.MappingProfile
{
    public class NhomVatTuMappingProfile : Profile
    {
        public NhomVatTuMappingProfile()
        {
            CreateMap<NhomVatTu, NhomVatTuViewModel>();

            CreateMap<NhomVatTuViewModel, NhomVatTu>();

        }
    }
}
