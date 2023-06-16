using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongNhanViens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongNhanViens
{
   
    public interface IKhoaPhongNhanVienService : IMasterFileService<KhoaPhongNhanVien>
    {
        Task<GridDataSource> GetDataForGridAsync(KhoaPhongNhanVienQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
    }
}
