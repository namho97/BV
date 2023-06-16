using System.Globalization;

namespace Camino.Core
{
    public static class CaminoConstants
    {
        public const long DefaultSystemUserId = 1;
        public static readonly CultureInfo DefaultCulture = new("vi-VN");
        public const string IdSeparator = ",";
        public const string JwtRoleSeparator = ",";
        public const string HeaderUserTypeSeparator = ",";
        public const string UserTopicPrefix = "camino_user_";
        public static class JwtClaimTypes
        {
            public const string Role = "_role", Id = "_id";
        }
    }
}
