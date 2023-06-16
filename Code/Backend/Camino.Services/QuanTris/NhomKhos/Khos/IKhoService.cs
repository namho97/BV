using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhos.Khos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomKhos.Khos
{
    public interface IKhoService : IMasterFileService<Kho>
    {
        Task<GridDataSource> GetDataForGridAsync(KhoQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungTenAsync(long Id, string ten, List<string> mas = null);
    }
}
