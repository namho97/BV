using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhos.NhaCungCaps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomKhos.NhaCungCaps
{
    public interface INhaCungCapService : IMasterFileService<NhaCungCap>
    {
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        Task<GridDataSource> GetDataForGridAsync(NhaCungCapQueryInfo queryInfo);
        bool KiemTraTrungMaSoThueAsync(long Id, string ma, List<string> mas = null);
        bool KiemTraTrungTenAsync(long Id, string ma, List<string> mas = null);
    }
}
