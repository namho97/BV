using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds;
using Camino.Core.Helpers;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    [ScopedDependency(ServiceType = typeof(IIcdService))]
    public class IcdService : MasterFileService<Icd>, IIcdService
    {
        public IcdService(IRepository<Icd> repository) : base(repository)
        {
        }

        public async Task<GridDataSource> GetDataForGridAsync(IcdQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);


            var gridVos = BaseRepository.TableNoTracking;

            var gridVo = BaseRepository.TableNoTracking
                .Where(d =>
                 (queryInfo.GioiTinh == null || d.GioiTinh == (LoaiGioiTinh)queryInfo.GioiTinh) &&
                 (queryInfo.ManTinh == null || d.ManTinh == (queryInfo.GioiTinh == 1 ? true : false) &&
                 (queryInfo.BenhThuongGap == null || d.BenhThuongGap == (queryInfo.BenhThuongGap == 1 ? true : false)) &&
                 (queryInfo.BenhNam == null || d.BenhNam == (queryInfo.BenhNam == 1 ? true : false)) &&
                 (queryInfo.KhongBaoHiem == null || d.KhongBaoHiem == (queryInfo.KhongBaoHiem == 1 ? true : false)) &&
                 (queryInfo.NgoaiDinhSuat == null || d.NgoaiDinhSuat == (queryInfo.NgoaiDinhSuat == 1 ? true : false)) &&
                 (queryInfo.HieuLuc == null || d.HieuLuc == (queryInfo.HieuLuc == 1 ? true : false))
                   )
                )
               .Select(s => new IcdGridVo
               {
                   Id = s.Id,
                   Ma = s.Ma,
                   TenTiengViet = s.TenTiengViet,
                   TenTiengAnh = s.TenTiengAnh,
                   GioiTinh = s.GioiTinh,

                   ManTinh = s.ManTinh == true ? "Có" : "Không",
                   BenhThuongGap = s.BenhThuongGap == true ? "Có" : "Không",
                   BenhNam = s.BenhNam == true ? "Có" : "Không",
                   KhongBaoHiem = s.KhongBaoHiem == true ? "Có" : "Không",
                   NgoaiDinhSuat = s.NgoaiDinhSuat == true ? "Có" : "Không",
                   HieuLuc = s.HieuLuc,
                   HieuLucDisplay = s.HieuLuc == true ? "Có" : "Không",
                   GioiTinhDisplay = s.GioiTinh != null ? s.GioiTinh.GetDescription() : ""
               }).ApplyLike(queryInfo.Ma, g => g.Ma)
                 .ApplyLike(queryInfo.TenTiengViet, f => f.TenTiengViet)
                 .ApplyLike(queryInfo.TenTiengAnh, f => f.TenTiengAnh);


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };
        }

        public List<LookupItemVo> GetLookup(LookupQueryInfo queryInfo)
        {
            var data = BaseRepository.TableNoTracking.Select(o => new LookupItemVo
            {
                KeyId = o.Id,
                DisplayName = o.TenTiengViet,
                Description = o.NoiDungChanDoan
            }).ApplyLike(queryInfo.Query, o => o.DisplayName).OrderBy(o => o.DisplayName).Skip(0).Take(50).ToList();
            if (queryInfo.Id > 0 && !data.Any(o => o.KeyId == queryInfo.Id) && string.IsNullOrEmpty(queryInfo.Query))
            {
                var item = BaseRepository.TableNoTracking.FirstOrDefault(o => o.Id == queryInfo.Id);
                if (item != null)
                {
                    data.Insert(0, new LookupItemVo
                    {
                        KeyId = item.Id,
                        DisplayName = item.TenTiengViet,
                        Description = item.NoiDungChanDoan
                    });
                }
            }
            return data;
        }
        public bool KiemTraTrungMa(string ma, long? id)
        {
            if (string.IsNullOrEmpty(ma) || id == null)
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => x.Id != id && x.Ma.Equals(ma));
            return kiemTra;
        }
    }
}
