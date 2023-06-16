using Camino.Core.Domain;
using Camino.Core.Domain.Messages;

namespace Camino.Services.Messages
{
    public interface IMessagingTemplateService : IMasterFileService<MessagingTemplate>
    {
        Task<GridDataSource> GetDataForGridAsync(QueryInfo queryInfo, bool exportExcel = false);

        Task<GridDataSource> GetTotalPageForGridAsync(QueryInfo queryInfo);
    }
}
