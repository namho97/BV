using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DanTocs;

namespace Camino.Services.QuanTris.NhomHanhChinhs
{
    public interface IDanTocService : IMasterFileService<DanToc>
    {
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        Task<GridDataSource> GetDataForGridAsync(DanTocQueryInfo queryInfo);
        bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null);
    }
}
