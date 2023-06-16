using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.NgheNghieps;

namespace Camino.Services.QuanTris.NhomHanhChinhs
{
    public interface INgheNghiepService : IMasterFileService<NgheNghiep>
    {
        Task<GridDataSource> GetDataForGridAsync(NgheNghiepQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null);
    }
}
