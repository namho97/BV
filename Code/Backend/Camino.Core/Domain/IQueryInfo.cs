namespace Camino.Core.Domain
{
    public interface IQueryInfo
    {
        int Take { get; set; }
        int Skip { get; set; }
        int QueryId { get; set; }
        int TotalRecords { get; set; }
        string SearchTerms { get; }
        DateTime? CreatedBefore { get; set; }
        DateTime? CreatedAfter { get; set; }
        int CreatedBy { get; set; }
        DateTime? ModifiedBefore { get; set; }
        DateTime? ModifiedAfter { get; set; }
        int ModifiedBy { get; set; }
        List<Sort> Sort { get; set; }

        string SortString { get; }
        string SearchString { get; set; }
        string AdditionalSearchString { get; set; }
    }
    public class Sort
    {
        public string Field { get; set; }

        public string Dir { get; set; }
    }
}
