using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Helpers;

namespace Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens
{
    [ScopedDependency(ServiceType = typeof(IEncryptionService))]
    public class EncryptionService : IEncryptionService
    {
        public string HashPassword(string password)
        {
            return HashHelper.HashString(password);
        }

        public bool VerifyHashedPassword(string hashedPassword, string providedPassword)
        {
            return HashHelper.VerifyHashedHashString(hashedPassword, providedPassword);
        }

        public string RandomPassCode(int num)
        {
            var rnd = new Random();
            var result = 1;
            for (var i = 1; i <= num; i++)
            {
                result = result * 10;
            }
            var code = rnd.Next(1, result);
            return code.ToString("D" + num);
        }
    }
}
