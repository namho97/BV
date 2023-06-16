using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.QuanHeThanNhans;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomNguoiBenhs
{
    public interface IQuanHeNhanThanService : IMasterFileService<QuanHeNhanThan>
    {
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        Task<GridDataSource> GetDataForGridAsync(QuanHeThanNhanQueryInfo queryInfo);
        bool KiemTraTrungTenAsync(long Id, string ma, List<string> mas = null);
    }
}
