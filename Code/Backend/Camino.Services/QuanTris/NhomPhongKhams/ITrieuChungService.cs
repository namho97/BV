using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.TrieuChungs;


namespace Camino.Services.QuanTris.NhomPhongKhams
{
    public interface ITrieuChungService : IMasterFileService<TrieuChung>
    {
        List<TrieuChungGridVo> GetDataTreeView(TrieuChungQueryInfo queryInfo);
        Task<bool> IsTenExists(string ten, long id = 0);
        //Task<List<TrieuChungItemTemplate>> GetListTrieuChungCha(DropDownListRequestModel model);
      
        Task<IEnumerable<LookupItemVo>> GetDataTreeViewChildren(long Id);
        Task<List<TrieuChung>> FindChildren(long Id);
        Task<List<TrieuChung>> GetCapNhom(long? Id);
        Task<List<TrieuChung>> GetNameTrieuChung(long? TrieuChungChaId);

        bool KiemTraTrungTenAsync(long Id, string ten);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo, long? id);
    }
}
