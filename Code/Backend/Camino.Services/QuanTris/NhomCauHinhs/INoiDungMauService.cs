using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus;
using static Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus.NoiDungMauEnum;

namespace Camino.Services.QuanTris.NhomCauHinhs
{
    public interface INoiDungMauService : IMasterFileService<NoiDungMau>
    {
        Task<GridDataSource> GetDataForGridAsync(NoiDungMauQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(NoiDungMauLookupQueryInfo model);
        NoiDungMau GetNoiDungMau(LoaiNoiDungMauEnum loai, string noiDung);

    }
}
