namespace Camino.Core.Domain
{
    public class LookupQueryInfo
    {
        public LookupQueryInfo()
        {
            // defaults
            Take = 50;
        }
        public string ParameterDependencies { get; set; }
        public int Id { get; set; }
        public string Query { get; set; }
        public int Take { get; set; }
    }
}
