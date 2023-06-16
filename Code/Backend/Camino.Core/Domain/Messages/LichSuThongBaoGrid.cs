namespace Camino.Core.Domain.Messages
{
    public class LichSuThongBaoGrid : GridItem
    {
        public string GoiDen { get; set; }
        public string NoiDung { get; set; }
        public string NgayGui { get; set; }
        public string TenTrangThai { get; set; }
        public LoaiTrangThaiLichSu? TrangThai { get; set; }

        public DateTime? NgayGuiDate { get; set; }
        public DateTime? NgayGuiTu { get; set; }
        public DateTime? NgayGuiDen { get; set; }
    }
}
