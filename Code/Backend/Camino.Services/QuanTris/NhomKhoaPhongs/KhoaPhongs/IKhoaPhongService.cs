using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongs
{
    public interface IKhoaPhongService : IMasterFileService<KhoaPhong>
    {
        Task<GridDataSource> GetDataForGridAsync(KhoaPhongQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungTenAsync(long Id, string ma);
    }
}
