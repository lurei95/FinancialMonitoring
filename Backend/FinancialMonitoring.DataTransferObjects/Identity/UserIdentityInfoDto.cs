namespace FinancialMonitoring.DataTransferObjects.Identity
{
  /// <summary>
  /// Dto for user information
  /// </summary>
  public sealed class UserIdentityInfoDto
  {
    /// <summary>
    /// Id of the user
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// Email of the user
    /// </summary>
    public string Email { get; set; }
  }
}
