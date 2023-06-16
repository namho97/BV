using AutoMapper;
using Camino.Api.Models.QuanTri.NhomNguoiBenh.QuanHeThanNhans;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.QuanHeThanNhans;

namespace Camino.Api.Models.MappingProfile
{
    public class QuanHeThanNhanMappingProfile : Profile
    {
        public QuanHeThanNhanMappingProfile()
        {
            CreateMap<QuanHeNhanThan, QuanHeThanNhanViewModel>();
            CreateMap<QuanHeThanNhanViewModel, QuanHeNhanThan>();
        }
    }
}
