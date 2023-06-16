using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs
{
    [ScopedDependency(ServiceType = typeof(INhomDichVuThuongDungService))]
    public class NhomDichVuThuongDungService : MasterFileService<GoiDichVu>, INhomDichVuThuongDungService
    {
        IRepository<GoiDichVuChiTietDichVuKhamBenh> _repositorys;
        public NhomDichVuThuongDungService(IRepository<GoiDichVu> repository,
            IRepository<GoiDichVuChiTietDichVuKhamBenh> repositorys) : base(repository)
        {
            _repositorys = repositorys;
        }
        public async Task<GridDataSource> GetDataForGridAsync(NhomDichVuThuongDungQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);
            var test = _repositorys.TableNoTracking.ToList();

            var gridVo = BaseRepository.TableNoTracking
               .Where(d => (queryInfo.HieuLuc == null || d.HieuLuc == queryInfo.HieuLuc))
               .Select(p => new NhomDichVuThuongDungGridVo
               {
                   Id = p.Id,
                   TenNhom = p.Ten,
                   HieuLuc = p.HieuLuc,
                   MoTa = p.MoTa,
               }).ApplyLike(queryInfo.Ten, g => g.TenNhom);


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
                 .ApplyLike(queryInfo.Query, g => g.Ten, g => g.Ten)
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
