using FinancialMonitoring.BusinessLogic.UserManagement;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FinancialMonitoring.Identity
{
  /// <summary>
  /// UserStore for <see cref="UserIdentityData"/>
  /// </summary>
  public sealed class UserStore : IUserStore<UserIdentityData>, IUserPasswordStore<UserIdentityData>
  {
    private readonly UserIdentityLogic userIdentityLogic;

    /// <summary>
    /// Creates an instance of <see cref="UserIdentityLogic"/> 
    /// </summary>
    /// <param name="userIdentityLogic">Logic fo user identity</param>
    public UserStore(UserIdentityLogic userIdentityLogic)
    {
      this.userIdentityLogic = userIdentityLogic 
        ?? throw new ArgumentNullException(nameof(UserIdentityLogic));
    }

    /// <inheritdoc/>
    public void Dispose()
    { }

    /// <inheritdoc/>
    public Task<string> GetUserIdAsync(
      UserIdentityData user, CancellationToken cancellationToken)
    {
      return user == null
        ? throw new ArgumentNullException(nameof(user))
        : Task.FromResult(user.UserId.ToString(CultureInfo.InvariantCulture));
    }

    /// <inheritdoc/>
    public Task<string> GetUserNameAsync(
      UserIdentityData user, CancellationToken cancellationToken)
    {
      return user == null 
        ? throw new ArgumentNullException(nameof(user)) 
        : Task.FromResult(user.Email);
    }

    /// <inheritdoc/>
    public Task SetUserNameAsync(
      UserIdentityData user, string userName, CancellationToken cancellationToken)
    {
      if (user == null)
        throw new ArgumentNullException(nameof(user));
      user.Email = userName;
      return Task.CompletedTask;
    }

    /// <inheritdoc/>
    public Task<string> GetNormalizedUserNameAsync(
      UserIdentityData user, CancellationToken cancellationToken)
    {
      return user == null
        ? throw new ArgumentNullException(nameof(user))
        : Task.FromResult(user.Email?.ToUpperInvariant());
    }

    /// <inheritdoc/>
    public Task SetNormalizedUserNameAsync(
      UserIdentityData user, 
      string normalizedName, 
      CancellationToken cancellationToken)
    {
      return Task.CompletedTask;
    }

    /// <inheritdoc/>
    public Task<IdentityResult> CreateAsync(
      UserIdentityData user, CancellationToken cancellationToken)
    {
      throw new NotImplementedException();
    }

    /// <inheritdoc/>
    public Task<IdentityResult> UpdateAsync(
      UserIdentityData user, CancellationToken cancellationToken)
    {
      throw new NotImplementedException();
    }

    /// <inheritdoc/>
    public Task<IdentityResult> DeleteAsync(
      UserIdentityData user, CancellationToken cancellationToken)
    {
      throw new NotImplementedException();
    }

    /// <inheritdoc/>
    public async Task<UserIdentityData> FindByIdAsync(
      string userId, CancellationToken cancellationToken)
    {
      if (!int.TryParse(userId, out int id))
        throw new ArgumentException("Invali ID.", nameof(userId));

      return await this.userIdentityLogic.GetUser(id, cancellationToken);
    }

    /// <inheritdoc/>
    public async Task<UserIdentityData> FindByNameAsync(
      string normalizedUserName, CancellationToken cancellationToken)
    {
      if (string.IsNullOrEmpty(normalizedUserName))
        throw new ArgumentNullException(nameof(normalizedUserName));

      return await this.userIdentityLogic.GetUserByNormalizedUserName(
        normalizedUserName, cancellationToken);
    }

    /// <inheritdoc/>
    public Task SetPasswordHashAsync(
      UserIdentityData user, string paswordHash, CancellationToken cancellationToken)
    {
      if (user == null)
        throw new ArgumentNullException(nameof(user));
      user.PasswordHash = paswordHash;
      return Task.CompletedTask;
    }

    /// <inheritdoc/>
    public Task<string> GetPasswordHashAsync(
      UserIdentityData user, CancellationToken cancellationToken)
    {
      if (user == null)
        throw new ArgumentNullException(nameof(user));
      return Task.FromResult(user.PasswordHash);
    }

    /// <inheritdoc/>
    public Task<bool> HasPasswordAsync(
      UserIdentityData user, CancellationToken cancellationToken)
    {
      if (user == null)
        throw new ArgumentNullException(nameof(user));
      return Task.FromResult(!string.IsNullOrEmpty(user.PasswordHash));
    }
  }
}
