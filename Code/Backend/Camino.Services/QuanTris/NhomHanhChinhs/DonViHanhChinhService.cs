using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.Common;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs;
using Camino.Core.Helpers;
using Camino.Data;
using Camino.Data.Extensions;
using Camino.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomHanhChinhs
{
    [ScopedDependency(ServiceType = typeof(IDonViHanhChinhService))]
    public partial class DonViHanhChinhService : MasterFileService<DonViHanhChinh>, IDonViHanhChinhService
    {
        private readonly IUserAgentHelper _userAgentHelper;
        public DonViHanhChinhService(IRepository<DonViHanhChinh> repository, IUserAgentHelper userAgentHelper) : base(repository)
        {
            _userAgentHelper = userAgentHelper;
        }

        public async Task<List<LookupItemVo>> GetTinhThanhLookup(DonViHanhChinhLookupQueryInfo model)
        {
            var data = await BaseRepository.TableNoTracking
                .Where(s => s.CapHanhChinh == CapHanhChinh.TinhThanhPho).Select(s => new LookupItemVo
                {
                    KeyId = s.Id,
                    DisplayName = s.Ten
                }).ApplyLike(model.Query, s => s.DisplayName)
                .OrderBy(o => o.DisplayName).ToListAsync();
            return data;
        }

        public async Task<List<LookupItemVo>> GetPhuongXaLookup(DonViHanhChinhLookupQueryInfo model, long quanHuyenId, long? tinhThanhId = null)
        {
            var data = await BaseRepository.TableNoTracking
                .Where(s => s.CapHanhChinh == CapHanhChinh.PhuongXa && s.TrucThuocDonViHanhChinhId == quanHuyenId &&
                (tinhThanhId == null || s.TrucThuocDonViHanhChinh.TrucThuocDonViHanhChinhId == tinhThanhId))
                .Select(s => new LookupItemVo
                {
                    KeyId = s.Id,
                    DisplayName = s.Ten
                }).ApplyLike(model.Query, s => s.DisplayName).OrderBy(o => o.DisplayName).ToListAsync();
            return data;
        }

        public async Task<List<LookupItemVo>> GetKhomApLookup(DonViHanhChinhLookupQueryInfo model, long khomApId, long? quanHuyenId, long? tinhThanhId = null)
        {
            var data = await BaseRepository.TableNoTracking
                .Where(s => s.CapHanhChinh == CapHanhChinh.KhomAp && s.TrucThuocDonViHanhChinhId == khomApId &&
                (quanHuyenId == null || s.TrucThuocDonViHanhChinh.TrucThuocDonViHanhChinhId == quanHuyenId) &&
                (tinhThanhId == null || s.TrucThuocDonViHanhChinh.TrucThuocDonViHanhChinh.TrucThuocDonViHanhChinhId == tinhThanhId))
                .Select(s => new LookupItemVo
                {
                    KeyId = s.Id,
                    DisplayName = s.Ten
                }).ApplyLike(model.Query, s => s.DisplayName).OrderBy(o => o.DisplayName).ToListAsync();
            return data;
        }

        public async Task<List<LookupItemVo>> GetQuanHuyenLookup(DonViHanhChinhLookupQueryInfo model, long tinhThanhId)
        {
            var data = await BaseRepository.TableNoTracking
                .Where(s => s.CapHanhChinh == CapHanhChinh.QuanHuyen && s.TrucThuocDonViHanhChinhId == tinhThanhId)
                .Select(s => new LookupItemVo
                {
                    KeyId = s.Id,
                    DisplayName = s.Ten
                }).ApplyLike(model.Query, s => s.DisplayName).OrderBy(o => o.DisplayName).ToListAsync();
            return data;
        }

        public string GetFullAddressById(string soNha, long? khomApId, long? phuongXaId, long? quanHuyenId, long? tinhThanhId)
        {
            var tenKhomAp = BaseRepository.TableNoTracking.FirstOrDefault(s => s.CapHanhChinh == CapHanhChinh.KhomAp && s.Id == khomApId)?.Ten;
            var tenPhuongXa = BaseRepository.TableNoTracking.FirstOrDefault(s => s.CapHanhChinh == CapHanhChinh.PhuongXa && s.Id == phuongXaId)?.Ten;
            var tenQuanHuyen = BaseRepository.TableNoTracking.FirstOrDefault(s => s.CapHanhChinh == CapHanhChinh.QuanHuyen && s.Id == quanHuyenId)?.Ten;
            var tenTinhThanh = BaseRepository.TableNoTracking.FirstOrDefault(s => s.CapHanhChinh == CapHanhChinh.TinhThanhPho && s.Id == tinhThanhId)?.Ten;
            var diaChiDayDu = AddressHelper.ApplyFormatAddress(tenTinhThanh, tenQuanHuyen, tenPhuongXa, tenKhomAp, soNha);
            return diaChiDayDu;
        }

        public AddressCode GetAddressCode(string tinhThanh, string quanHuyen, string phuongXa, string khomAp)
        {
            AddressCode addressCode = new AddressCode();
            var tinhThanhData = BaseRepository.TableNoTracking.Where(x => x.TenDonViHanhChinh.Contains(tinhThanh) || x.Ten.Contains(tinhThanh))
               .FirstOrDefault();
            if (tinhThanhData != null)
            {
                addressCode.MaTinhThanhPho = tinhThanhData.Id;
                var quanHuyenData = BaseRepository.TableNoTracking.Where(x => x.TrucThuocDonViHanhChinhId == tinhThanhData.Id && (x.TenDonViHanhChinh.Contains(quanHuyen) || x.Ten.Contains(quanHuyen))).FirstOrDefault();
                if (quanHuyenData != null)
                {
                    addressCode.MaQuanHuyen = quanHuyenData.Id;
                    var phuongXaData = BaseRepository.TableNoTracking.Where(x => x.TrucThuocDonViHanhChinhId == quanHuyenData.Id && (x.TenDonViHanhChinh.Contains(phuongXa) || x.Ten.Contains(phuongXa)))
                        .FirstOrDefault();
                    if (phuongXaData != null)
                    {
                        addressCode.MaPhuongXa = phuongXaData.Id;
                        var khomApData = BaseRepository.TableNoTracking.Where(x => x.TrucThuocDonViHanhChinhId == phuongXaData.Id && (x.TenDonViHanhChinh.Contains(khomAp) || x.Ten.Contains(khomAp)))
                            .FirstOrDefault();
                        if (khomApData != null)
                        {
                            addressCode.MaKhomAp = khomApData.Id;
                        }
                    }
                }
            }
            return addressCode;
        }

        public bool CheckExistMaCapTinhThanhPho(string ma, long donViId = 0)
        {
            if (donViId > 0 && BaseRepository.TableNoTracking.Any(a => a.Id != donViId && a.CapHanhChinh == CapHanhChinh.TinhThanhPho && a.Ma == ma))
                return false;
            if (donViId <= 0 && BaseRepository.TableNoTracking.Any(a => a.CapHanhChinh == CapHanhChinh.TinhThanhPho && a.Ma == ma))
                return false;

            return true;
        }

        public bool CheckExistMaCapQuanHuyen(long trucThuocDonViHanhChinhId, string ma, long donViId = 0)
        {
            if (donViId > 0 &&
                BaseRepository.TableNoTracking
                .Any(a => a.Id != donViId && a.CapHanhChinh == CapHanhChinh.QuanHuyen && a.Ma == ma && a.TrucThuocDonViHanhChinhId == trucThuocDonViHanhChinhId))
                return false;

            if (donViId <= 0 &&
                BaseRepository.TableNoTracking
                .Any(a => a.CapHanhChinh == CapHanhChinh.QuanHuyen && a.Ma == ma && a.TrucThuocDonViHanhChinhId == trucThuocDonViHanhChinhId))
                return false;

            return true;
        }

        public bool CheckExistMaCapPhuongXa(long trucThuocDonViHanhChinhId, string ma, long donViId = 0)
        {
            if (donViId > 0 &&
                BaseRepository.TableNoTracking
                .Any(a => a.Id != donViId && a.CapHanhChinh == CapHanhChinh.PhuongXa && a.Ma == ma && a.TrucThuocDonViHanhChinhId == trucThuocDonViHanhChinhId))
                return false;

            if (donViId <= 0 &&
                BaseRepository.TableNoTracking
                .Any(a => a.CapHanhChinh == CapHanhChinh.PhuongXa && a.Ma == ma && a.TrucThuocDonViHanhChinhId == trucThuocDonViHanhChinhId))
                return false;

            return true;
        }

        public bool CheckExistMaCapKhomAp(long trucThuocDonViHanhChinhId, string ma, long donViId = 0)
        {
            if (donViId > 0 &&
                BaseRepository.TableNoTracking
                .Any(a => a.Id != donViId && a.CapHanhChinh == CapHanhChinh.KhomAp && a.Ma == ma && a.TrucThuocDonViHanhChinhId == trucThuocDonViHanhChinhId))
                return false;

            if (donViId <= 0 &&
                BaseRepository.TableNoTracking
                .Any(a => a.CapHanhChinh == CapHanhChinh.KhomAp && a.Ma == ma && a.TrucThuocDonViHanhChinhId == trucThuocDonViHanhChinhId))
                return false;

            return true;
        }

        public async Task<DonViHanhChinhLookupVo> GetDonViHanhChinhLookupAsync()
        {
            var result = new DonViHanhChinhLookupVo();
            var model = await BaseRepository.TableNoTracking.ToListAsync();

            if (model.Count <= 0)
                return null;

            result.TinhThanhs = model.Where(a => a.CapHanhChinh == CapHanhChinh.TinhThanhPho)
                .Select(a => new LookupItemPhanCapVo()
                {
                    KeyId = a.Id,
                    DisplayName = a.TenDonViHanhChinh,
                    NhomChaId = a.TrucThuocDonViHanhChinhId
                }).ToList();

            result.QuanHuyens = model.Where(a => a.CapHanhChinh == CapHanhChinh.QuanHuyen)
                .Select(a => new LookupItemPhanCapVo()
                {
                    KeyId = a.Id,
                    DisplayName = a.TenDonViHanhChinh,
                    NhomChaId = a.TrucThuocDonViHanhChinhId
                }).ToList();

            result.PhuongXas = model.Where(a => a.CapHanhChinh == CapHanhChinh.PhuongXa)
                .Select(a => new LookupItemPhanCapVo()
                {
                    KeyId = a.Id,
                    DisplayName = a.TenDonViHanhChinh,
                    NhomChaId = a.TrucThuocDonViHanhChinhId
                }).ToList();

            result.KhomAps = model.Where(a => a.CapHanhChinh == CapHanhChinh.KhomAp)
                .Select(a => new LookupItemPhanCapVo()
                {
                    KeyId = a.Id,
                    DisplayName = a.TenDonViHanhChinh,
                    NhomChaId = a.TrucThuocDonViHanhChinhId
                }).ToList();

            return result;
        }

        #region gid Ds
        public async Task<GridDataSource> GetDataForGridAsync(DonViHanhChinhQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);
            var query = BaseRepository.TableNoTracking;

            query = query.Where(a => a.TrucThuocDonViHanhChinhId == queryInfo.TrucThuocDonViHanhChinhId);
            switch (queryInfo.CapHanhChinhId)
            {
                case CapHanhChinh.TinhThanhPho:
                    if (queryInfo.TinhThanhId != null)
                    {
                        query = query.Where(x => queryInfo.TinhThanhId == null || queryInfo.TinhThanhId == 0 || x.CapHanhChinh == CapHanhChinh.TinhThanhPho && x.Id == queryInfo.TinhThanhId);
                    }
                    break;
                case CapHanhChinh.QuanHuyen:
                    if (queryInfo.TinhThanhId != null || queryInfo.QuanHuyenId != null)
                    {
                        query = query.Where(x => queryInfo.QuanHuyenId == null || queryInfo.QuanHuyenId == 0 || x.CapHanhChinh == CapHanhChinh.QuanHuyen && x.Id == queryInfo.QuanHuyenId);
                    }
                    break;
                case CapHanhChinh.PhuongXa:
                    if (queryInfo.TinhThanhId != null || queryInfo.QuanHuyenId != null || queryInfo.PhuongXaId != null)
                    {
                        query = query.Where(x => queryInfo.PhuongXaId == null || queryInfo.PhuongXaId == 0 || x.CapHanhChinh == CapHanhChinh.PhuongXa && x.Id == queryInfo.PhuongXaId);
                    }
                    break;
                case CapHanhChinh.KhomAp:
                    if (queryInfo.TinhThanhId != null || queryInfo.QuanHuyenId != null || queryInfo.PhuongXaId != null || queryInfo.KhomApId != null)
                    {
                        query = query.Where(x => queryInfo.KhomApId == null || queryInfo.KhomApId == 0 || x.CapHanhChinh == CapHanhChinh.KhomAp && x.Id == queryInfo.KhomApId);
                    }
                    break;
            }
            var gridVo = query
                .Select(s => new DonViHanhChinhGridVo
                {
                    Id = s.Id,
                    Ma = s.Ma,
                    Ten = s.Ten,
                    TenVietTat = s.TenVietTat,
                    CapHanhChinhId = s.CapHanhChinh,
                    TrucThuocDonViHanhChinhId = s.TrucThuocDonViHanhChinhId,
                    TrucThuocDonViHanhChinh = s.TrucThuocDonViHanhChinh != null ? s.TrucThuocDonViHanhChinh.Ten : null
                })
                .ApplyLike(queryInfo.Ma, g => g.Ma).ApplyLike(queryInfo.Ten, g => g.Ten).ApplyLike(queryInfo.TenVietTat, g => g.TenVietTat);

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }
        #endregion
    }
}
