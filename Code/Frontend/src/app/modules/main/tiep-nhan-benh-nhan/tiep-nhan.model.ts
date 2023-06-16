export class TiepNhanViewModel {
    Id: number = 0;
    ThongTinHanhChinh:ThongTinHanhChinhViewModel={
        MaNguoiBenh:"",
        HoTen: "",
        NgaySinh: 0,
        ThangSinh: 0,
        NamSinh: 0,
        GioiTinh: 0,
        SoDienThoai: "",
        Email: "",
        TinhThanhId: 0,
        QuanHuyenId: 0,
        PhuongXaId: 0,
        KhomApId: 0,
        SoNha: "",
        NgheNghiep: "",
        SoChungMinhNhanDan: "",
        QuocTich: 0,
        DanToc: 0,
        NoiLamViec: ""
    };
    ThongTinNguoiGiamHo:ThongTinNguoiGiamHoViewModel={
        CoNguoiGiamHo:false,
        HoTen: "",
        QuanHe: 0,
        SoDienThoai: "",
        Email: "",
        TinhThanhId: 0,
        QuanHuyenId: 0,
        PhuongXaId: 0,
        KhomApId: 0,
        SoNha: ""
    };
    ThongTinBHYT:ThongTinBHYTViewModel={
        CoBaoHiemYTe:false,
        NhapTay: false,
        SoTheBHYT: "",
        MaNoiDKBH: "",
        NoiDKBH: "",
        MucHuong: 0,
        DiaChi: "",
        NgayCoHieuLuc: null,
        NgayHetHieuLuc: null,
        NgayDu5Nam: null
    };
    ThongTinTiepNhan:ThongTinTiepNhanViewModel={
        TiepNhanLuc: new Date(),
        DoiTuong: 0,
        HinhThucDen: 0,
        LyDoKhamBenh: "",
        ChiDinhDichVus: [],
        TaiLieuDinhKems: []
    };

}
export class ThongTinHanhChinhViewModel{
    MaNguoiBenh:string=null;
    HoTen: string = null;
    NgaySinh: number = null;
    ThangSinh: number = null;
    NamSinh: number = null;
    GioiTinh: number = 1;
    SoDienThoai: string = null;
    Email: string = null;
    TinhThanhId: number = null;
    QuanHuyenId: number = null;
    PhuongXaId: number = null;
    KhomApId: number = null;
    SoNha: string = null;
    NgheNghiep: string = null;
    SoChungMinhNhanDan: string = null;
    QuocTich: number = 1;
    DanToc:number=1;
    NoiLamViec: string = null;
}
export class ThongTinNguoiGiamHoViewModel{
    CoNguoiGiamHo:boolean=false;
    HoTen: string = null;
    QuanHe: number = null;
    SoDienThoai: string = null;
    Email: string = null;
    TinhThanhId: number = null;
    QuanHuyenId: number = null;
    PhuongXaId: number = null;
    KhomApId: number = null;
    SoNha: string = null;
}
export class ThongTinBHYTViewModel{
    CoBaoHiemYTe:boolean=false;
    NhapTay:boolean=false;
    SoTheBHYT: string = null;
    MaNoiDKBH: string = null;
    NoiDKBH: string = null;
    MucHuong: number = null;
    DiaChi: string = null;
    NgayCoHieuLuc: Date = null;
    NgayHetHieuLuc: Date = null;
    NgayDu5Nam: Date = null;
}
export class ThongTinTiepNhanViewModel{
    TiepNhanLuc: Date = new Date();
    DoiTuong:number=null;
    HinhThucDen: number = null;
    LyDoKhamBenh: string = null;
    ChiDinhDichVus:ChiDinhDichVuViewModel[]=[];
    TaiLieuDinhKems:TaiLieuDinhKemViewModel[]=[];
}
export class ChiDinhDichVuViewModel{
    DichVu: number = null;
    SoLuong:number=null;
    DonGia: number = null;
    ThanhTien: number = null;
    NoiThucHien:number=null;
}
export class TaiLieuDinhKemViewModel{
    Loai: number = null;
    TaiLieu:any=null;
    MoTa: string = null;
}