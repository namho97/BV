using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuongDungs;

namespace Camino.Services.QuanTris.NhomDuocPhams
{
    public interface IDuongDungService : IMasterFileService<DuongDung>
    {
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        Task<GridDataSource> GetDataForGridAsync(DuongDungQueryInfo queryInfo);
        bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null);
    }
}
