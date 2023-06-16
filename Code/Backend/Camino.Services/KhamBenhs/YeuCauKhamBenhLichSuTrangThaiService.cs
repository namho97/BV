using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Data;

namespace Camino.Services.KhamBenhs
{
    [ScopedDependency(ServiceType = typeof(IYeuCauKhamBenhLichSuTrangThaiService))]
    public class YeuCauKhamBenhLichSuTrangThaiService : MasterFileService<YeuCauKhamBenhLichSuTrangThai>, IYeuCauKhamBenhLichSuTrangThaiService
    {
        public YeuCauKhamBenhLichSuTrangThaiService(IRepository<YeuCauKhamBenhLichSuTrangThai> repository) : base(repository)
        {
        }

    }
}
