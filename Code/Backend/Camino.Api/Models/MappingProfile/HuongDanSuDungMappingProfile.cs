using AutoMapper;
using Camino.Api.Models.HuongDanSuDung.BacSiGiaDinh;

namespace Camino.Api.Models.MappingProfile
{
    public class HuongDanSuDungMappingProfile : Profile
    {
        public HuongDanSuDungMappingProfile()
        {
            CreateMap<Camino.Core.Domain.HuongDanSuDungs.HuongDanSuDung, HuongDanSuDungViewModel>();
            CreateMap<HuongDanSuDungViewModel, Camino.Core.Domain.HuongDanSuDungs.HuongDanSuDung>();
        }
    }
}
