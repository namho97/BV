using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.Messages;
using Camino.Core.Helpers;
using Camino.Data;
using Newtonsoft.Json;

namespace Camino.Services.Messages
{
    [ScopedDependency(ServiceType = typeof(IEmailService))]
    public class EmailService : IEmailService
    {
        private readonly IRepository<MessagingTemplate> _messagingTemplateRepository;
        private readonly IRepository<QueuedEmail> _queuedEmailRepository;
        private readonly IRepository<LichSuEmail> _lichSuEmailRepository;
        private readonly IEmailSender _emailSender;

        public EmailService(IRepository<MessagingTemplate> messagingTemplateRepository, IRepository<QueuedEmail> queuedEmailRepository,
            IEmailSender emailSender, IRepository<LichSuEmail> lichSuEmailRepository)
        {
            _messagingTemplateRepository = messagingTemplateRepository;
            _queuedEmailRepository = queuedEmailRepository;
            _lichSuEmailRepository = lichSuEmailRepository;
            _emailSender = emailSender;
        }

        public bool SendEmailTaoMatKhau(string toEmailAddress, string passCode)
        {
            var template = GetEmailTemplateTitle("EmailTaoMatKhau", LanguageType.VietNam);
            var data = new { PassCode = passCode };
            return SendEmail(template, data, data, toEmailAddress);
        }

        public bool SendEmailTaoMatKhauWithHoTen(string toEmailAddress, string passCode, string hoTen, string domain)
        {
            var template = GetEmailTemplateTitle("EmailTaoMatKhau", LanguageType.VietNam);

            var data = new
            {
                UserName = toEmailAddress,
                PassCode = passCode
            };

            var hashedUrl = HashHelper.HashString(JsonConvert.SerializeObject(data)).ToHexString();
            var encodedEmail = toEmailAddress.ToHexString();

            var templateData = new
            {
                HoTen = hoTen,
                Url = $"{domain}/tao-lai-mat-khau/{encodedEmail}/{hashedUrl}"
            };

            var storedData = new
            {
                HoTen = hoTen,
                Url = "#"
            };

            return SendEmail(template, templateData, storedData, toEmailAddress);
        }

        private MessagingTemplate GetEmailTemplateTitle(string ten, LanguageType ngonngu)
        {
            return _messagingTemplateRepository.TableNoTracking.FirstOrDefault(o => o.Name == ten && o.Language == ngonngu && o.MessagingType == MessagingType.Email);
        }

        private long AddQueuedEmail(MessagingTemplate template, object data, string toEmailAddress, List<AttachmentFileVo> attachmentFiles = null, DateTime? dontSendBeforeDate = null)
        {
            if (template == null || template.IsDisabled == true)
                return 0;

            var body = template.Body;
            var bodyReplaced = TemplateHelpper.FormatTemplateWithContentTemplate(body, data);

            var email = new QueuedEmail
            {
                To = toEmailAddress,
                Subject = template.Title,
                Body = bodyReplaced,
                DontSendBeforeDate = dontSendBeforeDate,
                AttachmentFile = attachmentFiles == null ? string.Empty : JsonConvert.SerializeObject(attachmentFiles)
            };
            _queuedEmailRepository.Add(email);
            return email.Id;
        }

        private bool SendEmail(MessagingTemplate template, object data, object storedData, string toEmailAddress, List<AttachmentFileVo> attachmentFiles = null)
        {
            if (template == null || template.IsDisabled == true)
                return true;
            var body = template.Body;
            var bodyReplaced = TemplateHelpper.FormatTemplateWithContentTemplate(body, data);
            var sendEmailSuccess = false;
            try
            {
                _emailSender.SendEmail(template.Title, bodyReplaced, toEmailAddress, attachmentFiles: attachmentFiles);
                sendEmailSuccess = true;
            }
            catch (Exception ex)
            {

                return false;
                //throw new Exception(ex.Message);
                // ignored
            }
            var storedBody = TemplateHelpper.FormatTemplateWithContentTemplate(body, storedData);
            _lichSuEmailRepository.Add(new LichSuEmail
            {
                GoiDen = toEmailAddress,
                NgayGui = DateTime.Now,
                TieuDe = template.Title,
                NoiDung = storedBody,
                TapTinDinhKem = null,
                TrangThai = sendEmailSuccess ? LoaiTrangThaiLichSu.ThanhCong : LoaiTrangThaiLichSu.ThatBai
            });
            return sendEmailSuccess;
        }
    }
}
