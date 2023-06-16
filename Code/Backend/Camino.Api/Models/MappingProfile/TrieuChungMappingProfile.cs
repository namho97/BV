using AutoMapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.TrieuChungs;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.TrieuChungs;

namespace Camino.Api.Models.MappingProfile
{
    public class TrieuChungMappingProfile : Profile
    {
        public TrieuChungMappingProfile()
        {
            CreateMap<TrieuChung, TrieuChungViewModel>();

            CreateMap<TrieuChungViewModel, TrieuChung>();

        }
    }
  
}
