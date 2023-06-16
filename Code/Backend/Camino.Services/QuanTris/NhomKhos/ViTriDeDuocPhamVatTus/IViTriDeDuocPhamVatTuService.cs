using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus
{
    public interface IViTriDeDuocPhamVatTuService : IMasterFileService<ViTriDeDuocPhamVatTu>
    {
        Task<GridDataSource> GetDataForGridAsync(ViTriDeDuocPhamVatTuQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungTenAsync(long Id, string ten, List<string> mas = null);
    }
}
