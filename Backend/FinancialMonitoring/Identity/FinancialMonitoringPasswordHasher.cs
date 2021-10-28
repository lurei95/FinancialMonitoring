using FinancialMonitoring.BusinessLogic.UserManagement;
using FinancialMonitoring.Utility.Security;
using Microsoft.AspNetCore.Identity;
using System;

namespace FinancialMonitoring.Identity
{
  /// <summary>
  /// class for dealing with the password hash of the user
  /// </summary>
  public sealed class FinancialMonitoringPasswordHasher : IPasswordHasher<UserIdentityData>
  {
    /// <summary>
    /// Creates a hash for the password of the user
    /// </summary>
    /// <param name="user">the user</param>
    /// <param name="password">password of the user</param>
    /// <returns>hash for the password of the user</returns>
    public string HashPassword(UserIdentityData user, string password)
    {
      if (user == null)
        throw new ArgumentNullException(nameof(user));

      var saltedHash = new SaltedHash(password);
      return saltedHash.Hash;
    }

    /// <summary>
    /// verifies the password hash of a user
    /// </summary>
    /// <param name="user">the user</param>
    /// <param name="hashedPassword">the password hash of the user</param>
    /// <param name="providedPassword">the provided password</param>
    /// <returns>if the provided password matches the password hash</returns>
    public PasswordVerificationResult VerifyHashedPassword(
      UserIdentityData user, string hashedPassword, string providedPassword)
    {
      if (user == null)
        throw new ArgumentNullException(nameof(user));

      var saltedHash = new SaltedHash(user.PasswordSalt, hashedPassword);
      return saltedHash.Verify(providedPassword)
        ? PasswordVerificationResult.Success
        : PasswordVerificationResult.Failed;
    }
  }
}
