using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVus;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomPhongKhams.NhomDichVuBenhViens
{
    [ScopedDependency(ServiceType = typeof(INhomDichVuBenhVienService))]
    public class NhomDichVuBenhVienService : MasterFileService<NhomDichVuBenhVien>, INhomDichVuBenhVienService
    {
        public NhomDichVuBenhVienService(IRepository<NhomDichVuBenhVien> repository
           ) : base(repository)
        {
        }
        public List<NhomDichVuGridVo> GetDataTreeView(NhomDichVuQueryInfo queryInfo)
        {
            var queryAlls = BaseRepository.TableNoTracking

                .Select(s => new NhomDichVuGridVo
                {
                    NodeId = s.Id,
                    NodeName = s.Ten,
                    ParentNodeId = s.NhomDichVuBenhVienChaId
                });

            var query = BaseRepository.TableNoTracking
                .Where(d => d.NhomDichVuBenhVienChaId == null)
                .Select(s => new NhomDichVuGridVo
                {
                    NodeId = s.Id,
                    NodeName = s.Ten,
                    ParentNodeId = s.NhomDichVuBenhVienChaId
                }).ApplyLike(queryInfo.SearchString, g => g.NodeName).ToList();

            foreach (var item in query)
            {
                item.NodeChilds = GetChildrenTreeSearch(queryAlls.ToList(), item.NodeId, queryInfo.SearchTerms);
            }

            return query.ToList();
        }
        public static List<NhomDichVuGridVo> GetChildrenTreeSearch(List<NhomDichVuGridVo> comments, long Id, string queryString) //todo: cần xóa
        {
            var query = comments
                .Where(c => c.ParentNodeId != null && c.ParentNodeId == Id)
                .Select(c => new NhomDichVuGridVo
                {
                    NodeId = c.NodeId,
                    NodeName = c.NodeName,
                    ParentNodeId = c.ParentNodeId,
                    NodeChilds = GetChildrenTreeSearch(comments, c.NodeId, c.NodeName)
                })
                .Where(c => string.IsNullOrEmpty(queryString) || !string.IsNullOrEmpty(queryString) && ( c.NodeName.Trim().ToLower().Contains(queryString.Trim().ToLower()) || c.NodeChilds.Any()))
                .ToList();

            return query;
        }


        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo,long? id)
        {
            var lst = await BaseRepository.TableNoTracking
                    .Where(d => (id == null || d.Id != id))
                 .ApplyLike(queryInfo.Query, g => g.Ten, g => g.Ten)
                 .Take(queryInfo.Take)
                 .ToListAsync();

            var query = lst.Select(item => new LookupItemVo()
            {
                DisplayName = item.Ten,
                KeyId = item.Id,
            }).ToList();
            return query;
        }
        public bool KiemTraTrungTenAsync(long Id, string ten)
        {
            if (string.IsNullOrEmpty(ten))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ten.ToLower() == ten.ToLower());
            return kiemTra;
        }
    }
}
