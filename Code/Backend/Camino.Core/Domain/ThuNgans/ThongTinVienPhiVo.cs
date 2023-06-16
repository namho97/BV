namespace Camino.Core.Domain.ThuNgans
{
    public class ThongTinVienPhiVo
    {
        public long YeuCauTiepNhanId { get; set; }
        public decimal TongCong { get; set; }
        public decimal TongDaThu { get; set; }
        public decimal TongChuaThu => TongCong - TongDaThu;
    }
}
