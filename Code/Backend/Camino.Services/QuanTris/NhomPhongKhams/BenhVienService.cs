using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.BenhViens;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.LoaiBenhViens;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    [ScopedDependency(ServiceType = typeof(IBenhVienService))]
    public class BenhVienService : MasterFileService<BenhVien>, IBenhVienService
    {
        IRepository<LoaiBenhVien> _loaiBenhVienrepository;
        public BenhVienService(IRepository<BenhVien> repository,
            IRepository<LoaiBenhVien> loaiBenhVienrepository) : base(repository)
        {
            _loaiBenhVienrepository = loaiBenhVienrepository;
        }

        public async Task<GridDataSource> GetDataForGridAsync(BenhVienQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(d => (queryInfo.Ma == null || d.Ma == queryInfo.Ma) &&
                           (queryInfo.Ten == null || d.Ten == queryInfo.Ten) &&
                           (queryInfo.TenVietTat == null || d.TenVietTat == queryInfo.TenVietTat) &&
                           (queryInfo.SoDienThoai == null || d.SoDienThoai == queryInfo.SoDienThoai) &&
                           (queryInfo.Email == null || d.Email == queryInfo.Email) &&
                           (queryInfo.LoaiBenhVienId == null || d.LoaiBenhVienId == queryInfo.LoaiBenhVienId)
                      )
               .Select(p => new BenhVienGridVo
               {
                   Id = p.Id,
                   Ma = p.Ma,
                   Ten = p.Ten,
                   DiaChi = p.DiaChi,
                   Email = p.Email,
                   HangBenhVien = p.HangBenhVien,
                   HieuLuc = p.HieuLuc,
                   LoaiBenhVien = p.LoaiBenhVienId != null && p.LoaiBenhVienId != null ? p.LoaiBenhVien.Ten : "",
                   SoDienThoai = p.SoDienThoai,
                   TenVietTat = p.TenVietTat,
                   TuyenChuyenMonKyThuat = p.TuyenChuyenMonKyThuat

               }).ApplyLike(queryInfo.SearchString, g => g.Ten);

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };
        }

        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var data = BaseRepository.TableNoTracking.Select(o => new LookupItemVo
            {
                KeyId = o.Id,
                DisplayName = o.Ten
            }).ApplyLike(queryInfo.Query, o => o.DisplayName).OrderBy(o => o.DisplayName).Skip(0).Take(50).ToList();
            if (queryInfo.Id > 0 && !data.Any(o => o.KeyId == queryInfo.Id) && string.IsNullOrEmpty(queryInfo.Query))
            {
                var item = BaseRepository.TableNoTracking.FirstOrDefault(o => o.Id == queryInfo.Id);
                if (item != null)
                {
                    data.Insert(0, new LookupItemVo
                    {
                        KeyId = item.Id,
                        DisplayName = item.Ten
                    });
                }
            }
            return data;
        }
        public async Task<List<LookupItemVo>> GetLookupLoaiBenhVien(LookupQueryInfo queryInfo)
        {
            var lst = await _loaiBenhVienrepository.TableNoTracking
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
