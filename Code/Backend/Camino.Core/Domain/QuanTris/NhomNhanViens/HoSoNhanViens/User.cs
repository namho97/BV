using Camino.Core.Domain.NhatKyHoatDongs;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using System.ComponentModel.DataAnnotations.Schema;

namespace Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public class User : BaseEntity
    {
        public string? Password { get; set; }
        public string HoTen { get; set; } = null!;
        public string SoDienThoai { get; set; } = null!;
        //[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        //public string SoDienThoaiDisplay { get; set; }
        public string? Email { get; set; }
        public string? SoChungMinhThu { get; set; }
        public string? SoNha { get; set; }


        public long? PhuongXaId { get; set; }
        public long? QuanHuyenId { get; set; }
        public long? TinhThanhId { get; set; }
        public long? KhomApId { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? NgayThangNamSinh { get; set; }
        public int? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public int? NamSinh { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string? NgaySinhHienThi { get; set; }

        public LoaiGioiTinh? GioiTinh { get; set; }
        public bool? IsVerify { get; set; }
        public bool IsActive { get; set; }
        public string? PassCode { get; set; }
        public DateTime? ExpiredCodeDate { get; set; }
        public bool? IsDefault { get; set; }
        public RegionType Region { get; set; }

        public virtual NhanVien? NhanVien { get; set; }
        public virtual DonViHanhChinh? KhomAp { get; set; }
        public virtual DonViHanhChinh? PhuongXa { get; set; }
        public virtual DonViHanhChinh? QuanHuyen { get; set; }
        public virtual DonViHanhChinh? TinhThanh { get; set; }

        private ICollection<NhatKyHeThong>? _nhatKyHeThongs;
        public virtual ICollection<NhatKyHeThong> NhatKyHeThongs
        {
            get => _nhatKyHeThongs ??= new List<NhatKyHeThong>();
            protected set => _nhatKyHeThongs = value;
        }

        private ICollection<UserMessagingToken>? _userMessagingTokens;
        public virtual ICollection<UserMessagingToken> UserMessagingTokens
        {
            get => _userMessagingTokens ??= new List<UserMessagingToken>();
            protected set => _userMessagingTokens = value;
        }
    }
}
