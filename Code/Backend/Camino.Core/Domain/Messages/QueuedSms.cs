namespace Camino.Core.Domain.Messages
{
    public class QueuedSms : BaseEntity
    {
        public string To { get; set; } = null!;

        public string? Body { get; set; }

        public DateTime? DontSendBeforeDate { get; set; }

        public int SentTries { get; set; }

        public DateTime? SentOn { get; set; }
    }
}
