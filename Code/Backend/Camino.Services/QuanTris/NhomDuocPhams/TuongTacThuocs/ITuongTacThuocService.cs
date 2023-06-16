using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomDuocPhams.TuongTacThuocs
{
    public interface ITuongTacThuocService : IMasterFileService<TuongTacThuoc>
    {
        Task<GridDataSource> GetDataForGridAsync(TuongTacThuocQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo);
        Task<List<LookupItemVo>> GetLookupThuocHoacHoatChat(LookupQueryInfo queryInfo);
    }
}
