using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Api.Models.QuanTri.NhomPhongKham.Icds
{
    public class IcdViewModel : BaseViewModel
    {
        public string? Ma { get; set; }
        public string? TenTiengViet { get; set; }
        public string? TenTiengAnh { get; set; }

        public int? GioiTinhInt { get; set; }

        public int? ManTinhInt { get; set; }
        public int? BenhThuongGapInt { get; set; }
        public int? BenhNamInt { get; set; }
        public int? KhongBaoHiemInt { get; set; }
        public int? NgoaiDinhSuatInt { get; set; }
        public int? HieuLucInt { get; set; }

        public LoaiGioiTinh? GioiTinh => GioiTinhInt != null && GioiTinhInt == 1 ? LoaiGioiTinh.GioiTinhNam :
            GioiTinhInt != null && GioiTinhInt == 2 ? LoaiGioiTinh.GioiTinhNu : GioiTinhInt != null && GioiTinhInt == 3 ? LoaiGioiTinh.ChuaXacDinh : null;

        public bool? ManTinh => ManTinhInt != null && ManTinhInt == 1 ? true : ManTinhInt != null && ManTinhInt == 2 ? false : null;
        public bool? BenhThuongGap => BenhThuongGapInt != null && BenhThuongGapInt == 1 ? true : BenhThuongGapInt != null && BenhThuongGapInt == 2 ? false : null;
        public bool? BenhNam => BenhNamInt != null && BenhNamInt == 1 ? true : BenhNamInt != null && BenhNamInt == 2 ? false : null;
        public bool? KhongBaoHiem => KhongBaoHiemInt != null && KhongBaoHiemInt == 1 ? true : KhongBaoHiemInt != null && KhongBaoHiemInt == 2 ? false : null;
        public bool? NgoaiDinhSuat => NgoaiDinhSuatInt != null && NgoaiDinhSuatInt == 1 ? true : NgoaiDinhSuatInt != null && NgoaiDinhSuatInt == 2 ? false : null;

        public string? MoTa { get; set; }
        public string? NoiDungChanDoan { get; set; }
        public bool HieuLuc => HieuLucInt != null && HieuLucInt == 1 ? true : false;
    }
    public class IcdGetViewModel : BaseViewModel
    {
        public string? Ma { get; set; }
        public string? TenTiengViet { get; set; }
        public string? TenTiengAnh { get; set; }



        public LoaiGioiTinh? GioiTinh { get; set; }

        public bool? ManTinh { get; set; }
        public bool? BenhThuongGap { get; set; }
        public bool? BenhNam { get; set; }
        public bool? KhongBaoHiem { get; set; }
        public bool? NgoaiDinhSuat { get; set; }

        public string? MoTa { get; set; }
        public string? NoiDungChanDoan { get; set; }
        public bool HieuLuc { get; set; }


        public int? GioiTinhInt => GioiTinh != null && GioiTinh.GetValueOrDefault() == LoaiGioiTinh.GioiTinhNam ? 1 :
                                   GioiTinh != null && GioiTinh.GetValueOrDefault() == LoaiGioiTinh.GioiTinhNu ? 2 :
                                   GioiTinh != null && GioiTinh.GetValueOrDefault() == LoaiGioiTinh.ChuaXacDinh ? 3 : null;
        public int? ManTinhInt => ManTinh != null && ManTinh == true ? 1 :
                                  ManTinh != null && ManTinh == false ? 2 : null;
        public int? BenhThuongGapInt => BenhThuongGap != null && BenhThuongGap == true ? 1 :
                                        BenhThuongGap != null && BenhThuongGap == false ? 2 : null;
        public int? BenhNamInt => BenhNam != null && BenhNam == true ? 1 :
                                        BenhNam != null && BenhNam == false ? 2 : null;

        public int? KhongBaoHiemInt => KhongBaoHiem != null && KhongBaoHiem == true ? 1 :
                                        KhongBaoHiem != null && KhongBaoHiem == false ? 2 : null;
        public int? NgoaiDinhSuatInt => NgoaiDinhSuat != null && NgoaiDinhSuat == true ? 1 :
                                        NgoaiDinhSuat != null && NgoaiDinhSuat == false ? 2 : null;
        public int? HieuLucInt => HieuLuc == true ? 1 :
                                   HieuLuc == false ? 2 : null;
    }
}
