namespace Camino.Services.Messages
{
    public interface ISmsSender
    {
        bool SendSms(string to, string msg);
    }
}
