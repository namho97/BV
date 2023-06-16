using AutoMapper;
using Camino.Api.Models.BaoCao;
using Camino.Core.Domain.BaoCaos;

namespace Camino.Api.Models.MappingProfile
{
    public class BaoCaoMappingProfile : Profile
    {
        public BaoCaoMappingProfile()
        {
            CreateMap<BaoCaoDoanhThuGridVo, DoanhThuExportExcel>();
            CreateMap<BaoCaoHenKhamGridVo, HenKhamExportExcel>();
            CreateMap<BaoCaoKhamBenhGridVo, KhamBenhExportExcel>();
            CreateMap<BaoCaoPhatThuocGridVo, PhatThuocExportExcel>();
        }
    }
}
