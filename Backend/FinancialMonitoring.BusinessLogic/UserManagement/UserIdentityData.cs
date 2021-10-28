namespace FinancialMonitoring.BusinessLogic.UserManagement
{
  /// <summary>
  /// user data for JWT/.net ore identity
  /// </summary>
  public sealed class UserIdentityData
  {
    /// <summary>
    /// Id of the user
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// login of the user
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// salt for the password
    /// </summary>
    public string PasswordSalt { get; set; }

    /// <summary>
    /// hash value of the pasword of the user
    /// </summary>
    public string PasswordHash { get; set; }
  }
}
