
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuongDungs;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhomThuocs;

namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs
{
    public class ThuocHoacHoatChat : BaseEntity
    {
        public int? STTHoatChat { get; set; }

        public int? STTThuoc { get; set; }

        public string? Ma { get; set; }

        public string? MaATC { get; set; }

        public string Ten { get; set; } = "";

        public long? DuongDungId { get; set; }

        public bool? HoiChan { get; set; }

        public long TyLeBaoHiemThanhToan { get; set; }

        public bool? CoDieuKienThanhToan { get; set; }

        public string? MoTa { get; set; } // cái này là mô tả của trường có điều kiện thanh toán

        public int? NhomChiPhi { get; set; } // cái này tạm thời chưa cần sử dụng

        public bool? BenhVienHang1 { get; set; }

        public bool? BenhVienHang2 { get; set; }

        public bool? BenhVienHang3 { get; set; }

        public bool? BenhVienHang4 { get; set; }

        public long NhomthuocId { get; set; }

        public virtual NhomThuoc? NhomThuoc { get; set; }

        public virtual DuongDung? DuongDung { get; set; }

        private ICollection<TuongTacThuoc>? _tuongTacThuoc1s;
        public virtual ICollection<TuongTacThuoc> TuongTacThuoc1s
        {
            get => _tuongTacThuoc1s ?? (_tuongTacThuoc1s = new List<TuongTacThuoc>());
            protected set => _tuongTacThuoc1s = value;
        }
        private ICollection<TuongTacThuoc>? _tuongTacThuoc2s;
        public virtual ICollection<TuongTacThuoc> TuongTacThuoc2s
        {
            get => _tuongTacThuoc2s ?? (_tuongTacThuoc2s = new List<TuongTacThuoc>());
            protected set => _tuongTacThuoc2s = value;
        }
    }
}
