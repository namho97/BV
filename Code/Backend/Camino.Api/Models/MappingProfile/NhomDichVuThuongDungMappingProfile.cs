using AutoMapper;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.NhomDichVuThuongDungs;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKyThuats;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;

namespace Camino.Api.Models.MappingProfile
{
    public class NhomDichVuThuongDungMappingProfile : Profile
    {
        public NhomDichVuThuongDungMappingProfile()
        {
            CreateMap<NhomDichVuThuongDungViewModel, GoiDichVu>()
                .ForMember(x => x.GoiDichVuChiTietDichVuKhamBenhs,
                    o => o.MapFrom(w => w.GoiDichVuChiTietDichVuKhamBenhs))
                .ForMember(x => x.GoiDichVuChiTietDichVuKyThuats,
                    o => o.MapFrom(w => w.GoiDichVuChiTietDichVuKyThuats))
                .AfterMap((s, d) =>
                {
                    d.Ten = s.Ten;
                    AddOrUpdateGoiDichVuChiTietKhamDichVus(s, d);
                    AddOrUpdateGoiDichVuChiTietKhamDichVuKyThuats(s, d);
                });

            CreateMap<GoiDichVu, NhomDichVuThuongDungViewModel>()
                .ForMember(x => x.GoiDichVuChiTietDichVuKhamBenhs, o => o.Ignore())
                 .ForMember(x => x.GoiDichVuChiTietDichVuKyThuats, o => o.Ignore())
                .AfterMap((s, d) => { d.Ten = s.Ten; });

            CreateMap<GoiDichVuChiTietDichVuKhamBenhViewModel, GoiDichVuChiTietDichVuKhamBenh>()
                .AfterMap((s, d) =>
                {
                    d.DichVuKhamBenhId = s.DichVuKhamBenhId;
                    d.DichVuKhamBenhGiaId = s.DichVuKhamBenhGiaId;
                    d.SoLan = s.SoLan;
                    d.Id = s.Id;
                    d.GhiChu = s.GhiChu;
                });

            CreateMap<GoiDichVuChiTietDichVuKyThuatViewModel, GoiDichVuChiTietDichVuKyThuat>()
                .AfterMap((s, d) =>
                {
                    d.DichVuKyThuatId = s.DichVuKyThuatId;
                    d.DichVuKyThuatGiaId = s.DichVuKyThuatGiaId;
                    d.SoLan = s.SoLan;
                    d.Id = s.Id;
                    d.GhiChu = s.GhiChu;
                });
        }
        private void AddOrUpdateGoiDichVuChiTietKhamDichVus(NhomDichVuThuongDungViewModel source, GoiDichVu destination)
        {
            //foreach (var model in source.GoiDichVuChiTietDichVuKhamBenhs)
            //{
            //    if (model.Id == 0)
            //    {
            //        var newEntity = new GoiDichVuChiTietDichVuKhamBenh();
            //        destination.GoiDichVuChiTietDichVuKhamBenhs.Add(model.ToEntity(newEntity));
            //    }
            //    else
            //    {
            //        var result = destination.GoiDichVuChiTietDichVuKhamBenhs.Single(c =>
            //            c.Id == model.Id);
            //        result = model.ToEntity(result);
            //    }
            //}

            foreach (var model in destination.GoiDichVuChiTietDichVuKhamBenhs)
            {
                if (model.Id != 0)
                {
                    var countModel = source.GoiDichVuChiTietDichVuKhamBenhs.Where(x =>
                        x.Id == model.Id).ToList();

                    if (countModel.Count == 0)
                    {
                        model.WillDelete = true;
                    }
                }
            }
          
        }
        private void AddOrUpdateGoiDichVuChiTietKhamDichVuKyThuats(NhomDichVuThuongDungViewModel source, GoiDichVu destination)
        {

            //foreach (var model in source.GoiDichVuChiTietDichVuKyThuats)
            //{
            //    if (model.Id == 0)
            //    {
            //        var newEntity = new GoiDichVuChiTietDichVuKyThuat();
            //        destination.GoiDichVuChiTietDichVuKyThuats.Add(model.ToEntity(newEntity));
            //    }
            //    else
            //    {
            //        var result = destination.GoiDichVuChiTietDichVuKyThuats.Single(c =>
            //            c.Id == model.Id);
            //        result = model.ToEntity(result);
            //    }
            //}

            foreach (var model in destination.GoiDichVuChiTietDichVuKyThuats)
            {
                if (model.Id != 0)
                {
                    var countModel = source.GoiDichVuChiTietDichVuKyThuats.Where(x =>
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
