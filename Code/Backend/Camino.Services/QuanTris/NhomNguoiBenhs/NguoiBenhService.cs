using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.NgheNghieps;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    [ScopedDependency(ServiceType = typeof(INguoiBenhService))]
    public class NguoiBenhService : MasterFileService<NguoiBenh>, INguoiBenhService
    {
        IRepository<NgheNghiep> _ngheNghieprepository;
        public NguoiBenhService(IRepository<NguoiBenh> repository, IRepository<NgheNghiep> ngheNghieprepository) : base(repository)
        {
            _ngheNghieprepository = ngheNghieprepository;
        }
        public async Task<GridDataSource> GetDataForGridAsync(NguoiBenhQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(o =>
                (queryInfo.GioiTinhs == null || queryInfo.GioiTinhs.Count == 0 || queryInfo.GioiTinhs.Contains(o.GioiTinh)) &&
                (queryInfo.Ma == null || o.MaNguoiBenh == queryInfo.Ma) &&
                (queryInfo.SoDienThoai == null || o.SoDienThoai == queryInfo.SoDienThoai) &&
                (queryInfo.SoChungMinhThu == null || o.SoChungMinhThu == queryInfo.SoChungMinhThu) &&
                ((queryInfo.NgaySinh == null && queryInfo.ThangSinh == null && queryInfo.NamSinh == null ||
                 o.NgaySinh == queryInfo.NgaySinh && o.ThangSinh == queryInfo.ThangSinh && o.NamSinh == queryInfo.NamSinh.GetValueOrDefault()) ||
                (queryInfo.NamSinh == null || o.NamSinh == queryInfo.NamSinh.GetValueOrDefault())
                )
                )
               .Select(p => new NguoiBenhGridVo
               {
                   Id = p.Id,
                   MaNguoiBenh = p.MaNguoiBenh,
                   HoTen = p.HoTen,
                   GioiTinh = p.GioiTinh,
                   NgaySinh = p.NgaySinh,
                   ThangSinh = p.ThangSinh,
                   NamSinh = p.NamSinh,
                   SoDienThoai = p.SoDienThoai,
                   SoChungMinhThu = p.SoChungMinhThu,
                   TinhThanhId = p.TinhThanhId,
                   QuanHuyenId = p.QuanHuyenId,
                   PhuongXaId = p.PhuongXaId,
                   KhomApId = p.KhomApId,
                   TenTinhThanh = p.TinhThanh != null ? p.TinhThanh.Ten : "",
                   TenQuanHuyen = p.QuanHuyen != null ? p.QuanHuyen.Ten : "",
                   TenPhuongXa = p.PhuongXa != null ? p.PhuongXa.Ten : "",
                   TenKhomAp = p.KhomAp != null ? p.KhomAp.Ten : "",
                   NgheNghiep = p.NgheNghiep,
                   HoTenNguoiGiamHo = p.HoTenNguoiGiamHo,
                   NoiLamViec = p.NoiLamViec,
                   Email = p.Email,
                   DanToc = p.DanToc != null ? p.DanToc.Ten : "",
                   QuocTich = p.QuocTich != null ? p.QuocTich.QuocTich : ""

               }).ApplyLike(queryInfo.HoTen, g => g.HoTen)
               .ApplyLike(queryInfo.SoDienThoai, g => g.SoDienThoai)
               .ApplyLike(queryInfo.SoChungMinhThu, g => g.SoChungMinhThu);




            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }
        public long? GetNgheNghiepId(string? ngheNghiep)
        {
            var ngheNghieps = _ngheNghieprepository.TableNoTracking.Where(d => (ngheNghiep == null || d.Ten.ToLower().Trim() == ngheNghiep.ToLower().Trim())).Select(d => d.Id).FirstOrDefault();
            return ngheNghieps;
        }
    }
}
