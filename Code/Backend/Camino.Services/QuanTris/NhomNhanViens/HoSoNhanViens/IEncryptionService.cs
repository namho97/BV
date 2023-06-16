namespace Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public interface IEncryptionService
    {
        string HashPassword(string password);
        bool VerifyHashedPassword(string hashedPassword, string providedPassword);
        string RandomPassCode(int num);
    }
}
