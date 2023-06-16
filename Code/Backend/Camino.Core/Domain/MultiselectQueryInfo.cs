namespace Camino.Core.Domain
{
    public class MultiselectQueryInfo
    {
        public MultiselectQueryInfo()
        {
            // defaults
            Take = 50;
        }
        public string ParameterDependencies { get; set; }
        public string SelectedItems { get; set; }
        public string Query { get; set; }
        public int Take { get; set; }
    }
}
