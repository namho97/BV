namespace Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public class UserMessagingTokenSubscribe : BaseEntity
    {
        public long UserMessagingTokenId { get; set; }
        public string Topic { get; set; } = null!;
        public bool IsSubscribed { get; set; }

        public virtual UserMessagingToken? UserMessagingToken { get; set; }
    }
}
