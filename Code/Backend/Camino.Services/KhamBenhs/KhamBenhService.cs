using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.KhamBenhs;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Services.KhamBenhs
{
    [ScopedDependency(ServiceType = typeof(IKhamBenhService))]
    public class KhamBenhService : MasterFileService<YeuCauKhamBenh>, IKhamBenhService
    {
        public KhamBenhService(IRepository<YeuCauKhamBenh> repository) : base(repository)
        {
        }

        public async Task<GridDataSource> GetHangDoiDataForGridAsync(HangDoiQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);
            var now = DateTime.Now.Date;
            var gridVo = BaseRepository.TableNoTracking
                .Where(o => !(o.TrangThai == KhamBenhEnum.TrangThaiDichVuKhamEnum.HuyKham ||
                o.TrangThai == KhamBenhEnum.TrangThaiDichVuKhamEnum.DaKham) &&
                (o.YeuCauTiepNhan.TrangThai != TrangThaiYeuCauTiepNhanEnum.ChuaDen ||
                (o.YeuCauTiepNhan.TrangThai == TrangThaiYeuCauTiepNhanEnum.ChuaDen && o.YeuCauTiepNhan != null && o.YeuCauTiepNhan.NgayHenKham <= now))
                )
               .Select(p => new HangDoiGridVo
               {
                   Id = p.Id,
                   YeuCauTiepNhanId = p.YeuCauTiepNhanId,
                   SoThuTu = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.SoThuTu : 0,
                   HoTen = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.HoTen : "",
                   GioiTinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.GioiTinh : Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens.LoaiGioiTinh.ChuaXacDinh,
                   NgaySinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.NgaySinh : null,
                   ThangSinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.ThangSinh : null,
                   NamSinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.NamSinh : null,
                   TrangThai = p.TrangThai,
                   TrangThaiYeuCauTiepNhan = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.TrangThai : null

               }).ApplyLike(queryInfo.HoTen, g => g.HoTen);



            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(o => o.TrangThai).ThenBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }

        public async Task<GridDataSource> GetLichSuKham1NguoiBenhDataForGridAsync(QueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);
            var now = DateTime.Now.Date;
            var gridVo = BaseRepository.TableNoTracking
                .Where(o => o.TrangThai == KhamBenhEnum.TrangThaiDichVuKhamEnum.DaKham && o.YeuCauTiepNhan != null &&
                o.YeuCauTiepNhan.NguoiBenhId == queryInfo.QueryId)
               .Select(p => new LichSuKham1NguoiBenhGridVo
               {
                   Id = p.Id,
                   LyDoKhamBenh = p.LyDoKhamBenh,
                   CachGiaiQuyet = p.CachGiaiQuyet,
                   NgayHoanThanhKham = p.ThoiDiemHoanThanh,
                   NoiDungChanDoan = p.NoiDungChanDoan,
                   BacSiKham = p.NhanVienHoanThanhKham != null && p.NhanVienHoanThanhKham.User != null ? p.NhanVienHoanThanhKham.User.HoTen : ""

               });

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }

        public async Task<GridDataSource> GetLichSuDataForGridAsync(LichSuKhamQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(o => (o.TrangThai == KhamBenhEnum.TrangThaiDichVuKhamEnum.DaKham ||
                o.TrangThai == KhamBenhEnum.TrangThaiDichVuKhamEnum.HuyKham) &&
                (queryInfo.GioiTinhs == null || queryInfo.GioiTinhs.Count == 0 || queryInfo.GioiTinhs.Contains(o.YeuCauTiepNhan.GioiTinh)) &&
                (queryInfo.TrangThais == null || queryInfo.TrangThais.Count == 0 || queryInfo.TrangThais.Contains(o.TrangThai)) &&
                (queryInfo.NgayHoanThanhTu == null || queryInfo.NgayHoanThanhTu <= o.ThoiDiemHoanThanh) &&
                (queryInfo.NgayHoanThanhDen == null || queryInfo.NgayHoanThanhDen >= o.ThoiDiemHoanThanh))
               .Select(p => new LichSuKhamGridVo
               {
                   Id = p.Id,
                   MaYeuCauTiepNhan = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.MaYeuCauTiepNhan : "",
                   MaNguoiBenh = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.NguoiBenh != null ? p.YeuCauTiepNhan.NguoiBenh.MaNguoiBenh : "",
                   HoTen = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.HoTen : "",
                   GioiTinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.GioiTinh : Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens.LoaiGioiTinh.ChuaXacDinh,
                   NgaySinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.NgaySinh : null,
                   ThangSinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.ThangSinh : null,
                   NamSinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.NamSinh : null,
                   SoDienThoai = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.SoDienThoai : "",
                   TenTinhThanh = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.TinhThanh != null ? p.YeuCauTiepNhan.TinhThanh.Ten : "",
                   TenQuanHuyen = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.QuanHuyen != null ? p.YeuCauTiepNhan.QuanHuyen.Ten : "",
                   TenPhuongXa = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.PhuongXa != null ? p.YeuCauTiepNhan.PhuongXa.Ten : "",
                   TenKhomAp = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.KhomAp != null ? p.YeuCauTiepNhan.KhomAp.Ten : "",
                   SoNha = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.SoNha : "",
                   NguoiTiepNhan = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.NhanVienTiepNhan != null && p.YeuCauTiepNhan.NhanVienTiepNhan.User != null ? p.YeuCauTiepNhan.NhanVienTiepNhan.User.HoTen : "",
                   NgayTiepNhan = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.ThoiDiemTiepNhan : null,
                   LyDoTiepNhan = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.LyDoTiepNhan : "",
                   TrangThai = p.TrangThai,
                   NgayHoanThanh = p.ThoiDiemHoanThanh

               }).ApplyLike(queryInfo.SearchString, g => g.HoTen, g => g.SoDienThoai);



            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }
    }
}
