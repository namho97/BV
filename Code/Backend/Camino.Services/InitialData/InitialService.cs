using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Camino.Core.Helpers;
using Camino.Data;
using Microsoft.EntityFrameworkCore;

namespace Camino.Services.InitialData
{
    [ScopedDependency(ServiceType = typeof(IInitialService))]
    public class InitialService : IInitialService
    {
        private readonly IRepository<Role> _roleRepository;
        private readonly IRepository<DonViHanhChinh> _donViHanhChinhRepository;
        public InitialService(IRepository<Role> roleRepository, IRepository<DonViHanhChinh> donViHanhChinhRepository)
        {
            _roleRepository = roleRepository;
            _donViHanhChinhRepository = donViHanhChinhRepository;
        }

        public void DummyData()
        {
            DummyAdminRole();
        }
        private const string AdminRole = "Admin";
        private void DummyAdminRole()
        {
            var documentTypes = EnumHelper.GetListEnum<DocumentType>().Where(o => o != DocumentType.None).OrderBy(o => o).ToList();
            var securityOperations = EnumHelper.GetListEnum<SecurityOperation>().Where(o => o != SecurityOperation.None).OrderBy(o => o).ToList();
            var adminRole = _roleRepository.Table.Include(o => o.RoleFunctions).FirstOrDefault(p => p.Name.Contains(AdminRole));
            if (adminRole != null)
            {
                var hasChanged = false;
                foreach (var documentType in documentTypes)
                {
                    foreach (var securityOperation in securityOperations)
                    {
                        if (!adminRole.RoleFunctions.Any(o => o.DocumentType == documentType && o.SecurityOperation == securityOperation))
                        {
                            adminRole.RoleFunctions.Add(new RoleFunction
                            {
                                DocumentType = documentType,
                                SecurityOperation = securityOperation
                            });
                            hasChanged = true;
                        }
                    }
                }
                if (hasChanged)
                {
                    _roleRepository.Context.SaveChanges();
                }
            }
        }

    }
}