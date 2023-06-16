﻿using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.Messages;
using Camino.Core.Helpers;
using Camino.Data;

namespace Camino.Services.Messages
{
    [ScopedDependency(ServiceType = typeof(ISmsService))]
    public class SmsService : ISmsService
    {
        private readonly IRepository<MessagingTemplate> _messagingTemplateRepository;
        private readonly IRepository<QueuedSms> _queuedSmsRepository;
        private readonly IRepository<LichSuSMS> _lichSuSmsRepository;
        private readonly ISmsSender _smsSender;

        public SmsService(IRepository<MessagingTemplate> messagingTemplateRepository, IRepository<QueuedSms> queuedSmsRepository,
            ISmsSender smsSender, IRepository<LichSuSMS> lichSuSmsRepository)
        {
            _messagingTemplateRepository = messagingTemplateRepository;
            _queuedSmsRepository = queuedSmsRepository;
            _lichSuSmsRepository = lichSuSmsRepository;
            _smsSender = smsSender;
        }

        public bool SendSmsTaoMatKhau(string to, string passCode)
        {
            var template = GetSmsTemplateTitle("SMSTaoMatKhau", LanguageType.VietNam);
            var data = new { PassCode = passCode };
            return SendSms(template, data, to);
        }

        public void SendSmsTaoNhanVien(string to)
        {
            var template = GetSmsTemplateTitle("SMSTaoNhanVien", LanguageType.VietNam);
            AddQueuedSms(template, null, to);
        }

        private MessagingTemplate GetSmsTemplateTitle(string ten, LanguageType ngonngu)
        {
            return _messagingTemplateRepository.TableNoTracking.FirstOrDefault(o => o.Name == ten && o.Language == ngonngu && o.MessagingType == MessagingType.SMS);
        }

        private long AddQueuedSms(MessagingTemplate template, object data, string to, DateTime? dontSendBeforeDate = null)
        {
            if (template == null || template.IsDisabled == true)
                return 0;

            var body = template.Body;
            var bodyReplaced = TemplateHelpper.FormatTemplateWithContentTemplate(body, data);

            var sms = new QueuedSms
            {
                To = to,
                Body = bodyReplaced,
                DontSendBeforeDate = dontSendBeforeDate
            };
            _queuedSmsRepository.Add(sms);
            return sms.Id;
        }

        private bool SendSms(MessagingTemplate template, object data, string to)
        {
            if (template == null || template.IsDisabled == true)
                return true;
            var body = template.Body;
            var bodyReplaced = TemplateHelpper.FormatTemplateWithContentTemplate(body, data);
            var sendSmsSuccess = _smsSender.SendSms(to, bodyReplaced);
            _lichSuSmsRepository.Add(new LichSuSMS
            {
                GoiDen = to,
                NgayGui = DateTime.Now,
                NoiDung = bodyReplaced,
                TrangThai = sendSmsSuccess ? LoaiTrangThaiLichSu.ThanhCong : LoaiTrangThaiLichSu.ThatBai
            });
            return sendSmsSuccess;
        }
    }
}
