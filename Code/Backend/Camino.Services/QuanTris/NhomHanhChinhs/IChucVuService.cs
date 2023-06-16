using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucVus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomHanhChinhs
{
    public interface IChucVuService : IMasterFileService<ChucVu>
    {
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        Task<GridDataSource> GetDataForGridAsync(ChucVuQueryInfo queryInfo);
        bool KiemTraTrungTenAsync(long Id, string ma, List<string> mas = null);
    }
}
