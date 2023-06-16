﻿namespace Camino.Core.Domain
{
    /// <summary>
    /// Set style text-align for data export excel. Use string style: "right", "left" or "center". Or you can use Constants.TextAlignAttribute
    /// </summary>
    [AttributeUsage(AttributeTargets.All | AttributeTargets.Field, AllowMultiple = false, Inherited = true)]
    public sealed class TextAlignAttribute : Attribute
    {
        private string _style;

        public TextAlignAttribute(string style)
        {
            this._style = style;
        }
    }
}
