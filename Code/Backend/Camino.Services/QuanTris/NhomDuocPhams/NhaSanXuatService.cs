using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhaSanXuats;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomDuocPhams
{
    [ScopedDependency(ServiceType = typeof(INhaSanXuatService))]
    public class NhaSanXuatService : MasterFileService<NhaSanXuat>, INhaSanXuatService
    {
        public NhaSanXuatService(IRepository<NhaSanXuat> repository) : base(repository)
        {
        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
                .ApplyLike(queryInfo.Query, g => g.Ma, g => g.Ten)
                .Take(queryInfo.Take)
                .ToListAsync();

            var query = lst.Select(item => new LookupItemVo()
            {
                DisplayName = item.Ten,
                KeyId = item.Id,
            }).ToList();
            return query;
        }
        public async Task<GridDataSource> GetDataForGridAsync(NhaSanXuatQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                //.Where(d => ((queryInfo.Ma == null || d.Ma == queryInfo.Ma) &&
                //            (queryInfo.Ten == null || d.Ten == queryInfo.Ten) &&
                //            (queryInfo.SoDienThoai == null || d.SoDienThoai == queryInfo.SoDienThoai) &&
                //            (queryInfo.Email == null || d.Email == queryInfo.Email)))
               .Select(p => new NhaSanXuatGridVo
               {
                   Id = p.Id,
                   Ma = p.Ma,
                   Ten = p.Ten,
                   HieuLuc = p.HieuLuc,
                   Email = p.Email,
                   SoDienThoai = p.SoDienThoai,
                   DiaChi = p.DiaChi
               }).ApplyLike(queryInfo.Ma, g => g.Ma)
               .ApplyLike(queryInfo.Ten, g => g.Ten)
               .ApplyLike(queryInfo.SoDienThoai, g => g.SoDienThoai)
               .ApplyLike(queryInfo.Email, g => g.Email);


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null)
        {
            if (string.IsNullOrEmpty(ma) || ma.Length < 7)
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ma.Contains(ma));
            return kiemTra || (mas != null && mas.Contains(ma));
        }
    }
}

