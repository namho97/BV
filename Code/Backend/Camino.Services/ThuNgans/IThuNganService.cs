using Camino.Core.Domain;
using Camino.Core.Domain.ThuNgans;
using Camino.Core.Domain.ThuNgans.PhieuThus;
using Camino.Core.Domain.TrangChus;

namespace Camino.Services.ThuNgans
{
    public interface IThuNganService : IMasterFileService<PhieuThu>
    {
        Task<GridDataSource> GetNguoiBenhChuaThuDataForGrid(NguoiBenhChuaThuQueryInfo queryInfo);
        Task<GridDataSource> GetNguoiBenhDaThuDataForGrid(NguoiBenhDaThuQueryInfo queryInfo);
        ThongTinVienPhiVo GetThongTinVienPhi(long yeuCauTiepNhanId);
        Task<GridDataSource> GetDichVuChuaThuDataForGrid(long yeuCauTiepNhanId);
        Task<GridDataSource> GetDichVuDaThuDataForGrid(long yeuCauTiepNhanId);
        dynamic GetDataDoanhThuGanDay(TrangChuQueryInfo queryInfo);
        Task<GridDataSource> GetDataDoanhThuTheoNgay(DoanhThuTheoNgayQueryInfo queryInfo);
    }
}
