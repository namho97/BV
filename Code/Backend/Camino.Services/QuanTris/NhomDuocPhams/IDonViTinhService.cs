using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DonViTinhs;

namespace Camino.Services.QuanTris.NhomDuocPhams
{
    public interface IDonViTinhService : IMasterFileService<DonViTinh>
    {
        Task<GridDataSource> GetDataForGridAsync(DonViTinhQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null);
    }
}
