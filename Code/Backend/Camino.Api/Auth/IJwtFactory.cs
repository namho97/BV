﻿namespace Camino.Api.Auth
{
    public interface IJwtFactory
    {
        AccessToken GenerateInternalToken(long id, params long[] roleId);
        AccessToken GeneratePortalToken(long id);
    }
}
