using AutoMapper;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.DichVuKyThuats;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuatGias;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats;

namespace Camino.Api.Models.MappingProfile
{
    public class DichVuKyThuatMappingProfile : Profile
    {
        public DichVuKyThuatMappingProfile()
        {
            CreateMap<DichVuKyThuat, DichVuKyThuatViewModel>();
            CreateMap<DichVuKyThuatViewModel, DichVuKyThuat>()
                .ForMember(x => x.DichVuKyThuatGias, o => o.Ignore())
                .AfterMap((source, destination) =>
                {
                    AddOrUpdateDuocPhamGia(source, destination);
                });

            CreateMap<DichVuKyThuatGia, DichVuKyThuatGiaViewModel>();
            CreateMap<DichVuKyThuatGiaViewModel, DichVuKyThuatGia>();
        }
        private void AddOrUpdateDuocPhamGia(DichVuKyThuatViewModel source, DichVuKyThuat destination)
        {
            foreach (var model in source.DichVuKyThuatGias)
            {
                if (model.Id == 0)
                {
                    var newEntity = new DichVuKyThuatGia();
                    destination.DichVuKyThuatGias.Add(model.ToEntity(newEntity));
                }
                else
                {
                    var result = destination.DichVuKyThuatGias.Single(c =>
                        c.Id == model.Id);
                    result = model.ToEntity(result);
                }
            }

            foreach (var model in destination.DichVuKyThuatGias)
            {
                if (model.Id != 0)
                {
                    var countModel = source.DichVuKyThuatGias.Where(x =>
                        x.Id == model.Id).ToList();

                    if (countModel.Count == 0)
                    {
                        model.WillDelete = true;
                    }
                }
            }
        }
    }
}
