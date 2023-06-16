namespace Camino.Core.Domain.Messages
{
    public class BaseLichSuEntity : BaseEntity
    {
        public string GoiDen { get; set; }
        public string NoiDung { get; set; }
        public DateTime NgayGui { get; set; }
        public LoaiTrangThaiLichSu TrangThai { get; set; }
    }
}
