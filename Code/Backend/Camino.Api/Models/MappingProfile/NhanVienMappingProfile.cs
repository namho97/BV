using AutoMapper;
using Camino.Api.Models.QuanTri.NhomNhanVien.NhanViens;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Infrastructure.Mapper;

namespace Camino.Api.Models.MappingProfile
{
    public class NhanVienMappingProfile : Profile
    {
        public NhanVienMappingProfile()
        {
            CreateMap<User, NhanVienViewModel>().ForMember(s => s.NgaySinh, o => o.Ignore());
            CreateMap<NhanVienViewModel, User>().ForMember(s => s.NgaySinh, o => o.Ignore());

            CreateMap<NhanVien, NhanVienViewModel>()
                .AfterMap((s, d) =>
                {
                    s.User.MapTo(d);
                });
            CreateMap<NhanVienViewModel, NhanVien>().AfterMap((s, d) =>
            {
                if (d.User == null)
                    d.User = new User();
                s.MapTo(d.User);
            });
        }
    }
}
