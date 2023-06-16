using Camino.Core.Domain;
using Camino.Core.Domain.CauHinhs;

namespace Camino.Services.QuanTris.NhomCauHinhs
{
    public interface ICauHinhService : IMasterFileService<CauHinh>
    {
        GridDataSource GetDataForGridAsync(CauHinhQueryInfo queryInfo);
        CauHinh GetSetting(string key);
        T GetSettingByKey<T>(string key, T defaultValue = default);
        T LoadSetting<T>() where T : ISettings, new();
        ISettings LoadSetting(Type type);
        void SaveSetting<T>(T settings) where T : ISettings, new();
        void SetSetting<T>(string key, T value);

        //List<LookupItemVo> getListLoaiCauHinh();
        //Task<bool> IsNameExists(string name, long id = 0);
        //Task<bool> IsValueExists(string value, long id = 0);
        //Task<decimal> SoTienBHYTSeThanhToanToanBo();
        //Task<List<double>> GetTyLeHuongBaoHiem5LanKhamDichVuBHYT();

        //Task<bool> IsTenCauHinhExists(string tenCauHinh = null, long cauHinhId = 0, int loaiCauHinh = 0);
        //List<int> GetTiLeHuongBaoHiemDichVuPTTT();
        //CauHinh GetByName(string name);

        List<LookupItemVo> getListLoaiCauHinh();
    }
}
