using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    public interface IToaThuocMauService : IMasterFileService<ToaThuocMau>
    {
        Task<GridDataSource> GetDataForGridAsync(ToaThuocMauQueryInfo queryInfo);
        Task<GridDataSource> GetToaMauChiTietDataForGridAsync(long toaThuocMauId);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null);


    }
}
