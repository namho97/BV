using Camino.Core.Domain;
using Camino.Core.Domain.HuongDanSuDungs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.HuongDanSuDungs
{
    public interface IHuongDanSuDungService : IMasterFileService<HuongDanSuDung>
    {
        Task<GridDataSource> GetDataForGridAsync(HuongDanSuDungQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
    }
}
