namespace Camino.Core.Domain
{
    public class QueryInfo : IQueryInfo
    {
        public QueryInfo()
        {
            // defaults
            Take = 50;
            Sort = new List<Sort>();
        }


        public int Take { get; set; }
        public int Skip { get; set; }
        public int QueryId { get; set; }
        public List<Sort> Sort { get; set; }
        public string SearchString { get; set; }
        public string AdditionalSearchString { get; set; }

        public string SearchTerms
        {
            get
            {
                //if (!string.IsNullOrEmpty(SearchString))
                //{
                //    var searchParams = SearchString.Replace(' ', '+');
                //    searchParams = Encoding.UTF8.GetString(Convert.FromBase64String(searchParams));

                //    if (!string.IsNullOrEmpty(searchParams))
                //    {
                //        var xml = XDocument.Parse(searchParams);
                //        foreach (var param in xml.Descendants("AdvancedQueryParameters"))
                //        {
                //            var searchTerm = param.Element("SearchTerms");
                //            if (searchTerm != null)
                //                return searchTerm.Value.ConvertUnicodeString().Trim();
                //        }
                //    }
                //}
                return string.Empty;
            }

        }

        public DateTime? CreatedBefore { get; set; }
        public DateTime? CreatedAfter { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? ModifiedBefore { get; set; }
        public DateTime? ModifiedAfter { get; set; }
        public int ModifiedBy { get; set; }
        public int TotalRecords { get; set; }
        public string SortStringFormat { get; set; }
        public string SortString
        {
            get
            {
                if (!string.IsNullOrEmpty(SortStringFormat))
                {
                    return SortStringFormat;
                }
                // order the results
                if (Sort != null && Sort.Count > 0)
                {
                    var sorts = new List<string>();
                    Sort.ForEach(x => sorts.Add(string.Format("{0} {1}", x.Field, x.Dir)));
                    return string.Join(",", sorts.ToArray());
                }
                return string.Empty;
            }
        }
        public bool? LazyLoadPage { get; set; }
    }
}
