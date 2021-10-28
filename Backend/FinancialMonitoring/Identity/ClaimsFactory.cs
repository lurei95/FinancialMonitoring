using FinancialMonitoring.BusinessLogic.UserManagement;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FinancialMonitoring.Identity
{
  /// <summary>
  /// factory for creating the claims principal
  /// </summary>
  public sealed class ClaimsFactory : IUserClaimsPrincipalFactory<UserIdentityData>
  {
    /// <summary>
    /// creates the claims principal for the user 
    /// </summary>
    /// <param name="user">the user</param>
    /// <returns>the claims principal for the user </returns>
    public async Task<ClaimsPrincipal> CreateAsync(UserIdentityData user)
    {
      var identity = new ClaimsIdentity(await this.GetIdentityClaims(user));
      return new ClaimsPrincipal(identity);
    }

    /// <summary>
    /// returns a list of the identity claims for the user
    /// </summary>
    /// <param name="user">the user</param>
    /// <returns>a list of the identity claims for the user</returns>
    public Task<IList<Claim>> GetIdentityClaims(UserIdentityData user)
    {
      if (user == null)
        throw new ArgumentNullException(nameof(user));

      IList<Claim> claims = new List<Claim>
      {
        new Claim(ClaimNames.UserId, user.UserId.ToString(CultureInfo.InvariantCulture)),
      };

      return Task.FromResult(claims);
    }
  }
}
