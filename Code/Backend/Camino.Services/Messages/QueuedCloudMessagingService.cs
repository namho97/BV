using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain.Messages;
using Camino.Data;

namespace Camino.Services.Messages
{
    [ScopedDependency(ServiceType = typeof(IQueuedCloudMessagingService))]
    public class QueuedCloudMessagingService : MasterFileService<QueuedCloudMessaging>, IQueuedCloudMessagingService
    {
        public QueuedCloudMessagingService(IRepository<QueuedCloudMessaging> repository) : base(repository)
        {
        }
    }
}
