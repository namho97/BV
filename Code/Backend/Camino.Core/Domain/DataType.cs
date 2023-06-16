using System.ComponentModel;

namespace Camino.Core.Domain
{
    public enum DataType
    {
        [Description("bool")]
        Boolean = 1,
        [Description("int")]
        Integer = 2,
        [Description("string")]
        String = 3,
        [Description("double")]
        Double = 4,
        [Description("date")]
        Date = 5,
        [Description("time")]
        Time = 6,
        [Description("datetime")]
        Datetime = 7,
        [Description("phone")]
        Phone = 8,
        [Description("email")]
        Email = 9,
        [Description("list")]
        List = 10,
        [Description("image")]
        Image = 11
    }
    public enum LoaiCauHinh
    {
        [Description("Tất cả")]
        TatCa = 0,
        [Description("Cấu hình chung")]
        CauHinhChung = 1,
    }
    public enum TemplateType
    {
        [Description("Nội dung mẫu PDF")]
        NoiDungMauPDF = 1
    }
}
