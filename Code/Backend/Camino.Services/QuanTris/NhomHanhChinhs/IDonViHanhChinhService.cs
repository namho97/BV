using Camino.Core.Domain;
using Camino.Core.Domain.Common;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs;

namespace Camino.Services.QuanTris.NhomHanhChinhs
{
    public interface IDonViHanhChinhService : IMasterFileService<DonViHanhChinh>
    {
        Task<List<LookupItemVo>> GetTinhThanhLookup(DonViHanhChinhLookupQueryInfo model);
        Task<List<LookupItemVo>> GetQuanHuyenLookup(DonViHanhChinhLookupQueryInfo model, long tinhThanhId);
        Task<List<LookupItemVo>> GetPhuongXaLookup(DonViHanhChinhLookupQueryInfo model, long quanHuyenId, long? tinhThanhId = null);
        Task<List<LookupItemVo>> GetKhomApLookup(DonViHanhChinhLookupQueryInfo model, long khomApId, long? quanHuyenId, long? tinhThanhId = null);
        Task<DonViHanhChinhLookupVo> GetDonViHanhChinhLookupAsync();
        string GetFullAddressById(string soNha, long? khomApId, long? phuongXaId, long? quanHuyenId, long? tinhThanhId);
        AddressCode GetAddressCode(string tinhThanh, string quanHuyen, string phuongXa, string khomAp);
        bool CheckExistMaCapTinhThanhPho(string ma, long donViId = 0);
        bool CheckExistMaCapQuanHuyen(long trucThuocDonViHanhChinhId, string ma, long donViId = 0);
        bool CheckExistMaCapPhuongXa(long trucThuocDonViHanhChinhId, string ma, long donViId = 0);
        bool CheckExistMaCapKhomAp(long trucThuocDonViHanhChinhId, string ma, long donViId = 0);

        #region grid Ds
        Task<GridDataSource> GetDataForGridAsync(DonViHanhChinhQueryInfo queryInfo);
        #endregion

    }
}
