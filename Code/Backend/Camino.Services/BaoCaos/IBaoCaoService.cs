using Camino.Core.Domain;
using Camino.Core.Domain.BaoCaos;
using Camino.Core.Domain.TiepNhans;

namespace Camino.Services.BaoCaos
{
    public interface IBaoCaoService : IMasterFileService<YeuCauTiepNhan>
    {
        Task<GridDataSource> GetDoanhThuDataForGridAsync(BaoCaoDoanhThuQueryInfo queryInfo);
        Task<GridDataSource> GetHenKhamDataForGridAsync(BaoCaoHenKhamQueryInfo queryInfo);
        Task<GridDataSource> GetKhamBenhDataForGridAsync(BaoCaoKhamBenhQueryInfo queryInfo);
        Task<GridDataSource> GetPhatThuocDataForGridAsync(BaoCaoPhatThuocQueryInfo queryInfo);
    }
}
