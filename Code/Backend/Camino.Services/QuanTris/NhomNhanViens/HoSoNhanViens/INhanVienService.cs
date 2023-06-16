using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public interface INhanVienService : IMasterFileService<NhanVien>
    {
        Task<GridDataSource> GetDataForGridAsync(NhanVienQueryInfo queryInfo);
        bool CheckIsExistPhone(string sdt, long id = 0);
        Task<ICollection<LookupItemVo>> GetLookup(LookupQueryInfo lookupQueryInfo, bool excludeCurrentUser = false);
    }
}
