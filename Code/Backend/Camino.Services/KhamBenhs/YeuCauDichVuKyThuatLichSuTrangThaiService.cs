using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats;
using Camino.Data;

namespace Camino.Services.KhamBenhs
{
    [ScopedDependency(ServiceType = typeof(IYeuCauDichVuKyThuatLichSuTrangThaiService))]
    public class YeuCauDichVuKyThuatLichSuTrangThaiService : MasterFileService<YeuCauDichVuKyThuatLichSuTrangThai>, IYeuCauDichVuKyThuatLichSuTrangThaiService
    {
        public YeuCauDichVuKyThuatLichSuTrangThaiService(IRepository<YeuCauDichVuKyThuatLichSuTrangThai> repository) : base(repository)
        {
        }

    }
}
