using Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds;

namespace Camino.Services.Exports
{
    public interface IExcelService : IMasterFileService<Icd>
    {
        byte[] ExportManagermentView<T>(List<T> lstModel, List<(string, string)> valueObject, string titleName, int indexStartChildGrid, string labelName = null, bool isAutomaticallyIncreasesSTT = false);
    }
}
