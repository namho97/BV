using AutoMapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.Icds;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds;

namespace Camino.Api.Models.MappingProfile
{
    public class ICDMappingOrofile : Profile
    {
        public ICDMappingOrofile()
        {
            CreateMap<Icd, IcdViewModel>();
            CreateMap<Icd, IcdGetViewModel>();
            CreateMap<IcdViewModel, Icd>();
        }
    }
}
