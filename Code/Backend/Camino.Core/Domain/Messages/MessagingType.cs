namespace Camino.Core.Domain.Messages
{
    public enum MessagingType
    {
        Task = 1,
        Notification = 2,
        SMS = 3,
        Email = 4
    }
    public enum CloudMessagingType
    {
        Chat = 1,
        Notification = 2,
        NewRequest = 3
    }
    public enum MessagePriority
    {
        Normal = 1,
        High = 2
    }
}
