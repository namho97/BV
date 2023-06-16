using AutoMapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.DuongDungs;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuongDungs;

namespace Camino.Api.Models.MappingProfile
{
    public class DuongDungViewModelMappingProfile : Profile
    {
        public DuongDungViewModelMappingProfile()
        {
            CreateMap<DuongDung, DuongDungViewModel>();
            CreateMap<DuongDungViewModel, DuongDung>();
        }
    }
}
