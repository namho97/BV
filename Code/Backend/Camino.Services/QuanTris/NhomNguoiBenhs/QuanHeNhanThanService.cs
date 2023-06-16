﻿using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.QuanHeThanNhans;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomNguoiBenhs
{
    [ScopedDependency(ServiceType = typeof(IQuanHeNhanThanService))]
    public class QuanHeNhanThanService : MasterFileService<QuanHeNhanThan>, IQuanHeNhanThanService
    {
        public QuanHeNhanThanService(IRepository<QuanHeNhanThan> repository) : base(repository)
        {
        }
        public bool KiemTraTrungTenAsync(long Id, string ten, List<string> tens = null)
        {
            if (string.IsNullOrEmpty(ten))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ten.ToLower().Trim() == ten.ToLower().Trim());
            return kiemTra || (tens != null && tens.Contains(ten));
        }
        public async Task<GridDataSource> GetDataForGridAsync(QuanHeThanNhanQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                //.Where(d => ((queryInfo.TenVietTat == null || d.TenVietTat == queryInfo.TenVietTat) &&
                //            (queryInfo.Ten == null || d.Ten == queryInfo.Ten)
                //            ))
               .Select(p => new QuanHeThanNhanGridVo
               {
                   Id = p.Id,
                   TenVietTat = p.TenVietTat,
                   Ten = p.Ten,
                   HieuLuc = p.HieuLuc,
               }).ApplyLike(queryInfo.TenVietTat, g => g.TenVietTat)
               .ApplyLike(queryInfo.Ten, g => g.Ten);

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
                .Where(d => d.HieuLuc == true)
                .ApplyLike(queryInfo.Query, g => g.TenVietTat, g => g.Ten)
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
