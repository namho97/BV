using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain.TiepNhans;
using Camino.Data;

namespace Camino.Services.KhamBenhs
{
    [ScopedDependency(ServiceType = typeof(IYeuCauTiepNhanLichSuTrangThaiService))]
    public class YeuCauTiepNhanLichSuTrangThaiService : MasterFileService<YeuCauTiepNhanLichSuTrangThai>, IYeuCauTiepNhanLichSuTrangThaiService
    {
        public YeuCauTiepNhanLichSuTrangThaiService(IRepository<YeuCauTiepNhanLichSuTrangThai> repository) : base(repository)
        {
        }

    }
}
