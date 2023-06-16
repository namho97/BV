using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    public interface IIcdService : IMasterFileService<Icd>
    {
        Task<GridDataSource> GetDataForGridAsync(IcdQueryInfo queryInfo);
        List<LookupItemVo> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungMa(string ma, long? id);
    }
}
