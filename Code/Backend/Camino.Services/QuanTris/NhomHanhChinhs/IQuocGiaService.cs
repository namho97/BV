using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias;

namespace Camino.Services.QuanTris.NhomHanhChinhs
{
    public interface IQuocGiaService : IMasterFileService<QuocGia>
    {
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        Task<GridDataSource> GetDataForGridAsync(QuocGiaQueryInfo queryInfo);
        bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null);
    }
}
