﻿namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.DuongDungs
{
    public class DuongDungGridVo : GridItem
    {
        public string? Ma { get; set; }
        public string Ten { get; set; } = null!;
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
