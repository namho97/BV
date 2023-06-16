using System.Globalization;

namespace Camino.Core.Helpers
{
    public static class DateTimeHelper
    {

        /// <summary>
        /// Compare date with toDate: equal -> 0, greater than -> 1, less than -> -1
        /// </summary>
        /// <param name="date"></param>
        /// <param name="toDate"></param>
        /// <returns></returns>
        public static int CompareDateTo(this DateTime date, DateTime toDate)
        {
            if (date.Year < toDate.Year)
                return -1;
            if (date.Year > toDate.Year)
                return 1;
            if (date.DayOfYear < toDate.DayOfYear)
                return -1;
            if (date.DayOfYear > toDate.DayOfYear)
                return 1;
            return 0;
        }
        public static string ApplyFormat(this DateTime date, string format = "dd/MM/yyyy hh:ss tt")
        {
            return date.ToString(format, CaminoConstants.DefaultCulture);
        }
        public static string ApplyFormatDateTime(this DateTime date)
        {
            return date.ToString($"{CaminoConstants.DefaultCulture.DateTimeFormat.ShortDatePattern} {CaminoConstants.DefaultCulture.DateTimeFormat.ShortTimePattern}");
        }
        public static string ApplyFormatTimeDate(this DateTime date)
        {
            return date.ToString($"{CaminoConstants.DefaultCulture.DateTimeFormat.ShortTimePattern} {CaminoConstants.DefaultCulture.DateTimeFormat.ShortDatePattern}");
        }
        public static string ApplyFormatDate(this DateTime date)
        {
            return date.ToString($"{CaminoConstants.DefaultCulture.DateTimeFormat.ShortDatePattern}");
        }
        public static string ApplyFormatTime(this DateTime date)
        {
            return date.ToString($"{CaminoConstants.DefaultCulture.DateTimeFormat.ShortTimePattern}");
        }






        public static void TryParseExactCustom(this string date, out DateTime d)
        {
            DateTime.TryParseExact(date, "dd/MM/yyyy hh:mm tt", null, DateTimeStyles.None, out d);
        }

        /// <summary>
        /// Example: 08 giờ 05 phút, ngày 20/11/2020
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static string ApplyFormatGioPhutNgay(this DateTime date)
        {
            return $"{date.Hour:D2} giờ {date.Minute:D2} phút, ngày {date.ToString("dd/MM/yyyy")}";
        }
        /// <summary>
        /// Example: Ngày 01 tháng 02 năm 2020
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static string ApplyFormatNgayThangNam(this DateTime date)
        {
            return $"Ngày {date.Day:D2} tháng {date.Month:D2} năm {date.Year:D2}";
        }

        public static string ConvertIntSecondsToTime(this int seconds)
        {
            var hours = seconds / 3600;
            var minutes = (seconds / 60) % 60;

            return $"{hours:00}:{minutes:00}";
        }
        public static IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }
        public static int GetMonthsBetween(DateTime from, DateTime to)
        {
            if (from > to) return GetMonthsBetween(to, from);

            var monthDiff = Math.Abs((to.Year * 12 + (to.Month - 1)) - (from.Year * 12 + (from.Month - 1)));

            if (from.AddMonths(monthDiff) > to || to.Day < from.Day)
            {
                return monthDiff - 1;
            }
            else
            {
                return monthDiff;
            }
        }
    }
}
