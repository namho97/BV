namespace Camino.Core.Domain.Messages
{
    public class MesagingTemplateGridVo : GridItem
    {
        public string Ten { get; set; }
        public string TieuDe { get; set; }
        public string NoiDung { get; set; }
        public int PhienBan { get; set; }
        public MessagingType LoaiTemplate { get; set; }
        public LanguageType NgonNgu { get; set; }
        public string Description { get; set; }

        public string LoaiTemplateText
        {
            get; set;
        }

        public DateTime DateUpdate { get; set; }
        public DateTime? LastTime { get; set; }
        public string DateUpdateText
        {
            get; set;
            //   get { return DateUpdate.ToString("MM/dd/yyyy"); }
        }

        public bool? HoatDong { get; set; }

    }
}
