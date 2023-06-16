using AutoMapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.QuocGias;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias;

namespace Camino.Api.Models.MappingProfile
{
    public class QuocGiaMappinpProfile : Profile
    {
        public QuocGiaMappinpProfile()
        {
            CreateMap<QuocGia, QuocGiaViewModel>();
            CreateMap<QuocGiaViewModel, QuocGia>();
        }
    }
}
