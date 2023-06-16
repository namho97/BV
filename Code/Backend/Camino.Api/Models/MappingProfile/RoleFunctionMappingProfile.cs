using AutoMapper;
using Camino.Api.Models.QuanTri.NhomNhanVien.Users;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;

namespace Camino.Api.Models.MappingProfile
{
    public class RoleFunctionMappingProfile : Profile
    {
        public RoleFunctionMappingProfile()
        {
            CreateMap<RoleFunction, RoleFunctionViewModel>();
            CreateMap<RoleFunctionViewModel, RoleFunction>();
        }
    }
}