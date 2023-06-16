using AutoMapper;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.DichVuKhams;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhGias;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs;

namespace Camino.Api.Models.MappingProfile
{
    public class DichVuKhamMappingProfile : Profile
    {
        public DichVuKhamMappingProfile()
        {
            CreateMap<DichVuKhamBenh, DichVuKhamViewModel>();
            CreateMap<DichVuKhamViewModel, DichVuKhamBenh>()
                .ForMember(x => x.DichVuKhamBenhGias, o => o.Ignore())
                .AfterMap((source, destination) =>
                {
                    AddOrUpdateDichVuKhamGia(source, destination);
                });

            CreateMap<DichVuKhamBenhGia, DichVuKhamGiaViewModel>();
            CreateMap<DichVuKhamGiaViewModel, DichVuKhamBenhGia>();
        }
        private void AddOrUpdateDichVuKhamGia(DichVuKhamViewModel source, DichVuKhamBenh destination)
        {
            foreach (var model in source.DichVuKhamBenhGias)
            {
                if (model.Id == 0)
                {
                    var newEntity = new DichVuKhamBenhGia();
                    destination.DichVuKhamBenhGias.Add(model.ToEntity(newEntity));
                }
                else
                {
                    var result = destination.DichVuKhamBenhGias.Single(c =>
                        c.Id == model.Id);
                    result = model.ToEntity(result);
                }
            }

            foreach (var model in destination.DichVuKhamBenhGias)
            {
                if (model.Id != 0)
                {
                    var countModel = source.DichVuKhamBenhGias.Where(x =>
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
