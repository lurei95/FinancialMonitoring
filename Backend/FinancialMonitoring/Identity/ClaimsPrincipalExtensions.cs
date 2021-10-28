using System.Security.Claims;

namespace FinancialMonitoring.Identity
{
  /// <summary>
  /// Extensions for <see cref="ClaimsPrincipal"/>
  /// </summary>
  public static class ClaimsPrincipalExtensions
  {
    /// <summary>
    /// returns the ID of the current user
    /// </summary>
    /// <param name="claimsPrincipal">claims principal</param>
    /// <returns>the ID of the current user</returns>
    public static int? GetUserId(this ClaimsPrincipal claimsPrincipal)
    {
      if (int.TryParse(claimsPrincipal.FindFirstValue(ClaimNames.UserId), out int userId))
        return userId;
      return null;
    }
  }
}
