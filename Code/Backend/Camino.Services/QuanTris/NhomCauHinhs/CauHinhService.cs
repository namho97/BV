using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.CauHinhs;
using Camino.Core.Helpers;
using Camino.Data;
using Camino.Data.Extensions;
using System.ComponentModel;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomCauHinhs
{
    [ScopedDependency(ServiceType = typeof(ICauHinhService))]
    public class CauHinhService : MasterFileService<CauHinh>, ICauHinhService
    {
        public CauHinhService(IRepository<CauHinh> repository) : base(repository)
        {
        }

        public GridDataSource GetDataForGridAsync(CauHinhQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(d => ((queryInfo.LoaiCauHinh == null || d.Name.Substring(0, d.Name.IndexOf(".")).ToLower() ==
                                                              queryInfo.LoaiCauHinh.GetDescription().ToLower())
                                                              ))
               .Select(p => new CauHinhGrid
               {
                   Id = p.Id,
                   Name = p.Name,
                   Description = p.Description,
                   IsCauHinh = true,
                   DataType = p.DataType

               }).ApplyLike(queryInfo.MoTa, g => g.Description);

            var countTask = gridVo.Count();
            var queryTask = gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip)
                .Take(queryInfo.Take).ToArray();

            return new GridDataSource { Data = queryTask, TotalRowCount = countTask };
        }

        private string FormatValue(DataType type, string value)
        {
            switch (type)
            {
                case DataType.Date:
                    return Convert.ToDateTime(value).ApplyFormatDate();
                case DataType.Time:
                    return Convert.ToInt32(value).ConvertIntSecondsToTime();
                case DataType.Datetime:
                    return Convert.ToDateTime(value).ApplyFormatDateTime();
                case DataType.Phone:
                    return value.ApplyFormatPhone();
            }
            return value;
        }


        #region Setting

        public CauHinh GetSetting(string key)
        {
            if (string.IsNullOrEmpty(key))
                return null;
            key = key.Trim().ToLowerInvariant();
            return BaseRepository.Table.FirstOrDefault(o => o.Name == key);
        }

        public T GetSettingByKey<T>(string key, T defaultValue = default)
        {
            if (string.IsNullOrEmpty(key))
                return defaultValue;

            key = key.Trim().ToLowerInvariant();
            var setting = BaseRepository.TableNoTracking.FirstOrDefault(o => o.Name == key);
            if (setting != null)
                return CommonHelper.To<T>(setting.Value);
            return defaultValue;
        }

        public T LoadSetting<T>() where T : ISettings, new()
        {
            return (T)LoadSetting(typeof(T));
        }

        public ISettings LoadSetting(Type type)
        {
            var settings = Activator.CreateInstance(type);

            foreach (var prop in type.GetProperties())
            {
                // get properties we can read and write to
                if (!prop.CanRead || !prop.CanWrite)
                    continue;

                var key = type.Name + "." + prop.Name;
                var setting = GetSettingByKey<string>(key);
                if (setting == null)
                    continue;

                if (!TypeDescriptor.GetConverter(prop.PropertyType).CanConvertFrom(typeof(string)))
                    continue;

                if (!TypeDescriptor.GetConverter(prop.PropertyType).IsValid(setting))
                    continue;

                var value = TypeDescriptor.GetConverter(prop.PropertyType).ConvertFromInvariantString(setting);

                //set property
                prop.SetValue(settings, value, null);
            }

            return settings as ISettings;
        }

        public void SaveSetting<T>(T settings) where T : ISettings, new()
        {
            foreach (var prop in typeof(T).GetProperties())
            {
                if (!prop.CanRead || !prop.CanWrite)
                    continue;

                if (!TypeDescriptor.GetConverter(prop.PropertyType).CanConvertFrom(typeof(string)))
                    continue;

                var key = typeof(T).Name + "." + prop.Name;
                dynamic value = prop.GetValue(settings, null);
                if (value != null)
                    SetSetting(key, value);
                else
                    SetSetting(key, "");
            }
        }

        public void SetSetting<T>(string key, T value)
        {
            if (key == null)
                throw new ArgumentNullException();
            key = key.Trim().ToLowerInvariant();
            var valueStr = TypeDescriptor.GetConverter(typeof(T)).ConvertToInvariantString(value);

            var setting = GetSetting(key);
            if (setting != null)
            {
                setting.Value = valueStr;
                Update(setting);
            }
            else
            {
                setting = new CauHinh
                {
                    Name = key,
                    Value = valueStr,
                    DataType = DataType.String
                };
                Add(setting);
            }
        }

        #endregion

        //public async Task<bool> IsNameExists(string name, long id = 0)
        //{
        //    var result = false;
        //    if (id == 0)
        //    {
        //        result = await BaseRepository.TableNoTracking.AnyAsync(p => p.Name.Equals(name));

        //    }
        //    else
        //    {
        //        result = await BaseRepository.TableNoTracking.AnyAsync(p => p.Name.Equals(name) && p.Id != id);
        //    }
        //    if (result)
        //        return false;
        //    return true;
        //}
        //public async Task<bool> IsValueExists(string value, long id = 0)
        //{
        //    var result = false;
        //    if (id == 0)
        //    {
        //        result = await BaseRepository.TableNoTracking.AnyAsync(p => p.Value.Equals(value));

        //    }
        //    else
        //    {
        //        result = await BaseRepository.TableNoTracking.AnyAsync(p => p.Value.Equals(value) && p.Id != id);
        //    }
        //    if (result)
        //        return false;
        //    return true;
        //}
        //public List<LookupItemVo> getListLoaiCauHinh()
        //{
        //    var listEnum = EnumHelper.GetListEnum<Core.Domain.LoaiCauHinh>().Select(item => new LookupItemVo()
        //    {
        //        DisplayName = item.GetDescription(),
        //        KeyId = Convert.ToInt32(item)
        //    }).ToList();
        //    return listEnum;
        //}

        //public Task<List<double>> GetTyLeHuongBaoHiem5LanKhamDichVuBHYT()
        //{
        //    var result = new List<double>();
        //    result.Add(100);
        //    result.Add(30);
        //    result.Add(30);
        //    result.Add(30);
        //    result.Add(10);
        //    return Task.FromResult(result);
        //}

        //public Task<decimal> SoTienBHYTSeThanhToanToanBo()
        //{
        //    decimal result = 223500;
        //    //decimal result = 100;
        //    return Task.FromResult(result);
        //}

        //public async Task<bool> IsTenCauHinhExists(string tenCauHinh = null, long cauHinhId = 0, int loaiCauHinh = 0)
        //{
        //    bool result = false;

        //    result = await BaseRepository.TableNoTracking.AnyAsync(p =>
        //            p.Description.Equals(tenCauHinh) && p.Id != cauHinhId);

        //    return result;
        //}

        //public List<int> GetTiLeHuongBaoHiemDichVuPTTT()
        //{
        //    return new List<int>{100,80,50};
        //}

        //public CauHinh GetByName(string name) {
        //    return BaseRepository.TableNoTracking.FirstOrDefault(o=>o.Name==name);
        //}

        //private decimal TinhGiaThuePhong(int tongSoPhut, int blockThoiGianTheoPhut, decimal giaThue, decimal giaThuePhatSinh, int phanTram = 0, int phanTramPhatSinh = 0)
        //{
        //    if (tongSoPhut <= blockThoiGianTheoPhut)
        //    {
        //        return Math.Round(giaThue + (giaThue * phanTram / 100));
        //    }
        //    else
        //    {
        //        var soPhutPhatSinh = tongSoPhut - blockThoiGianTheoPhut;
        //        return Math.Round(giaThue + (giaThue * phanTram / 100) + ((giaThuePhatSinh + (giaThuePhatSinh * phanTramPhatSinh / 100)) / 60 * soPhutPhatSinh));
        //    }
        //}

        public List<LookupItemVo> getListLoaiCauHinh()
        {
            var listEnum = EnumHelper.GetListEnum<LoaiCauHinh>().Select(item => new LookupItemVo()
            {
                DisplayName = item.GetDescription(),
                KeyId = Convert.ToInt32(item)
            }).ToList();
            return listEnum;
        }
    }
}
