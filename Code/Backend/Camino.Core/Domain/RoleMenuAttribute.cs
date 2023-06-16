using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Core.Domain
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false, Inherited = true)]
    public class RoleMenuAttribute : Attribute
    {
        public RoleMenuAttribute(int orderNumber, string[]? groupsName = null, UserType[]? userTypes = null, SecurityOperation[]? securityOperations = null)
        {
            OrderNumber = orderNumber;
            GroupsName = groupsName ?? new string[0];
            SecurityOperations = securityOperations ?? new SecurityOperation[0];
            UserTypes = userTypes ?? new UserType[0];
        }
        public int OrderNumber { get; set; }
        public string[] GroupsName { get; set; }
        public UserType[] UserTypes { get; set; }
        public SecurityOperation[] SecurityOperations { get; set; }
    }
}
