using Camino.Core.Domain.Common;

namespace Camino.Core.Domain
{
    public class LookupItemVo
    {
        public long KeyId { get; set; }

        public string DisplayName { get; set; }
        public string Description { get; set; }
    }
    public class LookupItemTextVo
    {
        public string KeyId { get; set; }
        public string DisplayName { get; set; }
    }

    public class LookupItemPhanCapVo
    {
        public long KeyId { get; set; }
        public string DisplayName { get; set; }
        public int CapNhom { get; set; }
        public long? NhomChaId { get; set; }

    }

    public class LookupItemTrangThaiSuDungVo : LookupItemVo
    {
        public string Class => KeyId == (int)CommonEnum.TrangThaiSuDungEnum.DangSuDung ? "green" : "red";
    }

    public class LookupItemCauHinhVo
    {
        public string KeyId { get; set; }
        public string DisplayName { get; set; }
        public string Value { get; set; }
        public int DataType { get; set; }
        public string GhiChu { get; set; }
    }

}
