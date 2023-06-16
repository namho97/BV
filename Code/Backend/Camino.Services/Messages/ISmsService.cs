namespace Camino.Services.Messages
{
    public interface ISmsService
    {
        bool SendSmsTaoMatKhau(string to, string passCode);
        void SendSmsTaoNhanVien(string to);
    }
}
