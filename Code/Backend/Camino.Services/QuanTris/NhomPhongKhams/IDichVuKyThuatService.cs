using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    public interface IDichVuKyThuatService : IMasterFileService<DichVuKyThuat>
    {
        DichVuKyThuat? GetDichVuKyThuatMacDinh();
        DichVuKyThuat? GetDichVuKyThuatByTen(string ten);
        Task<List<DichVuKyThuatLookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungMaAsync(long dichVuKyThuatId, string maDichVuKyThuat, List<string> maDichVuKyThuatTemps = null);
        Task<GridDataSource> GetDataForGridAsync(DichVuKyThuatQueryInfo queryInfo);
    }
}
