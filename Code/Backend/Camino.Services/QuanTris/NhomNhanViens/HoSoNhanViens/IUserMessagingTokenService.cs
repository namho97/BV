using Camino.Core.Domain.Messages;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public interface IUserMessagingTokenService : IMasterFileService<UserMessagingToken>
    {
        Task SetupUserMessagingTokenAsync(long userId, string messagingToken, DeviceType deviceType);
    }
}
