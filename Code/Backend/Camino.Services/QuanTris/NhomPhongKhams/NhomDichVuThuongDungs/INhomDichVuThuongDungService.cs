using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs
{
    public interface INhomDichVuThuongDungService :IMasterFileService<GoiDichVu>
    {
        Task<GridDataSource> GetDataForGridAsync(NhomDichVuThuongDungQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungTenAsync(long Id, string ten);
    }
}
