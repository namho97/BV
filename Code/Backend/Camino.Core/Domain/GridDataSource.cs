namespace Camino.Core.Domain
{
    public class GridDataSource
    {
        public ICollection<GridItem> Data { get; set; }

        public int TotalRowCount { get; set; }
    }
}
