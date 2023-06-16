using AutoMapper;
using Camino.Api.Models.QuanTri.NhomNguoiBenh.NguoiBenh;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;

namespace Camino.Api.Models.MappingProfile
{
    public class NguoiBenhMappingProfile : Profile
    {
        public NguoiBenhMappingProfile()
        {
            CreateMap<NguoiBenh, NguoiBenhViewModel>().AfterMap((s, d) =>
            {
                if (s.NgaySinh != null && s.ThangSinh != null && s.NamSinh != null)
                {
                    d.NgayThangNamSinh = new DateTime(s.NamSinh, s.ThangSinh.GetValueOrDefault(), s.NgaySinh.GetValueOrDefault());
                }

            });
            CreateMap<NguoiBenhViewModel, NguoiBenh>();
        }
    }
}
