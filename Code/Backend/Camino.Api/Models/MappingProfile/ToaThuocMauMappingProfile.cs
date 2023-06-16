using AutoMapper;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomToaThuocMau.ToaThuocMaus;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMauChiTiets;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;

namespace Camino.Api.Models.MappingProfile
{
    public class ToaThuocMauMappingProfile : Profile
    {
        public ToaThuocMauMappingProfile()
        {
            CreateMap<ToaThuocMau, ToaThuocMauViewModel>();
            CreateMap<ToaThuocMauViewModel, ToaThuocMau>()
                .ForMember(x => x.ToaThuocMauChiTiets, o => o.Ignore())
                .AfterMap((source, destination) =>
                {
                    AddOrUpdateToaThuocMauChiTiet(source, destination);
                });

            CreateMap<ToaThuocMauChiTiet, ToaThuocMauChiTietViewModel>();
            CreateMap<ToaThuocMauChiTietViewModel, ToaThuocMauChiTiet>();
        }
        private void AddOrUpdateToaThuocMauChiTiet(ToaThuocMauViewModel source, ToaThuocMau destination)
        {
            foreach (var model in source.ToaThuocMauChiTiets)
            {
                if (model.Id == 0)
                {
                    var newEntity = new ToaThuocMauChiTiet();
                    destination.ToaThuocMauChiTiets.Add(model.ToEntity(newEntity));
                }
                else
                {
                    var result = destination.ToaThuocMauChiTiets.Single(c =>
                        c.Id == model.Id);
                    result = model.ToEntity(result);
                }
            }

            foreach (var model in destination.ToaThuocMauChiTiets)
            {
                if (model.Id != 0)
                {
                    var countModel = source.ToaThuocMauChiTiets.Where(x =>
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
