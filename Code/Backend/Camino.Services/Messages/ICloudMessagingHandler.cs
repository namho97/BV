using Camino.Core.Domain.Messages;

namespace Camino.Services.Messages
{
    public interface ICloudMessagingHandler
    {
        Task<bool> SubscribeToTopicAsync(string topic, params string[] registrationTokens);
        Task<bool> SendToTopicAsync(string topic, MessagingType messagingType, string title, string body, string data);
        Task<bool> SendToMultiTopicsAsync(string[] topics, MessagingType messagingType, string title, string body, string data);
    }
}
