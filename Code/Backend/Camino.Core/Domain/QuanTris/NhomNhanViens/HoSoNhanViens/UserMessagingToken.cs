using Camino.Core.Domain.Messages;

namespace Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public class UserMessagingToken : BaseEntity
    {
        public long UserId { get; set; }
        public string MessagingToken { get; set; } = null!;
        public DeviceType DeviceType { get; set; }
        public DateTime LastAccess { get; set; }

        public virtual User? User { get; set; }

        private ICollection<UserMessagingTokenSubscribe>? _userMessagingTokenSubscribes;
        public virtual ICollection<UserMessagingTokenSubscribe> UserMessagingTokenSubscribes
        {
            get => _userMessagingTokenSubscribes ??= new List<UserMessagingTokenSubscribe>();
            protected set => _userMessagingTokenSubscribes = value;
        }
    }
}
