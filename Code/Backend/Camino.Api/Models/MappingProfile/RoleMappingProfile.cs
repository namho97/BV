using AutoMapper;
using Camino.Api.Models.QuanTri.NhomNhanVien.Users;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;

namespace Camino.Api.Models.MappingProfile
{
    public class RoleMappingProfile : Profile
    {
        public RoleMappingProfile()
        {
            CreateMap<Role, RoleViewModel>();
            CreateMap<RoleViewModel, Role>()
                .ForMember(d => d.RoleFunctions, o => o.Ignore())
                .AfterMap((s, d) =>
                {
                });
        }
    }
}
