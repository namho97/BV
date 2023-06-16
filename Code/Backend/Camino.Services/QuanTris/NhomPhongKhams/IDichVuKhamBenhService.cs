using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    public interface IDichVuKhamBenhService : IMasterFileService<DichVuKhamBenh>
    {
        DichVuKhamBenh? GetDichVuKhamBenhMacDinh();
        bool KiemTraTrungMaAsync(long dichVuKhamId, string maDichVuKham, List<string> maDichVuKhamTemps = null);
        Task<GridDataSource> GetDataForGridAsync(DichVuKhamQueryInfo queryInfo);
        Task<GridDataSource> GetDataChildForGridAsync(DichVuKhamQueryInfo queryInfo);
        Task<List<DichVuKhamLookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
    }
}
