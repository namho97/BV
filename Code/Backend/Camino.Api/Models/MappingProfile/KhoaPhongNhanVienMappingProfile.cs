using AutoMapper;
using Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongNhanViens;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongNhanViens;

namespace Camino.Api.Models.MappingProfile
{
    public class KhoaPhongNhanVienMappingProfile : Profile
    {
        public KhoaPhongNhanVienMappingProfile()
        {
            CreateMap<KhoaPhongNhanVien, KhoaPhongNhanVienViewModel>();
            CreateMap<KhoaPhongNhanVienViewModel, KhoaPhongNhanVien>();
        }
    }
}
