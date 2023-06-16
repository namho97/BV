using AutoMapper;
using Camino.Api.Models.QuanTri.NhomKho.ViTriDuocPhamVatTus;
using Camino.Core.Domain.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus;

namespace Camino.Api.Models.MappingProfile
{
    public class ViTriDeDuocPhamVaVatTuMappingProfile : Profile
    {
        public ViTriDeDuocPhamVaVatTuMappingProfile()
        {
            CreateMap<ViTriDeDuocPhamVatTu, ViTriDeDuocPhamVaTuViewModel>();
            CreateMap<ViTriDeDuocPhamVaTuViewModel, ViTriDeDuocPhamVatTu>();
        }
    }
}
