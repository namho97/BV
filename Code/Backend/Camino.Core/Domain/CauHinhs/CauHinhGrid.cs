using Camino.Core.Helpers;

namespace Camino.Core.Domain.CauHinhs
{
    public class CauHinhGrid : GridItem
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }
        public DataType DataType { get; set; }
        public LoaiCauHinh LoaiCauHinh { get; set; }

        public bool IsCauHinh { get; set; }

        public string TenLoaiCauHinh
        {
            get
            {
                var temp = Name.Substring(0, Name.IndexOf("."));
                var tenLoaiCauHinh = Helpers.EnumHelper
                    .GetListEnum<LoaiCauHinh>()
                    .Where(s => Enum.GetName(typeof(LoaiCauHinh), (int)s) == temp)
                    .Select(s => s.GetDescription()).FirstOrDefault();

                return tenLoaiCauHinh;
            }
        }
    }
}
