using System.Xml.Linq;

namespace Camino.Core.Helpers
{
    public static class ResourceHelper
    {
        public static int GetSoThuTuTiepNhan()
        {
            var path = @"Resource\\SoThuTu.xml";
            XDocument data = XDocument.Load(path);
            XNamespace root = data.Root.GetDefaultNamespace();
            XElement soThuTuXML = data.Descendants(root + "TiepNhan").FirstOrDefault();
            if (soThuTuXML == null)
                return 0;
            var so = (string)soThuTuXML.Element(root + "So");
            var ngay = (string)soThuTuXML.Element(root + "Ngay");

            var newNgay = DateTime.Now.ToString("yyyyMMdd");

            var newSo = !string.IsNullOrEmpty(so) ? Convert.ToInt32(so) : 1;
            if (newNgay != ngay)
            {
                newSo = 1;
                //Cập nhập vào file
                soThuTuXML.Element("So").Value = newSo.ToString();
                soThuTuXML.Element("Ngay").Value = newNgay;
                data.Save(path);
            }
            return newSo;
        }

        public static int CreateSoThuTuTiepNhan()
        {
            var path = @"Resource\\SoThuTu.xml";
            XDocument data = XDocument.Load(path);
            XNamespace root = data.Root.GetDefaultNamespace();
            XElement soThuTuXML = data.Descendants(root + "TiepNhan").FirstOrDefault();
            if (soThuTuXML == null)
                return 0;
            var so = (string)soThuTuXML.Element(root + "So");
            var ngay = (string)soThuTuXML.Element(root + "Ngay");

            var newNgay = DateTime.Now.ToString("yyyyMMdd");

            var newSo = !string.IsNullOrEmpty(so) ? Convert.ToInt32(so) + 1 : 1;
            if (newNgay != ngay)
            {
                newSo = 1;
            }

            //Cập nhập vào file
            soThuTuXML.Element("So").Value = newSo.ToString();
            soThuTuXML.Element("Ngay").Value = newNgay;
            data.Save(path);
            return newSo;
        }
        public static string CreateMaYeuCauTiepNhan()
        {
            var path = @"Resource\\YeuCauTiepNhan.xml";
            XDocument data = XDocument.Load(path);
            XNamespace root = data.Root.GetDefaultNamespace();
            XElement yeuCauTiepNhanXML = data.Descendants(root + "YeuCauTiepNhan").FirstOrDefault();
            var maYeuCauTiepNhan = (string)yeuCauTiepNhanXML.Element(root + "MaYeuCauTiepNhan");
            var preMaYeuCauTiepNhan = (string)yeuCauTiepNhanXML.Element(root + "PreMaYeuCauTiepNhan");

            var newPreMaYeuCauTiepNhan = DateTime.Now.ToString("yyMMdd"); // cập nhật theo feedback #70

            //Tăng suffiex cũa Mã YCTN
            var newMaYeuCauTiepNhan = !string.IsNullOrEmpty(maYeuCauTiepNhan) ? Convert.ToInt32(maYeuCauTiepNhan) + 1 : 1;
            if (newPreMaYeuCauTiepNhan != preMaYeuCauTiepNhan)
            {
                newMaYeuCauTiepNhan = 1;
            }
            //Format suffiex cũa Mã YCTN luôn luôn 4 chữ số
            var maYeuCauTiepNhanFormat = newMaYeuCauTiepNhan.ToString();
            switch (newMaYeuCauTiepNhan.ToString().Length)
            {
                case 1:
                    maYeuCauTiepNhanFormat = "000" + newMaYeuCauTiepNhan;
                    break;
                case 2:
                    maYeuCauTiepNhanFormat = "00" + newMaYeuCauTiepNhan;
                    break;
                case 3:
                    maYeuCauTiepNhanFormat = "0" + newMaYeuCauTiepNhan;
                    break;
            }
            //Cập nhập vào file
            yeuCauTiepNhanXML.Element("MaYeuCauTiepNhan").Value = newMaYeuCauTiepNhan.ToString();
            yeuCauTiepNhanXML.Element("PreMaYeuCauTiepNhan").Value = newPreMaYeuCauTiepNhan;
            data.Save(path);
            return newPreMaYeuCauTiepNhan + maYeuCauTiepNhanFormat;
        }
        public static string CreateMaNguoiBenh()
        {
            var path = @"Resource\\NguoiBenh.xml";
            XDocument data = XDocument.Load(path);
            XNamespace root = data.Root.GetDefaultNamespace();
            XElement NguoiBenhXML = data.Descendants(root + "NguoiBenh").FirstOrDefault();
            var maNguoiBenh = (string)NguoiBenhXML.Element(root + "MaNguoiBenh");
            var preMaNguoiBenh = (string)NguoiBenhXML.Element(root + "PreMaNguoiBenh");

            var newPreMaNguoiBenh = DateTime.Now.ToString("yyMM"); // cập nhật theo feedback #70

            //Tăng suffiex cũa Mã Người bệnh
            var newMaNguoiBenh = !string.IsNullOrEmpty(maNguoiBenh) ? Convert.ToInt32(maNguoiBenh) + 1 : 1;
            if (newPreMaNguoiBenh != preMaNguoiBenh)
            {
                newMaNguoiBenh = 1;
            }
            //Format suffiex cũa Mã Người bệnh luôn luôn 4 chữ số
            var maNguoiBenhFormat = newMaNguoiBenh.ToString();
            switch (newMaNguoiBenh.ToString().Length)
            {
                case 1:
                    maNguoiBenhFormat = "000" + newMaNguoiBenh;
                    break;
                case 2:
                    maNguoiBenhFormat = "00" + newMaNguoiBenh;
                    break;
                case 3:
                    maNguoiBenhFormat = "0" + newMaNguoiBenh;
                    break;
            }
            //Cập nhập vào file
            NguoiBenhXML.Element("MaNguoiBenh").Value = newMaNguoiBenh.ToString();
            NguoiBenhXML.Element("PreMaNguoiBenh").Value = newPreMaNguoiBenh;
            data.Save(path);
            return newPreMaNguoiBenh + maNguoiBenhFormat;
        }
        public static string CreateSoPhieuThu()
        {
            var path = @"Resource\\PhieuThu.xml";
            XDocument data = XDocument.Load(path);
            XNamespace root = data.Root.GetDefaultNamespace();
            XElement PhieuThuXML = data.Descendants(root + "PhieuThu").FirstOrDefault();
            var maPhieuThu = (string)PhieuThuXML.Element(root + "MaPhieuThu");
            var preMaPhieuThu = (string)PhieuThuXML.Element(root + "PreMaPhieuThu");

            var newPreMaPhieuThu = DateTime.Now.ToString("yy"); // cập nhật theo feedback #70

            //Tăng suffiex cũa Mã phiếu thu
            var newMaPhieuThu = !string.IsNullOrEmpty(maPhieuThu) ? Convert.ToInt32(maPhieuThu) + 1 : 1;
            if (newPreMaPhieuThu != preMaPhieuThu)
            {
                newMaPhieuThu = 1;
            }
            //Format suffiex cũa Mã phiếu thu luôn luôn 6 chữ số
            var maPhieuThuFormat = newMaPhieuThu.ToString();
            switch (newMaPhieuThu.ToString().Length)
            {
                case 1:
                    maPhieuThuFormat = "000000" + newMaPhieuThu;
                    break;
                case 2:
                    maPhieuThuFormat = "00000" + newMaPhieuThu;
                    break;
                case 3:
                    maPhieuThuFormat = "0000" + newMaPhieuThu;
                    break;
                case 4:
                    maPhieuThuFormat = "000" + newMaPhieuThu;
                    break;
                case 5:
                    maPhieuThuFormat = "00" + newMaPhieuThu;
                    break;
                case 6:
                    maPhieuThuFormat = "0" + newMaPhieuThu;
                    break;
            }
            //Cập nhập vào file
            PhieuThuXML.Element("MaPhieuThu").Value = newMaPhieuThu.ToString();
            PhieuThuXML.Element("PreMaPhieuThu").Value = newPreMaPhieuThu;
            data.Save(path);
            return "PT" + newPreMaPhieuThu + maPhieuThuFormat;
        }
        public static string CreateSoPhieuChi()
        {
            var path = @"Resource\\PhieuChi.xml";
            XDocument data = XDocument.Load(path);
            XNamespace root = data.Root.GetDefaultNamespace();
            XElement PhieuChiXML = data.Descendants(root + "PhieuChi").FirstOrDefault();
            var maPhieuChi = (string)PhieuChiXML.Element(root + "MaPhieuChi");
            var preMaPhieuChi = (string)PhieuChiXML.Element(root + "PreMaPhieuChi");

            var newPreMaPhieuChi = DateTime.Now.ToString("yy"); // cập nhật theo feedback #70

            //Tăng suffiex cũa Mã phiếu chi
            var newMaPhieuChi = !string.IsNullOrEmpty(maPhieuChi) ? Convert.ToInt32(maPhieuChi) + 1 : 1;
            if (newPreMaPhieuChi != preMaPhieuChi)
            {
                newMaPhieuChi = 1;
            }
            //Format suffiex cũa Mã phiếu chi luôn luôn 6 chữ số
            var maPhieuChiFormat = newMaPhieuChi.ToString();
            switch (newMaPhieuChi.ToString().Length)
            {
                case 1:
                    maPhieuChiFormat = "000000" + newMaPhieuChi;
                    break;
                case 2:
                    maPhieuChiFormat = "00000" + newMaPhieuChi;
                    break;
                case 3:
                    maPhieuChiFormat = "0000" + newMaPhieuChi;
                    break;
                case 4:
                    maPhieuChiFormat = "000" + newMaPhieuChi;
                    break;
                case 5:
                    maPhieuChiFormat = "00" + newMaPhieuChi;
                    break;
                case 6:
                    maPhieuChiFormat = "0" + newMaPhieuChi;
                    break;
            }
            //Cập nhập vào file
            PhieuChiXML.Element("MaPhieuChi").Value = newMaPhieuChi.ToString();
            PhieuChiXML.Element("PreMaPhieuChi").Value = newPreMaPhieuChi;
            data.Save(path);
            return "PC" + newPreMaPhieuChi + maPhieuChiFormat;
        }


    }
}
