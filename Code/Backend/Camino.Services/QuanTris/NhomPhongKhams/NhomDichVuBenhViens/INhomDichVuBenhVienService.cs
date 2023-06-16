using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomPhongKhams.NhomDichVuBenhViens
{
    public interface INhomDichVuBenhVienService : IMasterFileService<NhomDichVuBenhVien>
    {
        List<NhomDichVuGridVo> GetDataTreeView(NhomDichVuQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo,long? id);
        bool KiemTraTrungTenAsync(long Id, string ten);
    }
}
