using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.VanBangChuyenMons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomHanhChinhs
{
    public interface IVanBangChuyenMonService : IMasterFileService<VanBangChuyenMon>
    {
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        Task<GridDataSource> GetDataForGridAsync(VanBangChuyenMonQueryInfo queryInfo);
        bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null);
        bool KiemTraTrungTenAsync(long Id, string ma, List<string> mas = null);
    }
}
