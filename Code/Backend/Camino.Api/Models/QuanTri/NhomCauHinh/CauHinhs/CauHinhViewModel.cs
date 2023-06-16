using Camino.Core.Domain;

namespace Camino.Api.Models.QuanTri.NhomCauHinh.CauHinhs
{
    public class CauhinhViewModel : BaseViewModel
    {
        public CauhinhViewModel()
        {
            CauHinhDanhSachChiTiets = new List<CauHinhDanhSachChiTiet>();
        }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Value { get; set; }

        public int LoaiCauHinh { get; set; }

        public int DataType { get; set; }


        public LoaiCauHinh? DataTypeLoaiCauHinh
        {
            get
            {
                LoaiCauHinh? dataTypeLoaiCauHinh = null;
                if (!string.IsNullOrEmpty(Name))
                {
                    var temp = Name.Substring(0, Name.IndexOf("."));
                    dataTypeLoaiCauHinh = Core.Helpers.EnumHelper
                        .GetListEnum<LoaiCauHinh>()
                        .Where(s => Enum.GetName(typeof(LoaiCauHinh), (int)s) == temp)
                        .Select(s => s).FirstOrDefault();
                }

                return dataTypeLoaiCauHinh;
            }
        }
        public List<CauHinhDanhSachChiTiet> CauHinhDanhSachChiTiets { get; set; }
    }
    public class CauHinhDanhSachChiTiet
    {
        public long? KeyId { get; set; }
        public string DisplayName { get; set; }
        public int? DataType { get; set; }
        public string GhiChu { get; set; }
        public bool WillDelete { get; set; }
    }

}
