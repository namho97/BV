using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhomThuocs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomDuocPhams.NhomThuocs
{
    public interface INhomThuocService : IMasterFileService<NhomThuoc>
    {
        List<NhomThuocGridVo> GetDataTreeView(NhomThuocQueryInfo queryInfo);
        Task<bool> IsTenExists(string ten, long id = 0);
        //Task<List<TrieuChungItemTemplate>> GetListTrieuChungCha(DropDownListRequestModel model);

        Task<IEnumerable<LookupItemVo>> GetDataTreeViewChildren(long Id);
        Task<List<NhomThuoc>> FindChildren(long Id);
        Task<List<NhomThuoc>> GetCapNhom(long? Id);
        Task<List<NhomThuoc>> GetNameNhomThuoc(long? TrieuChungChaId);

        bool KiemTraTrungTenAsync(long Id, string ten);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo, long? id);
    }
}
