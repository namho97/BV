using Camino.Core.Domain;

namespace Camino.Api.Models.QuanTri.NhomNhanVien.Users
{
    public class RoleFunctionViewModel : BaseViewModel
    {
        public long RoleId { get; set; }
        public SecurityOperation SecurityOperation { get; set; }
        public DocumentType DocumentType { get; set; }
        public RoleViewModel Role { get; set; }
    }
}