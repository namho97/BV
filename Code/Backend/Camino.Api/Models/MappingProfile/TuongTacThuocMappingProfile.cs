using AutoMapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.TuongTacThuocs;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs;

namespace Camino.Api.Models.MappingProfile
{
    public class TuongTacThuocMappingProfile : Profile
    {
        public TuongTacThuocMappingProfile()
        {
            CreateMap<TuongTacThuoc, TuongTacThuocViewModel>();


            CreateMap<TuongTacThuocViewModel, TuongTacThuoc>();
        }
       
    }
}
