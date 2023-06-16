namespace Camino.Core.Domain
{
    /// <summary>
    /// Set group for grid data export excel.
    /// </summary>
    [AttributeUsage(AttributeTargets.All | AttributeTargets.Field, AllowMultiple = false, Inherited = true)]
    public class GroupAttribute : Attribute
    {
        public GroupAttribute()
        {
        }
    }
}
