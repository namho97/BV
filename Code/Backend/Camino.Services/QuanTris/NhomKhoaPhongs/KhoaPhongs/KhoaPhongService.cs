using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs;
using Camino.Data;
using Camino.Core.Helpers;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongs
{
    [ScopedDependency(ServiceType = typeof(IKhoaPhongService))]
    public class KhoaPhongService : MasterFileService<KhoaPhong>, IKhoaPhongService
    {
        public KhoaPhongService(IRepository<KhoaPhong> repository) : base(repository)
        {
        }
        public async Task<GridDataSource> GetDataForGridAsync(KhoaPhongQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);
            var gridVo = BaseRepository.TableNoTracking
               .Where(d => ((queryInfo.CoKhamNgoaiTru == null || d.CoKhamNgoaiTru == queryInfo.CoKhamNgoaiTru) &&
                           (queryInfo.CoKhamNoiTru == null || d.CoKhamNoiTru == queryInfo.CoKhamNoiTru) &&
                           (queryInfo.HieuLuc == null || d.HieuLuc == queryInfo.HieuLuc) &&
                           (queryInfo.LoaiKhoaPhong == null || d.LoaiKhoaPhong == queryInfo.LoaiKhoaPhong)
                           ))
               .Select(p => new KhoaPhongGridVo
               {
                   Id = p.Id,
                   Ma = p.Ma,
                   Ten = p.Ten,
                   HieuLuc = p.HieuLuc,
                   CoKhamNgoaiTru =p.CoKhamNgoaiTru == true ? "Có khám ngoại trú":"",
                   CoKhamNoiTru = p.CoKhamNoiTru == true ? "Có khám nội trú" : "",
                   LoaiKhoaPhong = p.LoaiKhoaPhong != null ? p.LoaiKhoaPhong.GetValueOrDefault().GetDescription() :"",
                   SoGiuongKeHoach = p.SoGiuongKeHoach ,
                   SoTienThuTamUng = p.SoTienThuTamUng
               }).ApplyLike(queryInfo.Ma, g => g.Ma)
               .ApplyLike(queryInfo.Ten, g => g.Ten);


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


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
        public bool KiemTraTrungTenAsync(long Id, string ten)
        {
            if (string.IsNullOrEmpty(ten))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ten.ToLower() == ten.ToLower());
            return kiemTra;
        }
    }
}
