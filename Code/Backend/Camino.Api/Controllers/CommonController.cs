using Camino.Api.Models.General;
using Camino.Core.Configuration;
using Camino.Core.Domain;
using Camino.Core.Domain.Messages;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;
using Camino.Services.Helpers;
using Camino.Services.Messages;
using Camino.Services.QuanTris.NhomCauHinhs;
using Camino.Services.QuanTris.NhomHanhChinhs;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static Camino.Core.Domain.Common.CommonEnum;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Api.Controllers
{
    public class CommonController : CaminoBaseController
    {
        readonly ResourcePathConfig _resourcePathConfig;
        readonly IDonViHanhChinhService _donViHanhChinhService;
        readonly ICloudMessagingHandler _cloudMessagingHandler;
        private readonly ICauHinhService _cauHinhService;
        private readonly IUserAgentHelper _userAgentHelper;
        public CommonController(
            ICloudMessagingHandler cloudMessagingHandler,
            IDonViHanhChinhService donViHanhChinhService, ResourcePathConfig resourcePathConfig,
            ICauHinhService cauHinhService, IUserAgentHelper userAgentHelper)
        {
            _cloudMessagingHandler = cloudMessagingHandler;
            _donViHanhChinhService = donViHanhChinhService;
            _cauHinhService = cauHinhService;
            _userAgentHelper = userAgentHelper;
            _resourcePathConfig = resourcePathConfig;
        }

        [HttpPost("SubscribeToTopicAsync")]
        public async Task<ActionResult> SubscribeToTopicAsync(string token)
        {
            var r = await _cloudMessagingHandler.SubscribeToTopicAsync("test", token);
            return Ok(r);
        }

        [HttpPost("SendToTopicAsync")]
        public async Task<ActionResult> SendToTopicAsync(string topic)
        {
            var r = await _cloudMessagingHandler.SendToTopicAsync(topic, MessagingType.Notification, "Title", $"{DateTime.Now.ToString()}", JsonConvert.SerializeObject(new Dictionary<string, string> { { "a", "1" } }));
            return Ok(r);
        }

        [HttpGet("IsConnected")]
        public ActionResult IsConnected()
        {
            return Ok();
        }

        [HttpGet("get_device_udid")]
        public ActionResult get_device_udid()
        {
            Response.ContentType = "text/html; charset=utf-8";
            Response.Headers.Add("x-frame-options", "SAMEORIGIN");
            return Ok(new OkObjectResult(null));
        }

        [HttpPost("GetGioiTinhLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetGioiTinhLookup()
        {
            var datas = Enum.GetValues(typeof(LoaiGioiTinh)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o),
            });
            return Ok(models);
        }
        [HttpPost("GetTrangThaiSuDungLookup")]
        public ActionResult<ICollection<LookupItemTrangThaiSuDungVo>> GetTrangThaiSuDungLookup()
        {
            var datas = Enum.GetValues(typeof(TrangThaiSuDungEnum)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemTrangThaiSuDungVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o)
            });
            return Ok(models);
        }
        [HttpPost("GetTinhTrangKhamLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetTinhTrangKhamLookup()
        {
            var datas = Enum.GetValues(typeof(TrangThaiDichVuKhamEnum)).Cast<Enum>();
            var models = datas
                .Where(o => o is (Enum)TrangThaiDichVuKhamEnum.DoiKham or (Enum)TrangThaiDichVuKhamEnum.DangKham)
                .Select(o => new LookupItemVo
                {
                    DisplayName = o.GetDescription(),
                    KeyId = Convert.ToInt32(o),
                });
            return Ok(models);
        }
        [HttpPost("GetTinhTrangLichSuKhamLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetTinhTrangLichSuKhamLookup()
        {
            var datas = Enum.GetValues(typeof(TrangThaiDichVuKhamEnum)).Cast<Enum>();
            var models = datas.Where(o => o is (Enum)TrangThaiDichVuKhamEnum.DaKham or (Enum)TrangThaiDichVuKhamEnum.HuyKham)
                .Select(o => new LookupItemVo
                {
                    DisplayName = o.GetDescription(),
                    KeyId = Convert.ToInt32(o),
                });
            return Ok(models);
        }

        [HttpPost("GetTrangThaiYeuCauTiepNhanLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetTrangThaiYeuCauTiepNhanLookup()
        {
            var datas = Enum.GetValues(typeof(TrangThaiYeuCauTiepNhanEnum)).Cast<Enum>();
            var models = datas                
                .Select(o => new LookupItemVo
                {
                    DisplayName = o.GetDescription(),
                    KeyId = Convert.ToInt32(o),
                });
            return Ok(models);
        }
        [HttpPost("GetTrangThaiDangKyKhamLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetTrangThaiDangKyKhamLookup()
        {
            var datas = Enum.GetValues(typeof(TrangThaiYeuCauTiepNhanEnum)).Cast<Enum>();
            var models = datas
                .Where(o => o is (Enum)TrangThaiYeuCauTiepNhanEnum.ChuaDen or (Enum)TrangThaiYeuCauTiepNhanEnum.ChuaThucHien or (Enum)TrangThaiYeuCauTiepNhanEnum.DangThucHien)
                .Select(o => new LookupItemVo
                {
                    DisplayName = o.GetDescription(),
                    KeyId = Convert.ToInt32(o),
                });
            return Ok(models);
        }
        [HttpPost("GetTrangThaiLichSuYeuCauTiepNhanLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetTrangThaiLichSuYeuCauTiepNhanLookup()
        {
            var datas = Enum.GetValues(typeof(TrangThaiYeuCauTiepNhanEnum)).Cast<Enum>();
            var models = datas
                .Where(o => o is (Enum)TrangThaiYeuCauTiepNhanEnum.HuyThucHien or (Enum)TrangThaiYeuCauTiepNhanEnum.DaThucHien)
                .Select(o => new LookupItemVo
                {
                    DisplayName = o.GetDescription(),
                    KeyId = Convert.ToInt32(o),
                });
            return Ok(models);
        }
        [HttpPost("GetHinhThucHenLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetHinhThucHenLookup()
        {
            var datas = Enum.GetValues(typeof(HinhThucHenEnum)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o),
            });
            return Ok(models);
        }
        [HttpPost("GetHinhThucThanhToanLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetHinhThucThanhToanLookup()
        {
            var datas = Enum.GetValues(typeof(HinhThucThanhToanEnum)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o),
            });
            return Ok(models);
        }
        [HttpPost("GetTrangThaiThanhToanLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetTrangThaiThanhToanLookup()
        {
            var datas = Enum.GetValues(typeof(TrangThaiThanhToanEnum)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o),
            });
            return Ok(models);
        }

        [HttpPost("GetLoaiNhomDichVuLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetLoaiNhomDichVuLookup()
        {
            var datas = Enum.GetValues(typeof(LoaiNhomDichVuEnum)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o),
            });
            return Ok(models);
        }


        [HttpPut("SaveFileUpload")]
        //[ClaimRequirement(SecurityOperation.View, DocumentType.None)]
        public async Task<ActionResult> SaveFileUpload([FromForm] IFormFile file)
        {
            var arr = file.FileName.Split(".");
            var serverFilename = Guid.NewGuid().ToString() + (arr != null && arr.Length > 1 ? "." + arr[arr.Length - 1] : ".ukn");
            if (!Directory.Exists($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\"))
            {
                Directory.CreateDirectory($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}");
            }
            var filePath = Path.Combine($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}", serverFilename);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new
            {
                NameGUID = serverFilename,
                Name = file.FileName,
                URL = Path.Combine($"{_resourcePathConfig.FileTempFolder}", serverFilename)
            });
        }
        [HttpPost("DownloadFile")]
        //[ClaimRequirement(SecurityOperation.View, DocumentType.None)]
        public IActionResult DownloadFile([FromBody] DownloadFileViewModel downloadFileViewModel)
        {
            if (!System.IO.File.Exists($"{_resourcePathConfig.SiteFolder}{downloadFileViewModel.Url}"))
            {
                return NotFound(); // returns a NotFoundResult with Status404NotFound response.
            }
            Stream stream = System.IO.File.OpenRead($"{_resourcePathConfig.SiteFolder}{downloadFileViewModel.Url}");

            if (stream == null)
                return NotFound(); // returns a NotFoundResult with Status404NotFound response.

            return File(stream, "application/octet-stream"); // returns a FileStreamResult
        }

        [HttpGet("ChuyenTienTuSoSangChu")]
        public ActionResult ChuyenTienTuSoSangChu(decimal soTien)
        {
            return Ok(NumberHelper.ChuyenSoRaText(soTien));
        }

        [HttpPost("GetLookupGioiTinh")]
        public ActionResult<ICollection<LookupItemVo>> GetLookupGioiTinh()
        {
            var datas = Enum.GetValues(typeof(LoaiGioiTinh)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o),
            });
            return Ok(models);
        }
    }
}
