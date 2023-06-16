﻿using System.ComponentModel;

namespace Camino.Core.Domain.Messages
{
    public enum LoaiTrangThaiLichSu
    {
        [Description("Tất cả")]
        TatCa = 0,
        [Description("Thành công")]
        ThanhCong = 1,
        [Description("Thất bại")]
        ThatBai = 2,
    }
}
