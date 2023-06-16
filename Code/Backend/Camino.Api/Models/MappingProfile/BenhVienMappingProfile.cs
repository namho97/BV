using AutoMapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.BenhViens;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.BenhViens;

namespace Camino.Api.Models.MappingProfile
{
    public class BenhVienMappingProfile : Profile
    {
        public BenhVienMappingProfile()
        {
            CreateMap<BenhVien, BenhVienViewModel>();
            CreateMap<BenhVienViewModel, BenhVien>();
        }
    }
}
