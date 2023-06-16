using AutoMapper;
using Camino.Api.Models.QuanTri.NhomNhanVien.Users;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Api.Models.MappingProfile
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, UserViewModel>();
            CreateMap<UserViewModel, User>();
        }
    }
}
