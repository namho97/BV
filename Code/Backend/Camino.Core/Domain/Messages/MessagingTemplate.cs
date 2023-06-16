namespace Camino.Core.Domain.Messages
{
    public class MessagingTemplate : BaseEntity
    {
        public string Name { get; set; } = null!;
        public MessagingType MessagingType { get; set; }
        public string? Title { get; set; }
        public string Body { get; set; } = null!;
        public string? Link { get; set; }
        public MessagePriority MessagePriority { get; set; }
        public LanguageType Language { get; set; }
        public string? Description { get; set; }
        public bool? IsDisabled { get; set; }
    }
}
