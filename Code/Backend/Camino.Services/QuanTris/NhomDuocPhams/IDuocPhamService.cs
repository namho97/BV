using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;

namespace Camino.Services.QuanTris.NhomDuocPhams
{
    public interface IDuocPhamService : IMasterFileService<DuocPham>
    {
        Task<GridDataSource> GetDataForGridAsync(DuocPhamQueryInfo queryInfo);
        Task<List<DuocPhamLookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungMaDuocPhamBenhVienAsync(long duocPhamBenhVienId, string maDuocPham, List<string> maDuocPhamTemps = null);
        List<ThongTinDuocPham> GetThongTinDuocPham(List<long> dpIds);
    }
}
