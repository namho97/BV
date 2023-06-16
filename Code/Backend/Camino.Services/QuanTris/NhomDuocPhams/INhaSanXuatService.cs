using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhaSanXuats;

namespace Camino.Services.QuanTris.NhomDuocPhams
{
    public interface INhaSanXuatService : IMasterFileService<NhaSanXuat>
    {
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        Task<GridDataSource> GetDataForGridAsync(NhaSanXuatQueryInfo queryInfo);
        bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null);
    }
}
