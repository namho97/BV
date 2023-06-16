using AutoMapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.NgheNghieps;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.NgheNghieps;

namespace Camino.Api.Models.MappingProfile
{
    public class NgheNghiepMappingProfile : Profile
    {
        public NgheNghiepMappingProfile()
        {
            CreateMap<NgheNghiep, NgheNghiepViewModel>();
            CreateMap<NgheNghiepViewModel, NgheNghiep>();
        }
    }
}
