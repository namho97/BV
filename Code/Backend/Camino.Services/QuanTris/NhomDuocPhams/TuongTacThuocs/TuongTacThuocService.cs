using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs;
using Camino.Core.Helpers;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomDuocPhams.TuongTacThuocs
{
    [ScopedDependency(ServiceType = typeof(ITuongTacThuocService))]
    public class TuongTacThuocService : MasterFileService<TuongTacThuoc>, ITuongTacThuocService
    {
        IRepository<ThuocHoacHoatChat> _thuocHoacHoatChatRepository;
        public TuongTacThuocService(IRepository<TuongTacThuoc> repository, IRepository<ThuocHoacHoatChat> thuocHoacHoatChatRepository) : base(repository)
        {
            _thuocHoacHoatChatRepository = thuocHoacHoatChatRepository;
        }
        public async Task<GridDataSource> GetDataForGridAsync(TuongTacThuocQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
               .Select(p => new TuongTacThuocGridVo
               {
                   Id = p.Id,
                   HoatChat1 = p.ThuocHoacHoatChat1 != null ? p.ThuocHoacHoatChat1.Ten : "",
                   HoatChat2 = p.ThuocHoacHoatChat2 != null ? p.ThuocHoacHoatChat2.Ten : "",
                   CachXuLy = p.CachXuLy,
                   DuocDongHoc = p.DuocDongHoc == true ? "Có" : "Không",
                   DuocLucHoc = p.DuocLucHoc == true ? "Có" : "Không",
                   MucDoChuYKhiChiDinh = p.MucDoChuYKhiChiDinh != null? p.MucDoChuYKhiChiDinh.GetDescription() :"",
                   MucDoTuongTac = p.MucDoTuongTac != null ? p.MucDoTuongTac.GetDescription() :"",
                   QuyTac = p.QuyTac == true ? "Có" : "Không",
                   ThuocThucAn = p.ThuocThucAn == true ? "Có" : "Không",
                   TuongTacHauQua = p.TuongTacHauQua,
               });
            if(!string.IsNullOrEmpty(queryInfo.HoatChat1))
            {
                gridVo = gridVo.ApplyLike(queryInfo.HoatChat1, g => g.HoatChat1);
            }
            if(!string.IsNullOrEmpty(queryInfo.HoatChat2))
            {
                gridVo = gridVo.ApplyLike(queryInfo.HoatChat2, g => g.HoatChat2);
            }
            if(!string.IsNullOrEmpty(queryInfo.TuongTacHauQua))
            {
                gridVo = gridVo.ApplyLike(queryInfo.TuongTacHauQua, g => g.TuongTacHauQua);
            }
            if(!string.IsNullOrEmpty(queryInfo.CachXuLy))
            {
                gridVo = gridVo.ApplyLike(queryInfo.CachXuLy, g => g.CachXuLy);
            }  


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
                .ApplyLike(queryInfo.Query, g => g.ThuocHoacHoatChat1.Ten,g=> g.ThuocHoacHoatChat2.Ten)
                .Take(queryInfo.Take)
                .ToListAsync();

            var query = lst.Select(item => new LookupItemVo()
            {
                DisplayName = (item.ThuocHoacHoatChat1 != null ? item.ThuocHoacHoatChat1?.Ten +" - " : "")  +  (item.ThuocHoacHoatChat2 != null ? item.ThuocHoacHoatChat2?.Ten :""),
                KeyId = item.Id,
            }).ToList();
            return query;
        }
        public async Task<List<LookupItemVo>> GetLookupThuocHoacHoatChat(LookupQueryInfo queryInfo)
        {
            var lst = await _thuocHoacHoatChatRepository.TableNoTracking
                .ApplyLike(queryInfo.Query, g => g.Ten)
                .Take(queryInfo.Take)
                .ToListAsync();

            var query = lst.Select(item => new LookupItemVo()
            {
                DisplayName = item.Ten,
                KeyId = item.Id,
            }).ToList();
            return query;
        }
    }

}
