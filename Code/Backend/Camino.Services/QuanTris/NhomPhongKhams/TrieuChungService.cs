using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.TrieuChungs;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Services.QuanTris.NhomPhongKhams
{

    [ScopedDependency(ServiceType = typeof(ITrieuChungService))]
    public class TrieuChungService : MasterFileService<TrieuChung>, ITrieuChungService
    {
        public TrieuChungService(IRepository<TrieuChung> repository) : base(repository)
        {
        }

        public List<TrieuChungGridVo> GetDataTreeView(TrieuChungQueryInfo queryInfo)
        {
            var queryAlls = BaseRepository.TableNoTracking
               
                .Select(s => new TrieuChungGridVo
                {
                    NodeId = s.Id,
                    NodeName = s.Ten,
                    CapNhom = s.CapNhom,
                    ParentNodeId = s.TrieuChungChaId
                });

            var query = BaseRepository.TableNoTracking
                .Where(d=>d.TrieuChungChaId == null)
                .Select(s => new TrieuChungGridVo
                {
                    NodeId = s.Id,
                    NodeName = s.Ten,
                    CapNhom = s.CapNhom,
                    ParentNodeId = s.TrieuChungChaId
                }).ApplyLike(queryInfo.SearchString,g=>g.NodeName).ToList();

            foreach (var item in query)
            {
                item.NodeChilds = GetChildrenTreeSearch(queryAlls.ToList(), item.NodeId,item.CapNhom, queryInfo.Ten, queryInfo.Ten);
            }

            return query.ToList();
        }
        public static List<TrieuChungGridVo> GetChildrenTreeSearch(List<TrieuChungGridVo> comments, long Id, long level, string queryString, string parentDisplay) //todo: cần xóa
        {
            var query = comments
                .Where(c => c.ParentNodeId != null && c.ParentNodeId == Id && c.CapNhom == level + 1)
                .Select(c => new TrieuChungGridVo
                {
                    NodeId = c.NodeId,
                    NodeName = c.NodeName,
                    CapNhom = c.CapNhom,
                    ParentNodeId = c.ParentNodeId,
                    NodeChilds = GetChildrenTreeSearch(comments, c.NodeId, c.CapNhom, queryString, c.NodeName)
                })
                .Where(c => string.IsNullOrEmpty(queryString) || !string.IsNullOrEmpty(queryString) && (parentDisplay.Trim().ToLower().Contains(queryString.Trim().ToLower()) || c.NodeName.Trim().ToLower().Contains(queryString.Trim().ToLower()) || c.NodeChilds.Any()))
                .ToList();
          
            return query;
        }
      
        public async Task<List<TrieuChung>> FindChildren(long Id)
        {
            var query = await BaseRepository.TableNoTracking
                .Where(z => z.Id == Id).ToListAsync();
            return query;
        }
        public async Task<IEnumerable<LookupItemVo>> GetDataTreeViewChildren(long Id)
        {
            var query = BaseRepository.TableNoTracking
                .Select(s => new TrieuChungGridVo
                {
                    NodeId = s.Id,
                    NodeName = s.Ten,
                    CapNhom = s.CapNhom,
                    ParentNodeId = s.TrieuChungChaId
                });

            var queryData = await BaseRepository.TableNoTracking.Where(r => r.TrieuChungChaId == Id)
                .Select(k => new TrieuChungGridVo
                {
                    NodeId = k.Id,
                    NodeName = k.Ten,
                    CapNhom = k.CapNhom,
                    ParentNodeId = k.TrieuChungChaId,
                    NodeChilds = GetChildrenLoadLastFirst(query.ToList(), k.Id, k.CapNhom)
                }).ToListAsync();
            var list = new List<LookupItemVo>();
            if (queryData != null && queryData.Count() > 0)
            {
                foreach (var item in queryData)
                {
                    if (item.NodeChilds.Count() > 0)
                    {
                        foreach (var itemChildren in item.NodeChilds)
                            list.Add(new LookupItemVo()
                            {
                                KeyId = itemChildren.NodeId,
                            });
                    }
                    list.Add(new LookupItemVo()
                    {
                        KeyId = item.NodeId,
                    });
                }
            }
            return list;
        }
        public async Task<List<TrieuChung>> GetCapNhom(long? Id)
        {
            var query = BaseRepository.TableNoTracking.Where(r => r.Id == Id)
                .Select(c => new TrieuChung
                {
                    Id = c.Id,
                    Ten = c.Ten,
                    CapNhom = c.CapNhom,
                    TrieuChungChaId = c.TrieuChungChaId
                });

            return await query.ToListAsync();
        }
        public async Task<List<TrieuChung>> GetNameTrieuChung(long? TrieuChungChaId)
        {
            var query = BaseRepository.TableNoTracking.Where(r => r.Id == TrieuChungChaId)
                .Select(c => new TrieuChung
                {
                    Id = c.Id,
                    Ten = c.Ten,

                });

            return await query.ToListAsync();
        }
        public static List<TrieuChungGridVo> GetChildrenLoadLastFirst(List<TrieuChungGridVo> comments, long Id, long CapNhom)
        {
            var query = comments.Where(c => c.NodeId != Id && c.CapNhom > CapNhom && c.ParentNodeId == Id)
                .Select(c => new TrieuChungGridVo
                {
                    NodeId = c.NodeId,
                    NodeName = c.NodeName,
                    CapNhom = c.CapNhom,
                    ParentNodeId = c.ParentNodeId,
                    NodeChilds = GetChildrenLoadLastFirst(comments, c.NodeId, c.CapNhom)
                });
            return query.ToList();
        }
        //public static List<TrieuChungGridVo> GetChildren(List<TrieuChungGridVo> comments, long Id, long CapNhom)
        //{
        //    var query = comments.Where(c => c.Id != Id && c.CapNhom > CapNhom && c.TrieuChungChaId == Id)
        //        .Select(c => new TrieuChungGridVo
        //        {
        //            Id = c.Id,
        //            Ten = c.Ten,
        //            CapNhom = c.CapNhom,
        //            TrieuChungChaId = c.TrieuChungChaId,
        //            TrieuChungChildren = GetChildren(comments, c.Id, c.CapNhom)
        //        });
        //    return query.ToList();
        //}
        public async Task<bool> IsTenExists(string ten, long id = 0)
        {
            var result = false;
            if (id == 0)
            {
                result = await BaseRepository.TableNoTracking.AnyAsync(p => p.Ten.Equals(ten));

            }
            else
            {
                result = await BaseRepository.TableNoTracking.AnyAsync(p => p.Ten.Equals(ten) && p.Id != id);
            }
            if (result)
                return false;
            return true;
        }
        public bool KiemTraExists(long id)
        {
            var result = false;
            var query = BaseRepository.TableNoTracking.Where(p => p.TrieuChungChaId == id).ToList();
            if (query.Count() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo, long? id)
        {
            var lst = await BaseRepository.TableNoTracking
                 .Where(d=> (id == null || d.Id != id))
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
