using AutoMapper;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.DuocPhams;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;

namespace Camino.Api.Models.MappingProfile
{
    public class DuocPhamMappingProfile : Profile
    {
        public DuocPhamMappingProfile()
        {
            CreateMap<DuocPham, DuocPhamViewModel>().AfterMap((s, d) =>
            {
                d.TenDonViTinh = s.DonViTinh?.Ten;
                d.TenDuongDung = s.DuongDung?.Ten;
                d.TenNhaSanXuat = s.NhaSanXuat?.Ten;
                d.TenNuocSanXuat = s.NuocSanXuat?.Ten;
            });
            CreateMap<DuocPhamViewModel, DuocPham>()
                .ForMember(x => x.DuocPhamGias, o => o.Ignore())
                .AfterMap((source, destination) =>
                {
                    AddOrUpdateDuocPhamGia(source, destination);
                });

            CreateMap<DuocPhamGia, DuocPhamGiaViewModel>();
            CreateMap<DuocPhamGiaViewModel, DuocPhamGia>();
        }
        private void AddOrUpdateDuocPhamGia(DuocPhamViewModel source, DuocPham destination)
        {
            foreach (var model in source.DuocPhamGias)
            {
                if (model.Id == 0)
                {
                    var newEntity = new DuocPhamGia();
                    destination.DuocPhamGias.Add(model.ToEntity(newEntity));
                }
                else
                {
                    var result = destination.DuocPhamGias.Single(c =>
                        c.Id == model.Id);
                    result = model.ToEntity(result);
                }
            }

            foreach (var model in destination.DuocPhamGias)
            {
                if (model.Id != 0)
                {
                    var countModel = source.DuocPhamGias.Where(x =>
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
