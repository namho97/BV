using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    public interface INguoiBenhService : IMasterFileService<NguoiBenh>
    {
        Task<GridDataSource> GetDataForGridAsync(NguoiBenhQueryInfo queryInfo);
        long? GetNgheNghiepId(string? ngheNghiep);
    }
}
