using AutoMapper;
using Camino.Api.Models.QuanTri.NhomCauHinh.NoiDungMaus;
using Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus;

namespace Camino.Api.Models.MappingProfile
{
    public class NoiDungMauMappingProfile : Profile
    {
        public NoiDungMauMappingProfile()
        {
            CreateMap<NoiDungMau, NoiDungMauViewModel>();
            CreateMap<NoiDungMauViewModel, NoiDungMau>();
        }
    }
}
