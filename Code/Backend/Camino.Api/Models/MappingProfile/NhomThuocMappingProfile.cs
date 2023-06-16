using AutoMapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.NhomThuocs;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhomThuocs;

namespace Camino.Api.Models.MappingProfile
{
    public class NhomThuocMappingProfile : Profile
    {
        public NhomThuocMappingProfile()
        {
            CreateMap<NhomThuoc, NhomThuocViewModel>();

            CreateMap<NhomThuocViewModel, NhomThuoc>();

        }
    }
}
