using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomVatTus.NhomVatTus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomVatTus.NhomVatTus
{
    public interface INhomVatTuService : IMasterFileService<NhomVatTu>
    {
        List<NhomVatTuGridVo> GetDataTreeView(NhomVatTuQueryInfo queryInfo);
        Task<bool> IsTenExists(string ten, long id = 0);
        //Task<List<TrieuChungItemTemplate>> GetListTrieuChungCha(DropDownListRequestModel model);

        Task<IEnumerable<LookupItemVo>> GetDataTreeViewChildren(long Id);
        Task<List<NhomVatTu>> FindChildren(long Id);
        Task<List<NhomVatTu>> GetCapNhom(long? Id);
        Task<List<NhomVatTu>> GetNameNhomVatTu(long? TrieuChungChaId);

        bool KiemTraTrungTenAsync(long Id, string ten);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo, long? id);
    }
}
