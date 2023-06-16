using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.BenhViens;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    public interface IBenhVienService : IMasterFileService<BenhVien>
    {
        Task<GridDataSource> GetDataForGridAsync(BenhVienQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookupLoaiBenhVien(LookupQueryInfo queryInfo);
    }
}
