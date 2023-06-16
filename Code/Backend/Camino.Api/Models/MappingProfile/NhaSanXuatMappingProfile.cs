using AutoMapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.NhaSanXuats;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhaSanXuats;

namespace Camino.Api.Models.MappingProfile
{
    public class NhaSanXuatMappingProfile : Profile
    {
        public NhaSanXuatMappingProfile()
        {
            CreateMap<NhaSanXuat, NhaSanXuatViewModel>();
            CreateMap<NhaSanXuatViewModel, NhaSanXuat>();
        }
    }
}
