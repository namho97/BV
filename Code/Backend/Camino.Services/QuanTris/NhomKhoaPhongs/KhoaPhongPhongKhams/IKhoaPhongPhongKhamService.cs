using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.KhoaPhongPhongKhams;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongPhongKhams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongPhongKhams
{
    public interface IKhoaPhongPhongKhamService : IMasterFileService<KhoaPhongPhongKham>
    {
        Task<GridDataSource> GetDataForGridAsync(KhoaPhongPhongKhamQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        bool KiemTraTrungTenAsync(long Id, string ma);
    }
}
