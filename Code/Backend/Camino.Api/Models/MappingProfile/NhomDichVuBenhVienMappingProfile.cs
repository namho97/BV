using AutoMapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.NhomDichVus;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVus;

namespace Camino.Api.Models.MappingProfile
{
    public class NhomDichVuBenhVienMappingProfile : Profile
    {
        public NhomDichVuBenhVienMappingProfile()
        {
            CreateMap<NhomDichVuBenhVien, NhomDichVuViewModel>();
            CreateMap<NhomDichVuViewModel, NhomDichVuBenhVien>();
        }
    }
}
