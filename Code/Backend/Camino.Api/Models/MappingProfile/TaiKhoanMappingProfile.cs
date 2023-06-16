using AutoMapper;
using Camino.Api.Models.TaiKhoans;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Api.Models.MappingProfile
{
    public class TaiKhoanMappingProfile : Profile
    {
        public TaiKhoanMappingProfile()
        {
            CreateMap<User, TaiKhoanViewModel>().ForMember(s => s.NgaySinh, o => o.Ignore());
            CreateMap<TaiKhoanViewModel, User>().ForMember(s => s.NgaySinh, o => o.Ignore());
        }
    }
}
