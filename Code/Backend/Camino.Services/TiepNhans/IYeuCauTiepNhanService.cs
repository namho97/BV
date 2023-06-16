using Camino.Core.Domain;
using Camino.Core.Domain.TiepNhans;
using Camino.Core.Domain.TrangChus;

namespace Camino.Services.TiepNhans
{
    public interface IYeuCauTiepNhanService : IMasterFileService<YeuCauTiepNhan>
    {
        Task<GridDataSource> GetDataForGridAsync(YeuCauTiepNhanQueryInfo queryInfo);
        Task<GridDataSource> GetLichSuDataForGridAsync(YeuCauTiepNhanQueryInfo queryInfo);
        bool KiemTraTrungSoThuTu(int soThuTu, long id = 0);
        dynamic GetDataLichHenKham(TrangChuQueryInfo queryInfo);
        Task<GridDataSource> GetDataLichHenKhamTheoNgay(LichHenKhamTheoNgayQueryInfo queryInfo);
        dynamic GetDataTinhTrangKham(TrangChuQueryInfo queryInfo);
        Task<GridDataSource> GetDataTinhTrangKhamTheoNgay(TinhTrangKhamNgayQueryInfo queryInfo);
        dynamic GetDataChiTietTiepNhan(TrangChuQueryInfo queryInfo);
    }
}
