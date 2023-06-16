using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain.Messages;
using Camino.Data;

namespace Camino.Services.Messages
{
    [ScopedDependency(ServiceType = typeof(IQueuedEmailService))]
    public class QueuedEmailService : MasterFileService<QueuedEmail>, IQueuedEmailService
    {
        public QueuedEmailService(IRepository<QueuedEmail> repository) : base(repository)
        {
        }
    }
}