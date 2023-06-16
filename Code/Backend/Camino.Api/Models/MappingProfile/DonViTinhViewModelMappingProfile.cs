using AutoMapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.DonViTinhs;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DonViTinhs;

namespace Camino.Api.Models.MappingProfile
{
    public class DonViTinhViewModelMappingProfile : Profile
    {
        public DonViTinhViewModelMappingProfile()
        {
            CreateMap<DonViTinh, DonViTinhViewModel>();
            CreateMap<DonViTinhViewModel, DonViTinh>();
        }
    }
}
