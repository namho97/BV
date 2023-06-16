using Camino.Core;
using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain.Messages;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Data;
using Camino.Services.Messages;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens
{
    [ScopedDependency(ServiceType = typeof(IUserMessagingTokenService))]
    public class UserMessagingTokenService : MasterFileService<UserMessagingToken>, IUserMessagingTokenService
    {
        private readonly ICloudMessagingHandler _cloudMessagingHandler;

        public UserMessagingTokenService(IRepository<UserMessagingToken> repository, ICloudMessagingHandler cloudMessagingHandler) :
            base(repository)
        {
            _cloudMessagingHandler = cloudMessagingHandler;
        }

        public async Task SetupUserMessagingTokenAsync(long userId, string messagingToken, DeviceType deviceType)
        {
            var userMessagingToken = BaseRepository.Table.Include(o => o.UserMessagingTokenSubscribes).FirstOrDefault(o => o.UserId == userId && o.MessagingToken == messagingToken);
            if (userMessagingToken != null)
            {
                //var messagingUserGroups = _messagingUserGroupRepository.TableNoTracking.Where(g => g.UserMessagingUserGroups.Any(ug => ug.UserId == userId)).ToList();
                //foreach (var messagingUserGroup in messagingUserGroups)
                //{
                //    if (userMessagingToken.UserMessagingTokenSubscribes.Any(o => o.Topic == messagingUserGroup.Topic))
                //        continue;

                //    var userMessagingTokenSubscribe = new UserMessagingTokenSubscribe { Topic = messagingUserGroup.Topic };
                //    userMessagingTokenSubscribe.IsSubscribed = await _cloudMessagingHandler.SubscribeToTopicAsync(userMessagingTokenSubscribe.Topic, userMessagingToken.MessagingToken);
                //    userMessagingToken.UserMessagingTokenSubscribes.Add(userMessagingTokenSubscribe);
                //}

                userMessagingToken.LastAccess = DateTime.Now;
                BaseRepository.Update(userMessagingToken);
            }
            else
            {
                var newUserMessagingToken = new UserMessagingToken
                {
                    UserId = userId,
                    MessagingToken = messagingToken,
                    DeviceType = deviceType,
                    LastAccess = DateTime.Now
                };
                newUserMessagingToken.UserMessagingTokenSubscribes.Add(new UserMessagingTokenSubscribe { Topic = CaminoConstants.UserTopicPrefix + userId });


                foreach (var userMessagingTokenSubscribe in newUserMessagingToken.UserMessagingTokenSubscribes)
                {
                    //Subscribe topic
                    var isSubscribed = await _cloudMessagingHandler.SubscribeToTopicAsync(userMessagingTokenSubscribe.Topic, messagingToken);
                    userMessagingTokenSubscribe.IsSubscribed = isSubscribed;
                }
                BaseRepository.Add(newUserMessagingToken);
            }
        }
    }
}
