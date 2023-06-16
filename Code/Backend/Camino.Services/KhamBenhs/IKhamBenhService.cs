using Camino.Core.Domain;
using Camino.Core.Domain.KhamBenhs;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;

namespace Camino.Services.KhamBenhs
{
    public interface IKhamBenhService : IMasterFileService<YeuCauKhamBenh>
    {
        Task<GridDataSource> GetHangDoiDataForGridAsync(HangDoiQueryInfo queryInfo);
        Task<GridDataSource> GetLichSuKham1NguoiBenhDataForGridAsync(QueryInfo queryInfo);
        Task<GridDataSource> GetLichSuDataForGridAsync(LichSuKhamQueryInfo queryInfo);
    }
}
